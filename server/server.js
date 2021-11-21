var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var recommendations = require("./routes/recommendations");
const app = express();
const books = require("../data/web_book_data.json");
const model = require("../model");
const controller = require('../controller/controller');
const port = process.env.PORT || 5000; //Line 3

//connection string
var mongoDB = 'mongodb+srv://test:test@cluster0.1xu2w.mongodb.net/harrys?retryWrites=true&w=majority'

//connecting to the database
mongoose.connect(mongoDB);

mongoose.connection.on('connected', ()=> {
    console.log("CONNECTION SUCCESSFUL")
})

mongoose.connection.on('error', (err)=> {
    console.log("ERROR: ", err)
})

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    spirit: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ingredients: {
        type: String,
        required: true
    },
    glass: {
        type: String,
        required: true
    }
})

var cocktailModel = mongoose.model('cocktails', schema)

app.post('/api/cocktails', function (req, res) {
    console.log("Cocktail added: " + req.body.cocktails);
    cocktailModel.create({
        name: req.body.name,
        spirit: req.body.spirit,
        description: req.body.description,
        ingredients: req.body.ingredients,
        glass: req.body.glass
    }, function (err, data) {
        if (err)
            res.send(err);
        res.json(data);
    })
});

app.get('/api/cocktails', function (req, res) {
    cocktailModel.find(function (err, data) {
        if (err)
            res.send(err);
        res.json(data);
    })
})


app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// app.set("views", path.join(__dirname), "views");
// app.set("view engine", "ejs");
// app.engine("html", require("ejs").renderFile);

//Body parser middleware
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.use(bodyParser.json());

app.get('/express_backend', (req, res) => { //Line 9
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
  }); //

app.get("/recommendations", function(req, res, next) {

    res.send("WELCOME TO recommendations PAGE")
});

app.get("/recommend", (req, res) => {
    let userId = 40;
    if (Number(userId) > 53424 || Number(userId) < 0) {
        res.send("User Id cannot be greater than 53,424 or less than 0!")
    } else {
        let recs = model.recommend(userId)
            .then((recs) => {
                res.send({recommendations: recs})
            })
    }

});

app.post('/api/cocktails', controller.create);
app.get('/api/cocktails', controller.find);
app.put('/api/cocktails/:id', controller.update);
app.delete('/api/cocktails/:id', controller.delete);

module.exports = app;