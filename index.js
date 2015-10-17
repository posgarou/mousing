var express = require("express");

var app = express();

app.use(express.static("dist"));

app.listen(process.env.port || 3333);
