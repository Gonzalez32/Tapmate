const Beer = require('../models/beer')

module.exports = {
    create
}

function create(req, res) {
    Beer.findById(req.params.id)
    .then((beer) => {
        beer.reviews.push(req.body)
        beer.save()
        .then(() => {
            res.redirect(`/beers/${beer.id}`)
        })
        .catch((err) => {
            console.log(err);
        })
    })
}