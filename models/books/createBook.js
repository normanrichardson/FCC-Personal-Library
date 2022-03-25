const Book = require('./book');

// Create a new book document and save it.
module.exports = (title, done) => {
    book = new Book({title})
    book.save((err, doc) => {
        if (err) return done(err, null);
        done(null, doc);
    });
};
