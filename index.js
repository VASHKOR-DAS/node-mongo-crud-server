const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

        //-------- update user ------------------
        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const user = await userCollection.findOne(query);
            res.send(user);
        })

        app.put('/users/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const updatedUser = req.body;
            console.log(updatedUser);
        })
        //--------------------------------------

        //---------- send to db -----------------
        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log(user);

            // db a data send
            const result = await userCollection.insertOne(user)
            res.send(result);
        })
        //---------------------------------------

        //-------- DELETE a specific User -------
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            // console.log('trying to delete', id);

            // delete from db

            // db er _id er vitor ObjectId wala 1ta kichu ase setar theke amader clicked id ta delete korte hobe
            const query = { _id: ObjectId(id) }
            const result = await userCollection.deleteOne(query);
            console.log(result);
            res.send(result);
        })
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