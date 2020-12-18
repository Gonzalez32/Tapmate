const Beer = require('../models/beer')
const axios = require('axios')


module.exports = {
    new: newBeer,
    search,
    show,
    addToCollection,
    removeFromCollection,
    index,
}

function newBeer(req, res) {
    res.render("beers/new", {
        title: "Beer Search",
        user: req.user,
        results: null,
    })
}

function search(req, res) {
    axios
      .get(`https://api.punkapi.com/v2/beers?beer_name=${req.body.query}`)
      .then((response) => {
        console.log(response.data)
        res.render("beers/new", {
          title: "Beer Search",
          user: req.user,
          results: response.data
        })
      })
}

function show(req, res) {
    axios
      .get(`https://api.punkapi.com/v2/beers/${req.params.id}`)
      .then((response) => {
        Beer.findOne({ id: response.data.id })
        .populate('favoritedBy')
        .then((beer) => {
          if(beer) {
            res.render("beers/show", {
              title: "Beer Details",
              user: req.user,
              beer: response.data,
              favoritedBy: beer.favoritedBy,
              id: beer._id,
              reviews: beer.reviews
            }); 
          } else {
            res.render("beers/show", {
              title: "Beer Details",
              user: req.user,
              beer: response.data,
              favoritedBy: [""],
              reviews: [""]
            }); 
          }
        })
    });
}

function addToCollection(req, res) {
    Beer.findOne({id: req.body.id})
    .then((beer) => {
        if(beer) {
            beer.favoritedBy.push(req.user._id)
            beer.save()
            .then(() => {
                res.redirect(`/beers/${req.body.id}`)
            })
        } else {
            req.body.favoritedBy = req.user._id
            Beer.create(req.body)
            .then(() => {
                res.redirect(`/beers/${req.body.id}`)
            })
        }
    })
}

function removeFromCollection(req, res) {
    Beer.findOne({ id: req.params.id })
    .then((beer) => {
      let idx = beer.favoritedBy.indexOf(req.user._id)
      beer.favoritedBy.splice(idx, 1)
      beer.save()
      .then(() => {
        res.redirect(`/beers/${req.body.id}`)
      })
    })
}

function index(req, res) {
    Beer.find({favoritedBy: req.user._id})
    .then((beers) => {
        res.render('beers/index', {
            title: "Beer Collection",
            user: req.user,
            beers
        })
    })
}