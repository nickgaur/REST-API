console.clear()
require("dotenv").config({ path: "./.env.development" });
const chalk = require('chalk');
const app = require('./app')


// server connection
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`${chalk.bgGreen("SUCCESS:")} SERVER STARTED ON PORT ${port}`);
})