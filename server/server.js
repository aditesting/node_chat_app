require("./../config/config");

const path = require("path");
const express = require("express");

const PUBLIC_PATH = path.join(path.dirname(__dirname), "public")

var app = express();

app.use(express.static(PUBLIC_PATH));

app.listen(process.env.PORT, ()=>{
	console.log(`app started on port ${process.env.PORT}`)
})
