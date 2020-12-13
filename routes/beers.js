const router = require('express').Router()
const beersCtrl = require('../controllers/beers')

router.get('/new', isLoggedIn, beersCtrl.new)
router.get('/', isLoggedIn, beersCtrl.index)
// router.post('/search', isLoggedIn, beersCtrl.search)
router.get('/:slug', isLoggedIn, beersCtrl.show)
// router.post('/:slug/watch', isLoggedIn, beersCtrl.addToWatchList)
// router.delete('/:slug/watch', isLoggedIn, beersCtrl.removeFromWatchList)
// router.post('/:slug/collection', isLoggedIn, beersCtrl.addToCollection)
// router.delete('/:slug/collection', isLoggedIn, beersCtrl.removeFromCollection)


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router