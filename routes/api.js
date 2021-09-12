/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

// Import the data layer.
const Book = require('../data/dbLayer.js').Book;
const createBook = require('../data/dbLayer.js').createBook;
const updateBook = require('../data/dbLayer.js').updateBook;
const deleteBook = require('../data/dbLayer.js').deleteBook;
const deleteAllBooks = require('../data/dbLayer.js').deleteAllBooks;
const findBooks = require('../data/dbLayer.js').findBooks;


module.exports = function (app) {
  
  app.route('/api/books')
    // Get all the books in the library.
    .get(function (req, res){
      // Set the filter to empty to return all the books.
      let filter = {}
      findBooks(filter, (err, data) => {
        if (err) return console.error(err)
        res.json(data)
      })
    })
    
    // Create a book in the library.
    .post(function (req, res){
      // The title of the book.
      let title = req.body.title;
      // If the title is undefined return an error.
      if (title == undefined) return res.json("missing required field title")
      // Create a new book via the model.
      const book = new Book({title})
      createBook(book, (err, data) => {
        if (err) return console.error(err)
        res.json(data)
      })
    })
    
    // Delete all the books in the library.
    .delete(function(req, res){
      deleteAllBooks((err,data) => {
        if (err) return console.error(err)
        res.json("complete delete successful")
      })      
    });

  // Get a book in the library.
  app.route('/api/books/:id')
    .get(function (req, res){
      // Create a filter with the book id.
      let filter = {_id:req.params.id}
      findBooks(filter, (err, data) => {
        if (err) return console.error(err)
        // If the returned list is empty return an error.
        if (data.length<1) return res.json("no book exists")
        res.json(data[0])
      })
    })
    
    // Add a comment to a book.
    .post(function(req, res){
      // The id of the book to add a comment to.
      let id = req.params.id;
      // The comment to add.
      let comment = req.body.comment;
      // If the comment is undefined return an error.
      if (comment==undefined) return res.json("missing required field comment")
      // Update the book with the comment and increment the comment count.
      updateBook(id, {$push: { comments: comment }, $inc: {commentcount: 1}}, (err, data) => {
        if (err) return console.error(err)
        // If the number of modified documents is 0 return an error.
        if (data.nModified==0) {
          return res.json("no book exists")
        }
        // Find the book and return its information.
        findBooks({_id:id}, (err, data) => {
          if (err) return console.error(err)
          return res.json(data[0])
        })
      })
    })
    
    // Delete a book in the library
    .delete(function(req, res){
      deleteBook(req.params.id, (err,data) => {
        // If there was an error (caused by invalid id format) or the number of records updated is 0 (no document with that id exists) return an error.
        if (err || data.deletedCount==0) {
          return res.json("no book exists")
        }
        return res.json("delete successful")
      })
    });
  
};
