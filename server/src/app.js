// import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = express(); // create your express app
//const secrets = require('../../secrets') // Secret information like db connection password
// make app use dependencies
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

const mongo = require('mongodb')
const MongoClient = mongo.MongoClient
//const uri = secrets.MongoDbConnectionString
const uri = 'mongodb+srv://default-user:TDDD27_FTW@cluster0-6wvq8.gcp.mongodb.net/test?retryWrites=true&w=majority'
var client;

var mongoClient = new MongoClient(uri, {
    reconnectTries: Number.MAX_VALUE,
    autoReconnect: true,
    useNewUrlParser: true
})

mongoClient.connect((err, db) => {
    if (err != null) {
        console.log(err)
        return
    }
    client = db;
})

app.get('/test', (req, res) => {
    const collection = client.db("test").collection("test")

    collection.find().toArray((err, result) => {
        if (err) {
            console.log(err);
            res.send([]);
            return;
        }
        res.send(result);
    });
});

app.listen(process.env.PORT || 8081); // client is already running on 8080