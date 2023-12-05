var express = require('express');
var app = express();
var { MongoClient, ServerApiVersion } = require('mongodb');
var cors = require('cors');
var bodyParser = require('body-parser');

var port = 5000;
// var port = 8080;

app.use(bodyParser.json())
app.use(cors());

async function Connection(uri) {

  try {

    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    }
    );

    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");

    return { status: 201, client: client, };
  } catch (error) {
    return { status: 500, client: error };
  }
}

app.post("/connect", async (req, res) => {
  let { uri } = req.body;
  var result = await Connection(uri)
  res.json({ status: result.status })
})

app.get("/databases", async (req, res) => {
  let { uri } = req.query
  console.log(uri);
  let result = await Connection(uri)



  if (result.status !== 201)
    res.json({ status: result.status, message: result.client })

  console.log(result.status)
  let client = result.client

  let databasesList = await client.db().admin().listDatabases();
  // databasesList.databases.forEach(db => console.log(`${db.name}`));

  res.json({ status: 201, databasesList })


})


app.listen(port, () => {
  console.log("Server is running on port " + port);
})