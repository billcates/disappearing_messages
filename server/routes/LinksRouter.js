const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');

const hostname = "https://disappearing-messages.herokuapp.com/";

const Links = require('../schemas/links');

const LinksRouter = express.Router();

LinksRouter.use(bodyParser.json());

LinksRouter.route('/')
.get((req,res,next) => {
    Links.find({})
    .then((Links) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Links);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    let link = {};
    const UUID = uuid.v4();
    link.linkID = UUID;
    link.link = req.body.link;
	link.disappearingLink = `${hostname}links/${UUID}`;
	link.expiringTime = new Date(new Date().getTime() +  req.body.expireIn*60*1000);;
    Links.create(link)
    .then((li) => {
        console.log('Link Created ', li);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({Link : li.disappearingLink});
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /Links');
})
.delete((req, res, next) => {
    Links.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});


LinksRouter.route('/:linkID')
.get((req,res,next) => {
    Links.findOne({linkID : req.params.linkID})
    .then((link) => {
        if(new Date() < link.expiringTime)
        {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({"redirectTo":link.link});
        }
        else
        {
            res.statusCode = 400;
            res.end("Bad Request path");
        }
        
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /Links/'+ req.params.linkID);
})
.put((req, res, next) => {
    Links.findByIdAndUpdate(req.params.linkID, {
        $set: req.body
    }, { new: true })
    .then((link) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(link);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Links.findByIdAndRemove(req.params.linkID)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});



module.exports = LinksRouter;