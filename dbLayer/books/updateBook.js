// Update an existing book document and save it.
module.exports = (Book) => {
    return (id, book_update, done) => {
        Book.updateOne({_id: id}, book_update, (err, doc) => {
          if (err) return done(err, null);
          done(null, doc);
        });
    }; 
};
