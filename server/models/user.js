
var mongoose = require('mongoose');
var Bcrypt = require("bcryptjs");

var Schema = mongoose.Schema;

var UserSchema = new Schema({

  name : {
    type : String,
    require : true
  },

  surname : {
    type : String,
    require : true
  },

  password : {
    type : String,
    require : true
  },

  email : {
    type : String,
    require : true,
    unique : true
  },

  createdAt : {
    type : Date,
    default : Date.now
  },

  createdBy : {
    type : String,
    default : null
  },

  updatedAt : {
    type : Date,
    default : null
  },

  updatedBy : {
    type : String,
    default : null
  },

  deletedAt : {
    type : Date,
    default : null
  },

  deletedBy : {
    type : String,
    default : null
  },

});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return(err);
      return(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
