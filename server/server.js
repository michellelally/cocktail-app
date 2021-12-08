var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
const app = express();
const books = require("../app/data/web_cocktail_data.json");
const model = require("../model");
const port = process.env.PORT || 5000; //Line 3
const mongoURI = process.env.MONGODB_URI;
const cors = require('cors');
const option = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    reconnectTries: 30000
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

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

var userModel = require('./model/userModel');

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

app.post('/api/insert', function (req, res) {
    console.log("/api/insert");
    console.log("req.body", req.body)
    if (!req.body) {
        res.status(400).send({message: "Cannot be empty"});
        return;
    }

    const cocktail = new cocktailModel({
        name: req.body.name,
        spirit: req.body.spirit,
        description: req.body.description,
        ingredients: req.body.ingredients,
        glass: req.body.glass
    })

    try {
        cocktail.save();
        res.send({ inserted: true});
    } catch (err) {
        console.log(err);
        res.send(err)
    }
});

app.get('/api/cocktails', function (req, res) {
    console.log('/api/cocktails');
    cocktailModel.find(function (err, data) {
        if (err)
            res.send(err);
        res.json(data);
    })
})

app.post('/api/cocktail', function (req, res) {
    const id = req.body.key;
    console.log("Read cocktail: ", id);
    cocktailModel.findById(id,
        function (err, data) {
            res.json(data);
        });
})

app.put('/api/update', function (req, res) {
    console.log('/api/update');
    console.log('req.body._id req.body,' , req.body._id, req.body)
    cocktailModel.findByIdAndUpdate(req.body._id, req.body,
        function (err, data) {
            if (err) {
                console.log(err);
            }
            console.log(data);
            res.json(data);
        });
})

app.delete('/api/delete/:id', function(req, res){
    console.log('/api/delete/:id');
    const id = req.params.id
    console.log("ID: ", id);

    cocktailModel.deleteOne({ _id: id },
        function (err, data) {
            if (err)
                res.send(err);
            res.json(data);//send back 
        });

})

app.post('/api/suggestions', function (req, res) {
    console.log('/api/suggestions');

    var criteria = req.body
    console.log('criteria: ', criteria)
    cocktailModel.find(criteria, function (err, data) {
        if (err)
            res.send(err);
        res.json(data);
    })
})

app.post("/recommend", (req, res) => {
    console.log('/recommend');

    let userId = req.body.key;
    if (Number(userId) > 40 || Number(userId) < 0) {
        res.send("User Id cannot be greater than 40 or less than 0!")
    } else {
        let recs = model.recommend(userId)
            .then((recs) => {
                res.send({ recommendations: recs })
            })
    }

});

app.listen(port, () => console.log(`Listening on port ${port}`)); 

app.use(function (req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function (err, decode) {
            if (err) req.user = undefined;
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
});
var routes = require('./route/userRoute');
routes(app);

app.use(function (req, res) {
    return res.status(404).json({ url: req.originalUrl + ' not found' })
});

module.exports = app;