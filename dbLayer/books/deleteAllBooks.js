const Book = require('./book');

// Delete all existing book documents.
module.exports = (done) => {
    Book.deleteMany({}, (err, doc) => {
        if (err) return done(err, null);
        done(null, doc);
    });
};
