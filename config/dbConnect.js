/* DB 연결 */
const MongoClient = require('mongodb').MongoClient;
require("dotenv").config();
const dbUrl = `mongodb://${process.env.DB_USER}:${process.env.DB_PW}@localhost:27017`; // DB 접속 url 
const db = new MongoClient(dbUrl).db('jungle-test');

module.exports = db;