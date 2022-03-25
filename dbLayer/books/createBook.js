// Create a new book document and save it.
module.exports = (book, done) => {
    book.save((err, doc) => {
        if (err) return done(err, null);
        done(null, doc);
    });
};
