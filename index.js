const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000


// middelware
app.use(cors())
app.use(express.json())


// libraryManage
// rdRKtcVeejWcSafK


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ntnzcww.mongodb.net/?retryWrites=true&w=majority`;

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
    await client.connect();

    const database = client.db("libraryManage");
    const brandCollection = database.collection("categories");
    const teamCollection = database.collection("team");
    const bookCollection = database.collection("book");


    // get the categories 
    app.get('/category', async(req,res) =>{
const cursor = brandCollection.find()
  const result = await cursor.toArray()
  res.send(result)
    })

    // get the dynamic id for brand crategories
app.get('/category/:id', async(req,res) =>{
  const id = req.params.id;
  const query = {_id: new ObjectId(id)}
  const result = await brandCollection.findOne(query)
  res.send(result)
})

    // get the team
    app.get('/team', async(req,res) =>{
const cursor = teamCollection.find()
  const result = await cursor.toArray()
  res.send(result)
    })

    // create book data
app.post('/book', async(req,res) =>{

  const newbook = req.body;
  console.log(newbook)
 
  const result = await bookCollection.insertOne(newbook);
  res.send(result)
})
// get book data
app.get('/book', async(req,res) =>{
  const cursor = bookCollection.find()
  const result = await cursor.toArray()
  res.send(result)
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
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})