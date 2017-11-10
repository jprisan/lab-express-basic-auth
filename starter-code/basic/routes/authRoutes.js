// User model
const User = require("../model/user");
const router = require("express").Router()

// BCrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.post("/auth", (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;
  var salt = bcrypt.genSaltSync(bcryptSalt);
  var hashPass = bcrypt.hashSync(password, salt);

  var newUser = User({
    username,
    password: hashPass
  });

if (username === "" || password === "") {
  res.render("auth/signup", {
    errorMessage: "Indicate a username and a password to sign up"
  });
  return;
}  

  newUser.save(err => {
    res.redirect("/");
  });
});



module.exports = router;