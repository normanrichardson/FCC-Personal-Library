const Book = require('./book');

// Update an existing book document and save it.
module.exports = (id, comment, done) => {
    // Update the book with the comment and increment the comment count.
    const book_update = {$push: { comments: comment }, $inc: {commentcount: 1}}
    Book.updateOne({_id: id}, book_update, (err, doc) => {
      if (err) return done(err, null);
      done(null, doc);
    });
}; 
