const Bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

const tokenHandler = async (user) => {
    try {
      // generate token
      const accessToken = await signJwtToken(user, {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
        expiresIn: process.env.JWT_EXPIRY
      })
      return Promise.resolve(accessToken)
    } catch (error) {
      return Promise.reject(error)
    }
  }

function createUser(req, res) {
    let User = require('../models/user');
    let newUser = User ({
        name: req.body.name,
        surname : req.body.surname,
        password : Bcrypt.hashSync(req.body.password, 10),
        email : req.body.email,
        createdBy : req.body.createdBy
    });
  
    newUser.save()
    .then((savedUser) => {

        res.json(savedUser);
            
    }, (err) => {
        res.status(400).json(err)
    });

}

function readUsers(req, res) {

    let User = require("../models/user");

    User.find({})
    .then((users) => {
        res.status(200).json(users);
    }, (err) => {
        res.status(500).json(err);
    });
 }

function readUser(req, res) {

    let User = require("../models/user");

    User.findById({_id : req.params.id})
    .then((user) => {
        res.status(200).json(user);
    }, (err) => {
        res.status(500).json(err);
    });
 }

 function updateUser(req, res) {

    let User = require("../models/user");

    User.findByIdAndUpdate({_id: req.params.id}, 
        {
            name: req.body.name,
            surname : req.body.surname,
            password : req.body.password,
            email : req.body.email,
            url : req.body.url
        }, 
        {
            new : true
        }
    ).then((updateUser) => {
        res.status(200).json(updateUser);
    }, (err) => {
        res.status(500).json(err);
    });
}

function deleteUser(req, res) {

    let User = require("../models/user");

    User.findOneAndRemove(
        {
            _id : req.params.id
        }
    ).then((deleteUser) => {
        res.status(200).json(deleteUser);
    }, (err) => {
        res.status(500).json(err);
    });
 }

function login(req, res) {

    let User = require("../models/user");

    User.findOne({ email: req.body.email })
    .then((user) => {
        user.comparePassword(req.body.password, function(err, match) {
            if(match) {
                let token = jwt.sign({_id: user._id.toString() }, 'info834', {expiresIn: '7d'})
                res.send({ message: "The email and password combination is correct!", token, user });
            } else {
                res.status(400).send({ message: "The password is invalid" });
            }
        }
    }, (err) => {
        res.status(400).send({ message: "The email does not exist" });
    });
}

module.exports.create = createUser;
module.exports.reads = readUsers;
module.exports.read = readUser;
module.exports.delete = deleteUser;
module.exports.update = updateUser;
module.exports.login = login;