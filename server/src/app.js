// import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = express(); // create your express app
const SpotifyWebApi = require('spotify-web-api-node')
const GoogleApi = require('googleapis')
const jwt = require('jsonwebtoken')
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

const spotifyAPI = new SpotifyWebApi({
    clientId: spotifyClientId,
    clientSecret: spotifyClientSecret
});

function updateSpotifyCredentials() {
    spotifyAPI.clientCredentialsGrant().then(data => {
        spotifyAPI.setAccessToken(data.body.access_token);
    }, err => {
        console.log(err);
    })
}

app.post('/searchTracks', searchTracks)

function searchTracks(req, res) {
    const query = req.body.query
    const limit = req.body.limit
    spotifyAPI.searchTracks(query, {limit : limit}).then(
        data => {
            res.send(data.body.tracks.items)
        }, err => {
            console.log(err)
            if(err.statusCode === 401) {
                updateSpotifyCredentials();
                searchTracks(req, res)
            }
        }
    )
}

// Google Api initialization
const googleClientId = `${process.env.GOOGLE_CLIENT_ID}`
const googleClientSecret = `${process.env.GOOGLE_CLIENT_SECRET}`
var googleToken;
var googleAuth;

// Save access token from Google Authentication
app.post('/googleLogin', (req, res) => {
    googleToken = jwt.decode(req.body.googleToken)
    // googleToken.sub == unique google id

    const collection = client.db("favesound").collection("users")

    collection.find({
        userid: googleToken.sub.toString()
    }, (err, user) => {
        if (err) {
            console.log(err)
            res.sendStatus(404)
        }
        if(user) {
            collection.updateOne({
                userid: googleToken.sub.toString()
            },
            {
               $setOnInsert: {userid: googleToken.sub.toString(), favelist: []}
            }, 
            {
                upsert: true
            }, (error, result) => {
                if(error) {
                    console.log(error)
                    res.sendStatus(420)
                }
                console.log(googleToken.sub.toString())
                res.status(200).send({userid: googleToken.sub.toString()})
            })
        }
    })
})

app.post('/getFavelist', (req, res) => {
    const userid = JSON.parse(req.body.userid).userid
    getFavelist(userid, res)
})

function getFavelist(userid, res) {

    const collection = client.db("favesound").collection("users")

    collection.find({
        userid: userid
    }).toArray((err, user) => {
        if(err) {
            console.log(err)
            res.sendStatus(404)
        }
        if( !Array.isArray(user[0].favelist) || !user[0].favelist.length) {
            res.status(204).send('Favelist is empty')
        } else {
            res.send(user[0].favelist)
        }
    })
}

app.post('/getTracks', postGetTracks);

function postGetTracks(req, res) {

    const trackIDs = req.body.favelist.data
    spotifyAPI.getTracks(trackIDs).then(
        data => {
            res.send(data.body.tracks)
        }, err => {
            console.log(err.statusCode)
            if(err.statusCode === 401) {
                updateSpotifyCredentials();
                postGetTracks(req, res);
            }
        }
    )
}

app.post('/addFavourite', (req, res) => {
    const userid = JSON.parse(req.body.userid).userid
    const trackid = req.body.trackid

    const collection = client.db("favesound").collection("users")

    collection.updateOne(
        { userid: userid}, 
        { $addToSet: { favelist: trackid }}
    )

    getFavelist(userid, res)
})

app.post('/removeFavourite', (req, res) => {
    const userid = JSON.parse(req.body.userid).userid
    const trackid = req.body.trackid

    const collection = client.db("favesound").collection("users")

    collection.updateOne(
        { userid: userid},
        { $pull: { favelist: trackid }}
    )

    getFavelist(userid, res)
})

app.listen(process.env.PORT || 8081); // client is already running on 8080