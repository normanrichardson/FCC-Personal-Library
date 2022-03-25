const createBook = require('./createBook');
const updateBookComment = require('./updateBookComment');
const deleteBook = require('./deleteBook');
const deleteAllBooks = require('./deleteAllBooks');
const findBooksById = require('./findBooksById');

module.exports = {
  createBook,
  updateBookComment,
  deleteBook,
  deleteAllBooks,
  findBooksById
};
