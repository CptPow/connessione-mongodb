//istanza di MongoClient per effettuare una connessione locale
const {MongoClient} = require("mongodb");

require("dotenv").config();
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;
//stringa per la connessione locale
const DB_LOCAL_CONNECT = `mongodb://127.0.0.1:${DB_PORT}/${DB_NAME}`;

//creo istanza di MongoClient
const localMongo = new MongoClient(DB_LOCAL_CONNECT);

async function connectMongoDb() {
    try {
        await localMongo.connect();
        console.log(`Connesso al DB locale ${DB_NAME}`);
    } catch (error) {
        console.error(error);
        process.exit();
    }
}

module.exports = {localMongo, connectMongoDb};