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
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
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

// app.get("/", (req, res) => {
//     const cocktail = new cocktailModel({ name: "test", spirit: "test", description: "test", ingredients: "test", glass: "test" })
//     try {
//         cocktail.save();
//         res.send("inserted data");
//     } catch (err) {
//         console.log(err);
//     }
// });

app.post('/api/insert', function (req, res) {
    console.log("inside insert");
    if (!req.body) {
        res.status(400).send({message: "Cannot be empty"});
        return;
    }

    //new user
    const cocktail = new cocktailModel({
        name: req.body.name,
        spirit: req.body.spirit,
        description: req.body.description,
        ingredients: req.body.ingredients,
        glass: req.body.glass
    })

    try {
        cocktail.save();
        res.send("inserted data");
    } catch (err) {
        console.log(err);
    }

    //save user in database 
    // user.save(user).then(data => {
    //     res.send(data)
    //     console.log("");
    // })
    //     .catch(err => {
    //         res.status(500).send({
    //             message: err.message || 'Some error occurred while creating the cocktail'
    //         });
    //     });
});

app.get('/api/cocktails', function (req, res) {
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
    console.log("ID: ", req.body._id);
    console.log("Body: ", req.body);

    cocktailModel.findByIdAndUpdate(req.body._id, req.body,
        function (err, data) {
            if (err) {
                console.log(err);
            }
            console.log(data);
            res.json(data);
        });
})

/*
router.route('/update-student/:id').put((req, res, next) => {
    studentSchema.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, (error, data) => {
      if (error) {
        return next(error);
        console.log(error)
      } else {
        res.json(data)
        console.log('Student updated successfully !')
      }
    })
  })

*/

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