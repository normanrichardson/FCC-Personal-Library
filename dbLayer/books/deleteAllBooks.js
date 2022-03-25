// Delete all existing book documents.
module.exports = (Book) => {
    return (done) => {
        Book.deleteMany({}, (err, doc) => {
            if (err) return done(err, null);
            done(null, doc);
        });
    };
};
