var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var recommendations = require("./routes/recommendations");
const app = express();
const books = require("../data/web_book_data.json");
const model = require("../model");
const controller = require('./controller/controller');
const port = process.env.PORT || 5000; //Line 3


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//connection string
var mongoDB = 'mongodb+srv://test:test@cluster0.1xu2w.mongodb.net/harrys?retryWrites=true&w=majority'

//connecting to the database
mongoose.connect(mongoDB);

mongoose.connection.on('connected', () => {
    console.log("CONNECTION SUCCESSFUL")
})

mongoose.connection.on('error', (err) => {
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

app.get("/", (req, res) => {
    res.json({ message: "express server" });
});

app.post('/api/cocktails', function (req, res) {
    console.log("inside create");
    // if (!req.body) {
    //     res.status(400).send({message: "Cannot be empty"});
    //     return;
    // }

    //new user
    const user = new cocktailModel({
        name: req.body.name,
        spirit: req.body.spirit,
        description: req.body.description,
        ingredients: req.body.ingredients,
        glass: req.body.glass
    })

    //save user in database 
    user.save(user).then(data => {
        res.send(data)
        console.log("send data");
    })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the cocktail'
            });
        });
});

app.get('/api/cocktails', function (req, res) {
    cocktailModel.find(function (err, data) {
        if (err)
            res.send(err);
        res.json(data);
    })
})


app.put('/api/cocktails/:id', function (req, res) {
    console.log("ID: ", req.params._i);
    console.log("Body: ", req.body);

    cocktailModel.findByIdAndUpdate(req.params.id, req.body,
        function (err, data) {
            if (err) {
                console.log(err);
            }
            console.log(data);
            res.json(data);
        });
})

app.post('/api/suggestions', function (req, res) {

    var criteria = req.body;
    console.log("body: ", criteria);
    // var criteria = req.body;
    cocktailModel.find(criteria, function (err, data) {
        if (err)
            res.send(err);
        res.json(data);
    })
})

app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

app.get("/recommend", (req, res) => {
    let userId = 40;
    if (Number(userId) > 53424 || Number(userId) < 0) {
        res.send("User Id cannot be greater than 53,424 or less than 0!")
    } else {
        let recs = model.recommend(userId)
            .then((recs) => {
                res.send({ recommendations: recs })
            })
    }

});

const spirit = "Vodka"
app.post('/api/cocktails', controller.create);
app.get('/api/cocktails', controller.find);
app.put('/api/cocktails/:id', controller.update);
app.delete('/api/cocktails/:id', controller.delete);


module.exports = app;