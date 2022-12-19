const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000
const app = express();
require('dotenv').config();

app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.trx5yvh.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try{
        const taskCollection = client.db('taskDatabase').collection('task');

        app.get('/task', async(req, res) => {
            const query = {}
            const task = await taskCollection.find(query).toArray()
            res.send(task)
        })


        app.post('/task', async(req, res) => {
            const task = req.body;
            console.log(task);
            const result = await taskCollection.insertOne(task);
            res.send(result)

        })

    }



    finally{

    }
}

run().catch(console.log)




app.get('/', async(req, res) => {
    res.send('Task server is running')
})

app.listen(port, () => {
    console.log(`Task Server is running on ${port}`);
})