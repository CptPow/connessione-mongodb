const express = require("express");
const app = express();
const {localMongo, connectMongoDb} = require("./database/local");
const { error } = require("console");

require("dotenv").config();
const PORT = process.env.PORT;
const DB_NAME = process.env.DB_NAME;

//connessione MongoDB locale
connectMongoDb().then( ()=> {
    app.listen(PORT, ()=> {
        console.log(`Server in ascolto sulla porta ${PORT}`)
    });
}).catch( (error) => {
console.error("Errore connessione al DB", error);
process.exit(1)
});

app.get("/", async (req, res) => {
    try{
    const db = localMongo.db(DB_NAME);
    const collection = db.collection("books");
    const documents = await collection.find({}).toArray();
    res.json(documents);
}catch (err) {
    console.error(err);
    res.status(500).send("Recupero dati fallito");
}
});
