const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');

const hostname = "https://disappearing-messages.herokuapp.com/";

const Messages = require('../schemas/messages');

const MessagesRouter = express.Router();

MessagesRouter.use(bodyParser.json());

MessagesRouter.route('/')
.get((req,res,next) => {
    Messages.find({})
    .then((Messages) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Messages);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    let message = {};
    const UUID = uuid.v4();
    message.messageID = UUID;
    message.message = req.body.message;
	message.disappearingLink = `${hostname}messages/${UUID}`;
	message.expiringTime = new Date(new Date().getTime() +  req.body.expireIn*60*1000);;
    Messages.create(message)
    .then((mess) => {
        console.log('Message Created ', mess);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({Link : mess.disappearingLink});
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /Messages');
})
.delete((req, res, next) => {
    Messages.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});


MessagesRouter.route('/:messageID')
.get((req,res,next) => {
    Messages.findOne({messageID :req.params.messageID})
    .then((mess) => {
        
        if(new Date() < mess.expiringTime)
        {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({"message":mess.message});
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
    res.end('POST operation not supported on /Messages/'+ req.params.messageID);
})
.put((req, res, next) => {
    Messages.findByIdAndUpdate(req.params.messageID, {
        $set: req.body
    }, { new: true })
    .then((mess) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(mess);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Messages.findByIdAndRemove(req.params.messageID)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});



module.exports = MessagesRouter;