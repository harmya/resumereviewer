const hostname = 'localhost';
const port = 3000;

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require('cors');
app.use(cors());

app.get ('/api', (req, res) => {
    res.send('Home Server');
});

app.get ('/api/upload', (req, res) => {
    res.send('File Upload Server');
});

let fs = require('fs');
let formidable = require('formidable');
const { spawn } = require('child_process');

app.post ('/api/upload', (req, res) => {
    console.log("uploading file");
    let form = new formidable.IncomingForm();
    //console.log(form);
    form.parse(req, (error, fields, file) => {
        
        let filepath = file.fileUpload.filepath;
        
        let newpath = '/Users/harmyabhatt/resumeReviewer/database/uploadedResumes/' + file.fileUpload.originalFilename;
        
        fs.rename(filepath, newpath, function() {
             console.log('File uploaded and moved!');
        });

        file_name = file.fileUpload.originalFilename;
        var dataToSend;
        // spawn new child process to call the python script
        const python = spawn('python3', ['resumeAnalysis.py', file_name]);
        // collect data from script
        python.stdout.on('data', function (data) {
         console.log('Pipe data from python script ...');
         dataToSend = data.toString();
        });
        // in close event we are sure that stream from child process is closed
        python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        response_json = dataToSend
        res.send(response_json).status(200);
        });
    });
});

app.post ('/api/savescore', async(req, res) => {
    try {
        scoreInfo = req.body;
        console.log(scoreInfo);
        const user = await addScoreToDatabase(scoreInfo);
        res.status(200).send('Score Added Successfully');
    } catch (err) {
        console.log(err.stack)
        res.status(500).send('Server Error, Please try again later');
    }
});

//route to handle user registration
app.post('/api/login', async (req, res) => {
    try {
        loginInfo = req.body;
        console.log(loginInfo);
        query = { username: loginInfo.username };
        const username_exists = await findUsername(query);
        if (!username_exists) {
            data = {
                "message": "no user"
            }
            res.status(200).send(data);
            return;
        }
        const passMatch = await matchPassword(loginInfo.password);
        if (!passMatch) {
            data = {
                "message": "wrong password"
            }
            res.status(200).send(data);
            return;
        }
        data = {
            "message": "success"
        }
        res.status(200).send(data);
    } catch (err) {
        console.log(err.stack)
        res.status(500).send('Server Error, Please try again later');
    }
});
app.post('/api/score', async (req, res) => {
    try {
        console.log(req.query);
        username = req.body.username;
        query = { username: username };
        const score = await findScore(query);
        console.log(score);
        if (score == 0) {
            res.status(200).send("NO_SCORE");
            return;
        }
        res.status(200).send(score);
    } catch (err) {
        console.log(err.stack)
        res.status(500).send('Server Error, Please try again later');
    }
});
app.get('/api/signup', async (req, res) => {
    try {
        console.log(req.query);
        username = req.query.username;
        const occurs = await findUsername(req.query);
        console.log(occurs);
        res.status(200).send(occurs);
    } catch (err) {
        console.log(err.stack)
        res.status(500).send('Server Error, Please try again later');
    }
});
app.post ('/api/signup', async(req, res) => {
    try {
        loginInfo = req.body;
        const user = await insertloginInfo(loginInfo);
        res.status(200).send('User registered successfully');
    } catch (err) {
        console.log(err.stack)
        res.status(500).send('Server Error, Please try again later');
    }
});

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://harmya:userauthentication@user-authentication.kmidscj.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri)

async function connectToDatabase() {
    try {
        //await client.connect()
        //await listDatabases(client)
        app.listen(port, () => {
            console.log(`Server running at http://${hostname}:${port}/api`);
        });
    } catch (err) {
        console.log(err.stack)
    }
}
connectToDatabase().catch(console.error);

//access the login-information collection
async function insertloginInfo(newLoginInfo) {
    const result = await client.db("user-authentication").collection("login-information").insertOne(newLoginInfo);
    console.log(`New login information created with the following id: ${result.insertedId}`);
}

async function findUsername(query) { 
    console.log(`Looking for a user with the username '${query.username}'`)
    const result = await client.db("user-authentication").collection("login-information").findOne(query);
    if (result) {
        console.log(`Found a user with the username '${query.username}'`);
        return true;
    } else {
        console.log(`No user matches the username '${query.username}'`);
        return false;
    }
}
async function matchPassword(password_text) {
    console.log(`Looking for a user with the username '${query.username}'`)
    const dataPoint = await client.db("user-authentication").collection("login-information").findOne(query);
    password_hashed = dataPoint.password;
    password_text = password_text;

    console.log(password_hashed);
    console.log(password_text);

    const bcrypt = require('bcrypt');
    const result = await bcrypt.compareSync(password_text, password_hashed);
    if (result) { 
        console.log("password matches");
        return true;
    }
    else {
        console.log("password does not match");
        return false;
    }


}
//list all databases
async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

async function addScoreToDatabase(score_data) {
    console.log(`Adding score for user '${score_data.data_to_save.username}'`)
    console.log(score_data);
    save_data = {
        "username": score_data.data_to_save.username,
        "score": score_data.data_to_save.score,
    }
    const result = await client.db("user-authentication").collection("scores").insertOne(save_data);
    console.log(`New score created with the following id: ${result.insertedId}`);
}

async function findScore(query) {
    console.log(`Looking for a score for user '${query.username}'`)
    // get the score from the database which is last in the list
    const score = await client.db("user-authentication").collection("scores").findOne(query)
    if (score) {
        console.log(`Found a score for user '${query.username}'`);
    } else {
        return 0;
    }
    // delete this score from the database
    const result = await client.db("user-authentication").collection("scores").deleteOne(query);
    console.log(`Deleted score with the following id: ${result.deletedCount}`)
    console.log(score.score);
    return score.score;
}
