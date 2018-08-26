const express = require('express');
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const config = {
    db: "mongodb://localhost:27017/smash"
};
let eventsCollection = null;
let usersCollection = null;

const app = express();
app.use(bodyParser.json());

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

app.listen(3001, () => {
    console.log("Server's up.");
})



//------------------ Mongo

MongoClient.connect(config.db, function (err, mongo) {
    if (err) {
        console.log(err);
    } else {
        let database = mongo.db("smash");
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