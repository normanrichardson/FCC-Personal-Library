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

const runTests = require('./runTests')(mongoose);

module.exports = {
    runTests
};
