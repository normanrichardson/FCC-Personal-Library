require('dotenv').config();
let mongoose = require('mongoose');

// General connection to db.
mongoose.connect(process.env.DB, 
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

// Schema for a book.
const book = new mongoose.Schema({
  title: {type:String, required:true},
  commentcount: {type:Number, required:true, default: () => 0},
  comments:  {type: [String], required:true, default: ()=>[]}
});

// Create the book model.
const Book = mongoose.model('Book', book);

const createBook = require('./createBook');
const updateBook = require('./updateBook')(Book);
const deleteBook = require('./deleteBook')(Book);
const deleteAllBooks = require('./deleteAllBooks')(Book);
const findBooks = require('./findBooks')(Book);
const runTests = require('./runTests')(mongoose);


// Exports.
module.exports = {
  Book,
  createBook,
  updateBook,
  deleteBook,
  deleteAllBooks,
  findBooks,
  runTests
};
