const Book = require('./book');

// Delete an existing book document.
module.exports = (id, done) => {
    Book.deleteOne({_id: id}, (err, doc) => {
        if (err) return done(err, null);
        done(null, doc);
    });
};
