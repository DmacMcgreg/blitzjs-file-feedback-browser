#!/usr/bin/env node
const express = require("express");
const bodyParser = require("body-parser");
const zip = require("express-easy-zip");
const app = express();
const mode = process.argv[2];

app.use(zip());
app.use(bodyParser.json());

app.use(express.static("app"));

require("./common")(app, express);
let port = 3000;
if (process.env.NODE_ENV === "production") {
	port = 8080;
}
// eslint-disable-next-line
app.listen(port, () => console.log(`run on port ${port}`));
