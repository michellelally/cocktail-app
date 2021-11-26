var cocktaildb = require('../../model/model');

//create and save a new cocktail

exports.create = (req, res) => {
    //validate request 
    console.log("inside create");
    if (!req.body) {
        res.status(400).send({message: "Cannot be empty"});
        return;
    }

    //new user
    const user = new cocktaildb({
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

}

// retrieve and return all users/a single user
exports.find = (req, res) => {
    console.log("find");
    cocktaildb.find().then(cocktails => {
        res.send(user)
    }).catch(err => {
        res.status(500).send({message: err.message || 'Error occured'});
    })

}

const criteria = {spirit: "Vodka", description: "Refreshing"}
exports.query = (req, res) => {
    cocktails.find(criteria).then(cocktails => {
        res.send(user)
    }).catch(err => {
        res.status(500).send({message: err.message || 'Error occured'});
    })

}

exports.update = (req, res) => {

}

exports.delete = (req, res) => {

}

exports.filter = (req,res) => {

}

// app.get('/api/cocktails?name=${}', function (req, res) {
//     cocktailModel.find(function (err, data) {
//         if (err)
//             res.send(err);
//         res.json(data);
//     })
// })
