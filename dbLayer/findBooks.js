// Find a sublist of books. Additional filters on other fields can be applied.
module.exports = (Book) => {
    return (filter, done) => {
        let query = Book.find(filter);
        // Execute the query.
        query.exec((err, data) => {
            if (err) {
                return done(err,null);
            }
            done(null,data);
        });
    };
};
