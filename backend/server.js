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
        await client.connect()
        await listDatabases(client)
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
 


