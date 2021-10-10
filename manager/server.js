
const express = require("express");
const bodyParser = require("body-parser");
const Routes = require('./src/middleware/routes');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

Routes.configureRoutes(app);

app.listen(process.env.APP_PORT, () => {
	console.warn(`Aplication '${process.env.APP_NAME}' is running on port ${process.env.APP_PORT}.`);
});