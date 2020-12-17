const router = require('express').Router()
const beersCtrl = require('../controllers/beers')

router.get('/new', isLoggedIn, beersCtrl.new)
router.get('/beers', isLoggedIn, beersCtrl.create)
router.get('/', isLoggedIn, beersCtrl.index)



function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router