const mongoose = require('mongoose');

const book = new mongoose.Schema({
  title: {type:String, required:true},
  commentcount: {type:Number, required:true, default: () => 0},
  comments:  {type: [String], required:true, default: ()=>[]}
});

const Book = mongoose.model('Book', book);
const createBook = require('./createBook');
const updateBook = require('./updateBook')(Book);
const deleteBook = require('./deleteBook')(Book);
const deleteAllBooks = require('./deleteAllBooks')(Book);
const findBooks = require('./findBooks')(Book);

module.exports = {
  Book,
  createBook,
  updateBook,
  deleteBook,
  deleteAllBooks,
  findBooks
};
