const router = require("express").Router()
const userController = require("../../controllers/userController")
const passport = require('../../passport')

// Matches with "/api/user"
router.route("/")
  .get(userController.findAll)
  .post(userController.create);

router.post('/login',
  function (req, res, next) {
      console.log('routes/user.js, login, req.body: ');
      console.log(req.body)
      next()
  },
  passport.authenticate('local'),
  (req, res) => {
      console.log('logged in', req.user);
      var userInfo = {
          username: req.user._id
      };
      res.send(userInfo);
  }
)
// Matches with "/api/user/logout"
router.post('/logout', (req, res) => {
  console.log('logout attempt')
  if (req.user) {
      req.logout()
      res.send({ msg: 'logging out' })
  } else {
      res.send({ msg: 'no user to log out' })
  }
})
// Matches with "/api/user/validate"
router.get('/validate', (req, res, next) => {
  console.log('===== user!!======')
  console.log(req.user)
  if (req.user) {
      res.json({ user: req.user })
  } else {
      res.json({ user: null })
  }
})

// Matches with "/api/user/:id"
router
  .route("/:id")
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);

// Matches with '/api/user/search/names'
router
  .route('/search/names/:query')
  .get(userController.findByNames)

module.exports = router;