const MongoClient = require('mongodb').MongoClient;
const config = {
    db: "mongodb://localhost:27017/smash"
}

const csv = require('csvtojson');
const sha1 = require('sha1');

let database = null;
MongoClient.connect(config.db, async function (err, db) {
    if (err) {
        console.log(err);
        process.exit(1);
    } else {
        let seedData = await csv().fromFile("./data.csv");

        database = db.db("smash");

        //await database.dropCollection("events");
        //await database.dropCollection("users");

        //await database.createCollection("events");
        //await database.createCollection("users");

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
    }

    process.exit(0);
});
