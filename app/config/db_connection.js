import mysql from 'mysql';
//ENV Variable

import dotenv from "dotenv";
dotenv.config();
const MYSQL_DATABASE_NAME = process.env.MYSQL_DATABASE_NAME;
const MYSQL_DATABASE_USERNAME = process.env.MYSQL_DATABASE_USERNAME;
const MYSQL_DATABASE_PASSWORD = process.env.MYSQL_DATABASE_PASSWORD;
const MYSQL_DATABASE_HOST = process.env.MYSQL_DATABASE_HOST;

var db = mysql.createConnection({
    host: MYSQL_DATABASE_HOST,
    user: MYSQL_DATABASE_USERNAME,
    password: MYSQL_DATABASE_PASSWORD,
    database: MYSQL_DATABASE_NAME
});
db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
export default db;