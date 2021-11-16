var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
// const books = require("./data/web_book_data.json")
// const model = require("./model")


const port = process.env.PORT || 5000; //Line 3

const app = express();
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

//Body parser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(bodyParser.json());

app.get('/express_backend', (req, res) => { //Line 9
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
  }); //

app.get("/books", (req, res) => { res.render("index", { books: books.slice(0, 12), pg_start: 0, pg_end: 12 }) });
