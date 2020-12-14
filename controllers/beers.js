const Beer = require('../models/beer')
const axios = require('axios')

module.exports = {
//   new: newBeer,
//   search,
//   show,
//   addToWatchList,
//   removeFromWatchList,
//   addToCollection,
//   removeFromCollection,
  index
}

// function newBeer(req, res) {
//   res.render("beers/new", {
//     title: "Beer Search",
//     user: req.user,
//     results: null
//   })
// }

// function search(req, res) {
//   axios
//     .get(`https://api.rawg.io/api/beers?page_size=5&search=${req.body.query}`)
//     .then((response) => {
//       console.log(response.data.results)
//       res.render("beers/new", {
//         title: "Beer Search",
//         user: req.user,
//         results: response.data.results
//       })
//     })
// }

// function show(req, res) {
//     axios.get("https://api.punkapi.com/v2/beers/")
//     .then((resp) => {
//         res.render("beers/show", {beerData: resp.data})
//     })
// }



// function show(req, res) {
//   axios
//     .get(`https://api.punkapi.com/v2/beers/`)
//     .then((response) => {
//       Beer.findOne({ id: response.data.id })
//       .populate('favoritedBy')
//       .then((beer) => {
//         if(beer) {
//           res.render("beers/show", {
//             title: "Beer List",
//             user: req.user,
//             beer: response.data,
//             favoritedBy: beer.favoritedBy,
//             id: beer._id,
//             reviews: beer.reviews
//           }); 
//         } else {
//           res.render("beers/show", {
//             title: "Beer Details",
//             user: req.user,
//             beer: response.data,
//             favoritedBy: [""],
//             reviews: [""]
//           }); 
//         }
//       })
//     });
// }

// function addToWatchList(req, res) {
//   req.user.watchList.push(req.body)
//   req.user.save()
//   .then(() => {
//     res.redirect(`/beers/${req.body.slug}`)
//   })
// }

// function removeFromWatchList(req, res) {
//   let idx = req.user.watchList.findIndex((g) => g.slug === req.params.slug)
//   req.user.watchList.splice(idx, 1)
//   req.user.save()
//   .then(() => {
//     res.redirect(`/beers/${req.body.slug}`)
//   })
// }

// function addToCollection(req, res) {
//   Beer.findOne({ slug: req.body.slug })
//   .then((beer) => {
//     if (beer) {
//       beer.favoritedBy.push(req.user._id)
//       beer.save()
//       .then(() => {
//         res.redirect(`/beers/${req.body.slug}`)
//       })
//     } else {
//       req.body.favoritedBy = req.user._id
//       Beer.create(req.body)
//       .then(() => {
//         res.redirect(`/beers/${req.body.slug}`)
//       })
//     }
//   })
// }

// function removeFromCollection(req, res) {
//   Beer.findOne({ slug: req.params.slug })
//   .then((beer) => {
//     let idx = beer.favoritedBy.indexOf(req.user._id)
//     beer.favoritedBy.splice(idx, 1)
//     beer.save()
//     .then(() => {
//       res.redirect(`/beers/${req.body.slug}`)
//     })
//   })
// }

// function index(req, res) {
//   Beer.find({ favoritedBy: req.user._id })
//   .then((beers) => {
//     res.render('beers/index', {
//       title: "Beer Collection",
//       user: req.user,
//       beers
//     })
//   })
// }

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