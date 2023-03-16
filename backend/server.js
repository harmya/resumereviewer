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
app.get('/api/login', (req, res) => {
    res.send('Login Page');
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
        console.log(`Found a user with the username '${username}'`);
        return true;
    } else {
        console.log(`No user matches the username '${username}'`);
        return false;
    }
}
//list all databases
async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}
 


