const express = require('express')
const { connectToDB } = require("./db/conn")
const eventRoutes = require('./routes/eventRoutes');
const chalk = require('chalk');
const bodyParser = require('body-parser')

const app = express();

app.use(express.urlencoded(({ extended: true })))
app.use(bodyParser.json())

// coonecting to the database
connectToDB()
    .then(() => {
        console.log(`${chalk.bgGreen("SUCCESS:")} Database Connected`);
    })
    .catch((err) => {
        throw err;
    });

const baseUrl = process.env.BASEURL;

// middleware for the routes
app.use(baseUrl, eventRoutes);

// page not found route
app.all("*", (req, res, next) => {
    return res.status(400).json({ statusCode: 400, status: "Error", Message: [`Bad Request`], result: {} })
});

module.exports = app;
