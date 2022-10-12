const router = require("express").Router();
const User = require("../models/User.model.js");

const bcrypt = require("bcryptjs")
const saltRounds = 10;

router.get('/signup', (req, res, next) => {
    res.render('users/signup')
})

router.post('/signup', (req, res, next) => {

    const { username, password } = req.body;

   //genero la "salt" a partir del numero de rondes definides a dalt de tot
   const salt = bcrypt.genSaltSync(saltRounds);
   //amb la salt generada al pas anterior, encripto password
   const passwordHash = bcrypt.hashSync(password, salt);

    User.create({
        username,
        password: passwordHash
    })
    .then(result => {
        res.redirect('/users/login');
    })
    .catch(err => {
        res.render('error', {messageError: 'Les credencials no son correctes'});
    })
})

router.get('/login', (req, res, next) => {
    res.render('users/login');
})

router.get('/profile', (req, res, next) => {
    res.render('')
})

module.exports = router;
