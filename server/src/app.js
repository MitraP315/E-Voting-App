const express = require('express');
const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const expressValidator = require('express-validator');
const electionName = require('./models/electionName');
const admin = require('./models/admin');
const Voter = require('./models/voter');
const md5 = require('md5');

//connect db
require('./db/mongoose');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.get('/', function (req, res) {
    res.json('Works!');
});

app.get('/api/electionName', function (req, res) {
    var electionNames = []
    var electionOrganizers = []
    var electionIds = []
    var final = []
    electionName.find({}).then(eachOne => {
        for (i = 0; i < eachOne.length; i++) {
            electionNames[i] = eachOne[i].election_name;
            electionOrganizers[i] = eachOne[i].election_organizer;
            electionIds[i] = eachOne[i].election_id;
            final.push({
                'election_id': eachOne[i].election_id,
                'election_organizer': eachOne[i].election_organizer,
                'election_name': eachOne[i].election_name
            })
        }
        res.send(final);
    })
})
//create election
app.post('/api/electionName', async function (req, res) {

    electionName.create({
        election_id: Math.floor(Math.random() * 100),
        election_name: req.body.election_name,
        election_organizer: req.body.election_organizer,
        election_password: md5(req.body.election_password),
    }).then(election => {
        res.json(election);
    });
});

app.post('/api/adminLogin', async function (req, res) {
    // console.log(req.body)
    // console.log(await admin.findOne({ username: "saugat" }))
    await admin.findOne({
        username: req.body.username,
        // password: md5(req.body.password),
        password: req.body.password,
    }).then(election => {
        if (election === null) {
            res.send(false);
        } else {
            res.send(true);
        }
    });
});

app.post("/api/createadmin", async (req, res) => {
    try {
        console.log(req.body)
        admin.create({
            username: req.body.username,
            password: req.body.password
        }).then(() => {
            console.log("admin created")
        })

    } catch (err) {
        console.log("error creating admin")
    }
})
//add voter

app.post("/api/addVoter", async (req, res) => {
    try {
        const voter = await Voter.create({
            //all required details
        })
        console.log(voter)
    } catch (error) {
        console.log("error adding voter");
    }
})

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log("Server is up on port " + port)
});