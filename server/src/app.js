// import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = express(); // create your express app
const SpotifyWebApi = require('spotify-web-api-node')
const GoogleApi = require('googleapis')
// make app use dependencies
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

// MongoDb initilization
const mongo = require('mongodb')
const MongoClient = mongo.MongoClient
const uri = process.env.MongoDbConnectionString
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

// Spotify Web Api initilization
const spotifyClientId = `${process.env.SPOTIFY_CLIENT_ID}`
const spotifyClientSecret = `${process.env.SPOTIFY_CLIENT_SECRET}`

/* const spotifyApi = new SpotifyWebApi({
    clientId: spotifyClientId,
    clientSecret: spotifyClientSecret,
    redirectUri: 'https://favesound.herokuapp.com/auth/spotify/callback'
}) */

const spotifyAuthOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
        'Authorization': 'Basic' + (new Buffer(spotifyClientId + ':' + spotifyClientSecret).toString('base64'))
    },
    form: {
        grant_type: 'client_credentials'
    },
    json: true
}

app.get('/auth/spotify/callback', (req, res) => {

})

// Google Api initialization
const googleClientId = `${process.env.GOOGLE_CLIENT_ID}`
const googleClientSecret = `${process.env.GOOGLE_CLIENT_SECRET}`
var googleToken;

app.get('/auth/google/callback', (req, res) => {
    
})

// Save access token from Google Authentication
app.post('/googleLogin', (req, res) => {
    googleToken = req.body.googleToken
    res.send(200)
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