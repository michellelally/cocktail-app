var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
// const books = require("./data/web_book_data.json")
// const model = require("./model")

var recommendations = require("./routes/recommendations");


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