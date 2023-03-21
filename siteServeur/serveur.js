const express = require("express");
const server = express();
const morgan = require("morgan");
const router = require("./routeur");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");

server.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000 }
}))

// mongoose.connect("mongodb://127.0.0.1:27017/biblio2", {useNewUrlParser:true,useUnifiedTopology:true});

var dbURL = "mongodb://127.0.0.1:27017/biblio2";
console.log(dbURL);

mongoose.set('strictQuery', false)

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log("MongoDB connected !"))
.catch(err => console.log("Error : "+ err));

server.use(express.static("public"))
server.use(morgan("dev"));
server.use(bodyParser.urlencoded({extended:false}));
server.set('trust proxy', 1);

server.use((requete, reponse, suite) => {
    reponse.locals.message = requete.session.message;
    delete requete.session.message;
    suite();
})

server.use("/",router);

server.listen(3000);

