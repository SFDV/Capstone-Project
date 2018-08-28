const express = require('express');
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const config = {
   // db: "mongodb://dv-capstone-server.herokuapp.com:27017/smash"
   db: process.env.MONGODB_URI
};
console.log(config);
let eventsCollection = null;
let usersCollection = null;

const app = express();
app.use(bodyParser.json());

const csv = require('csvtojson');
const sha1 = require('sha1');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get("/", async function (req, res) {
    res.json(await getEvents());
});

app.post("/login", async function (req, res) {
    try {
        let body = req.body;
        let user = await getUser(req.body.username);
        console.log(user);
        let ret = {
            success: user && user.password === body.password,
            username: user.username,
            main: user.main !== undefined ? user.main : -1
        }
        res.json(ret);
    } catch (e) {
        res.json({success: false, username: ""});
    }
});

app.post("/register", async function (req, res) {
    let body = req.body;
    console.log(body);
    let succ = await addUser(body.username, body.password);
    res.json(succ);
});

app.post("/newevent", async function (req, res) {
    let body = req.body;
    console.log(body);
    let succ = await addEvent(body.name, body.state, body.username);
    res.json(succ);
});

app.post("/setmain", async function (req, res) {
    let body = req.body;
    console.log(body);
    let succ = await setMain(body.username, body.main);
    res.json(succ ? body.main : false);
});

app.listen(process.env.PORT, () => {
    console.log("Server's up.");
})



//------------------ Mongo

MongoClient.connect(config.db, {useNewUrlParser: true}, async function (err, mongo) {
    if (err) {
        console.log(err);
    } else {
        let database = mongo.db("heroku_l8s1cfgq");
        let seedData = await csv().fromFile("./seed/data.csv");

        //await database.dropCollection("events");
        //await database.dropCollection("users");

        await database.createCollection("events");
        await database.createCollection("users");

        let events = database.collection("events");
        let users = database.collection("users");
        //await users.insertOne({username: "admin", password: sha1("12345")});
        await events.deleteMany({});
        for (let i = 0; i < seedData.length; i++) {
            await events.insertOne(seedData[i]);
        }
        console.log(await users.find({}).toArray());
        console.log(await events.find({}).toArray());
        console.log("We're connected!");
        eventsCollection = database.collection("events");
        usersCollection = database.collection("users");
        console.log("We're connected!");
    }
});

async function getEvents() {
    if (eventsCollection) {
        return await eventsCollection.find({}).toArray();
    } else {
        return [];
    }
}

async function getUser(name) {
    if (usersCollection) {
        return await usersCollection.findOne({username: name});
    }
    return null;
}

async function addUser(name, pw) {
    if (usersCollection) {
        await usersCollection.insertOne({username: name, password: pw});
        return true;
    }
    return false;
}

async function addEvent(eventName, eventState, username) {
    if (eventsCollection) {
        await eventsCollection.insertOne({
            name: eventName,
            state: eventState,
            createdBy: username
        });
        return true;
    }
    return false;
}

async function setMain(username, main) {
    if (usersCollection) {
        try {
            usersCollection.updateOne(
            { "username" : username },
            { $set: { "main" : main } }
            );
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
}