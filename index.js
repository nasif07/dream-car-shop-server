const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

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
        const cartCollection = client.db("cartCollectionDB").collection("allCart");


        // all cars

        app.post("/allcars", async (req, res) => {
            const car = req.body;
            const result = await carCollection.insertOne(car);
            console.log(result);
            res.send(result)
        });
        app.get("/allcars", async (req, res) => {
            const result = await carCollection.find().toArray();
            res.send(result)
            // console.log(result);
        })

        app.get("/allcars/:id", async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const query = {
                _id: new ObjectId(id)
            }
            const result = await carCollection.findOne(query);
            res.send(result);
            console.log(result);
        });

        app.put("/allcars/:id", async (req, res) => {
            const id = req.params.id;
            const data = req.body;
            const filter = {
                _id: new ObjectId(id)
            };
            const options = { upsert: true };
            const updatedData = {
                $set: {
                    image: data.image,
                    name: data.name,
                    brandName: data.brandName,
                    type: data.type,
                    description: data.description,
                    price: data.price,
                    rating: data.rating
                }
            };
            const result = await carCollection.updateOne(filter, updatedData, options);
            res.send(result);
        })

        // image, name, brandName, type, description, price, rating



        // all carts
        app.post("/allcart", async (req, res) => {
            const cart = req.body;
            const result = await cartCollection.insertOne(cart);
            console.log(result);
            res.send(result)
        });
        app.get("/allcart", async (req, res) => {
            const result = await cartCollection.find().toArray();
            res.send(result)
            console.log(result);
        })



        app.get("/allcars/:id", async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const query = {
                _id: new ObjectId(id)
            }
            const result = await carCollection.findOne(query);
            res.send(result);
            console.log(result);
        });

        app.delete("/allcart/:id", async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const query = {
                _id: new ObjectId(id)
            }
            const result = await cartCollection.deleteOne(query);
            res.send(result);
            console.log(result);
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