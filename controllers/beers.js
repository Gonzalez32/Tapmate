const Beer = require('../models/beer')
const axios = require('axios')

module.exports = {
    new: newBeer,
    create,
    index,
}

function newBeer(req, res) {
    res.render("beers/new", {
        title: "Beer",
    })
}

function create(req, res) {
    
}

function index(req, res) {
    axios.get(`https://api.punkapi.com/v2/beers/`)
    .then((resp) => {
        Beer.find({}, (err, beers) => {
            // console.log(resp.data);
            res.render('beers/index', {
                title: "Beer Collections",
                user: req.user,
                beers: resp.data
            })
        })
    })
}