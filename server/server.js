const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');
var cors = require('cors')

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors())

// Connection URI
const uri = "mongodb://127.0.0.1:27017/";

// Create a new MongoClient
const client = new MongoClient(uri, {
});

async function init() {
  await client.connect();

  // Establish and verify connection
  await client.db("admin").command({ ping: 1 });
  // console.log("Connected successfully to server");

  return client;
}
// run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/Database', async (req, res) => {
  let client = await init()
  let dbs = await client.db().admin().listDatabases()
  res.send(dbs.databases)
});

app.get('/Collections/:db', async (req, res) => {
  // console.log(req.params['db'])
  let { db } = req.params
  let client = await init()
  let collections = await client.db(db).listCollections().toArray()
  // console.log(collections)
  res.send(collections)
});

app.get('/Documents', async (req, res) => {
  // console.log(req.params['db'])
  // let {database, collection} = req.query

  // console.log({database: database, collection:collection})

  let client = await init()

  let db = await client.db("Mendix");
  let col = await db.collection("TC_Data");

  let cursor = await col.find().toArray();

  res.send(cursor)

});

app.get('/Document/:id', async (req, res) => {
  console.log(req.params['id'])
  let { id } = req.params

  // console.log({database: database, collection:collection})

  let client = await init()

  let db = await client.db("Mendix");
  let col = await db.collection("TC_Data");
  var o_id = new ObjectId(id);
  // collection.update({ '_id': o_id });

  let cursor = await col.findOne({ _id: o_id });
  console.log(cursor);

  res.send(cursor)

});


app.post("/record", async (req, res) => {
  // console.log(req.body);

  let { _id, Item_Name, Item_ID, itemRevisionID, CreationDate, ReleasedDate, Description, String, UID, } = req.body

  let db = await client.db("Mendix");
  let col = await db.collection("TC_Data");

  let doc ={
    Item_Name: Item_Name,
    Item_ID: Item_ID,
    itemRevisionID: itemRevisionID,
    CreationDate: CreationDate,
    ReleasedDate: ReleasedDate,
    Description: Description,
    String: String,
    UID: UID,
  }
  const result = await col.insertOne(doc);
  // console.log(result);

  if(result.acknowledged)
    res.sendStatus(200)
  else
    res.sendStatus(500)
})

app.patch("/record/update", async(req, res)=>{
  let { _id, Item_Name, Item_ID, itemRevisionID, CreationDate, ReleasedDate, Description, String, UID, } = req.body
  let doc ={
    Item_Name: Item_Name,
    itemRevisionID: itemRevisionID,
    Description: Description,
  }

  let updateDoc = {
    $set:doc
  }

  let db = await client.db("Mendix");
  let col = await db.collection("TC_Data");
  var o_id = new ObjectId(_id);

  let result = await col.updateOne({_id: o_id}, updateDoc);

  // console.log(result);

  if(result.modifiedCount > 0)
    res.send('200')
  else
    res.send('500')

})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
