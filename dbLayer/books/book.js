const mongoose = require('mongoose');

const book = new mongoose.Schema({
  title: {type:String, required:true},
  commentcount: {type:Number, required:true, default: () => 0},
  comments:  {type: [String], required:true, default: ()=>[]}
});

module.exports = mongoose.model('Book', book);
