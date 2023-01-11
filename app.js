require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require("morgan")
const routes = require("./src/backend/routes/")

app.use(morgan("combined"))

app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);


module.exports = app