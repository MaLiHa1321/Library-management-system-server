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
    const cartCollection = database.collection("cart");


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

  // for filter data
  let queryOb={}
  const type = req.query.type;
  if(type){
    queryOb.type = type
  }

  // // pagination 
  const page = Number(req.query.page);
  const limit = Number(req.query.limit);
  const skip = (page - 1)* limit;
  const cursor = bookCollection.find(queryOb).skip(skip).limit(limit)
  const result = await cursor.toArray()

  // count data
  const total = await bookCollection.countDocuments()
  res.send({
    total,result
  })
})

// get id for book data update
app.get('/book/:id', async(req,res) =>{
  const id = req.params.id;
  const query = {_id: new ObjectId(id)}
  const result = await bookCollection.findOne(query)
  res.send(result)
})
// for all books data update
app.put('/book/:id', async(req,res) =>{
  const id = req.params.id;
  const filter = { _id: new ObjectId(id)}
  const options = {upsert: true}
  const updateproduct = req.body;
  const product ={
    $set: {
      name : updateproduct.name,
      quantity : updateproduct.quantity,
      photo : updateproduct.photo,
      type : updateproduct.type,
      des : updateproduct.des,
      author : updateproduct.author,
      rating : updateproduct.rating
    
    }
  }
  const result = await bookCollection.updateOne(filter,product,options)
  res.send(result)
})

// creat cart data for user
app.post('/cart', async(req,res) =>{
    
  const borrow = req.body;
  const result = await cartCollection.insertOne(borrow);
  res.send(result)
})



app.get('/cart', async(req, res) => {
 
  // console.log(req.query.email)
  let query ={}
  if(req?.query?.email){
    query= {email: req?.query?.email}
  }

  const cursor = cartCollection.find(query);
  const result = await cursor.toArray();

  // console.log('Result:', result);

  res.send(result);
});













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