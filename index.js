const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());




const uri = "mongodb+srv://nasifulislamnasif23:49s3PZc0qxQfR3ru@cluster0.wua5kdw.mongodb.net/?retryWrites=true&w=majority";

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

        const carCollection = client.db("carsCollectionDB").collection("allCars");

        app.post("/allcars", async(req, res) => {
            const car = req.body;
            const result = await carCollection.insertOne(car);
            console.log(result);
            res.send(result)
        });
        app.get("/allcars", async(req, res) => {
            const result = await carCollection.find().toArray();
            res.send(result)
            // console.log(result);
        })
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('server is running!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})