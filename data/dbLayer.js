require('dotenv').config();
let mongoose = require('mongoose');

// General connection to db.
mongoose.connect(process.env.DB, 
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

// Schema for a book.
const book = new mongoose.Schema({
  title: {type:String, required:true},
  commentcount: {type:Number, required:true, default: () => 0},
  comments:  {type: [String], required:true, default: ()=>[]}
});

// Create the book model.
const Book = mongoose.model('Book', book);

// Create a new book document and save it.
const createBook = (book, done) => {
  book.save((err, doc) => {
    if (err) return done(err, null);
    done(null, doc);
  });
};

// Update an existing book document and save it.
const updateBook = (id, book_update, done) => {
  Book.updateOne({_id: id}, book_update, (err, doc) => {
    if (err) return done(err, null);
    done(null, doc);
  })
};

// Delete an existing book document.
const deleteBook = (id, done) => {
  Book.deleteOne({_id: id}, (err, doc) => {
    if (err) return done(err, null);
    done(null, doc);
  })
};

// Delete all existing book documents.
const deleteAllBooks = (done) => {
  Book.deleteMany({}, (err, doc) => {
    if (err) return done(err, null);
    done(null, doc);
  })
};

// Find a sublist of books. Additional filters on other fields can be applied.
const findBooks = (filter, done) => {
  let query = Book.find(filter)
  // Execute the query.
  query.exec((err, data) => {
    if (err) {
      return done(err,null);
    }
    done(null,data);
  })
}

let inital_connection = false
const run_tests = (tests) => {
  mongoose.connection.on("connected", () => {
    if (!inital_connection) {
      tests()
    }
    inital_connection = true
  })
}

// Exports.
module.exports.Book = Book;
module.exports.createBook = createBook;
module.exports.updateBook = updateBook;
module.exports.deleteBook = deleteBook;
module.exports.deleteAllBooks = deleteAllBooks;
module.exports.findBooks = findBooks;
module.exports.run_tests = run_tests;