var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');

// const books = require("./data/web_book_data.json")
// const model = require("./model")

var recommendations = require("./routes/recommendations");

//connection string
var mongoDB = 'mongodb+srv://test:test@cluster0.1xu2w.mongodb.net/test?retryWrites=true&w=majority'



//connecting to the database
mongoose.connect(mongoDB);


mongoose.connection.on('connected', ()=> {
    console.log("CONNECTION SUCCESSFUL")
})

mongoose.connection.on('error', (err)=> {
    console.log("ERROR: ", err)
})


//Schema
var Schema = mongoose.Schema;


const port = process.env.PORT || 5000; //Line 3

const app = express();
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

app.set("views", path.join(__dirname), "views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

//Body parser middleware
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.use(bodyParser.json());

// app.use("/", index);
// app.use("/api", recommendations);

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

})
module.exports = app;


// var express = require('express');
// var app = express();
// var path = require('path');
// var bodyParser = require('body-parser');

// //importing mongoose
// var mongoose = require('mongoose');

// //connection string
// var mongoDB = 'mongodb://michellelally:datarep2018@ds213053.mlab.com:13053/half-a-minute'

// //connecting to the database
// mongoose.connect(mongoDB, { useNewUrlParser: true });

// //Schema
// var Schema = mongoose.Schema;

// //How its writing the data
// var wordsSchema = new Schema({
//     words: String
// })

// //Data Model
// var WordModel = mongoose.model('words', wordsSchema);

// //Here we are configuring express to use body-parser as middle-ware. 
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS")
//     res.header("Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

// app.post('/api/words', function (req, res) {
//     console.log("Word added: " + req.body.words);
//     WordModel.create({
//         words: req.body.words //words: has to match schema name
//     }, function (err, data) {
//         if (err)
//             res.send(err);
//         res.json(data);
//     })
// });

// app.get('/api/words', function (req, res) {
//     WordModel.find(function (err, data) {
//         if (err)
//             res.send(err);
//         res.json(data);
//     })
// })

// app.delete('/api/words/:id', function (req, res) {
//     WordModel.deleteOne({ _id: req.params.id },
//         function (err, data) {
//             if (err)
//                 res.send(err);
//             res.json(data);//send back 
//         });
// })

// //Update
// app.get('/api/words/:id', function (req, res) {
//     console.log("Read word: ", req.params.id);
//     WordModel.find({ _id: req.params.id },
//         function (err, data) {
//             res.json(data);
//         });
// })

// app.put('/api/words/:id', function (req, res) {
//     console.log("Word ID: ", req.params.id);
//     console.log("Word Body: ", req.body);

//     WordModel.findByIdAndUpdate(req.params.id, req.body,
//         function (err, data) {
//             if (err) {
//                 console.log(err);
//             }
//             console.log(data);
//             res.json(data);
//         });
// })


// var server = app.listen(8081, function () {
//     var host = server.address().address
//     var port = server.address().port

//     console.log("Example app listening at http://%s:%s", host, port)
// })

