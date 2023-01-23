const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());


// Mongodb And Send User Data To The Server
const uri = "mongodb+srv://dbUser1:CIn42bwZCXBOMFBm@cluster0.wbb4jrx.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const userCollection = client.db('nodeMongoCrud').collection('users');

        //----------- get from db ---------------
        app.get('/users', async (req, res) => {
            const query = {}; // All data collect korte chai tai empty obj
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        })
        //---------------------------------------

        //---------- send to db -----------------
        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log(user);

            // db te data send
            const result = await userCollection.insertOne(user)
            res.send(result);
        })
        //---------------------------------------
    }
    finally {

    }

}

run().catch(err => console.log(err));






app.get('/', (req, res) => {
    res.send('Hello from node mongo crud server')
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})