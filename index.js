const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(cors());
app.use(express.json());
require('dotenv').config()


const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.k7dzav4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        const craftCollection = client.db("craftDB").collection('craft');

        app.get('/crafts', async(req, res) => {
            const cursor = craftCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })


        app.post('/crafts', async(req, res) => {
            const item = req.body;
            // console.log(item);
            const result = await craftCollection.insertOne(item);
            res.send(result);
        })


        app.delete('/crafts/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id: new ObjectId(id)};
            const result = await craftCollection.deleteOne(query);
            res.send(result)
        })





        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', async (req, res) => {
    res.send('Artful Server is Running');
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})



