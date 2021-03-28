const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoose = require('mongoose');

const express = require('express');

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());

app.use(bodyParser.json());

const username = process.env.User || 'billcates';
const password = process.env.Pass || 'bill*4466';

const url =  `mongodb+srv://${username}:${password}@cluster0.pvton.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const connect = mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

connect.then(() => {
    console.log('Connected correctly to server');
})
.catch((err) => console.log(err));

const MessagesRouter = require('./routes/MessagesRouter');

app.use('/messages', MessagesRouter);

const LinksRouter = require('./routes/LinksRouter');

app.use('/links', LinksRouter);

app.get('*' ,(req,res) => {
    res.statusCode = 400;
    res.end("Bad Request path");
});

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server running at port ${port}/`);
});