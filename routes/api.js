/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

// Import the data layer.

const books = require('./books')

module.exports = (app) => {
  app.use('/api/books', books);
};
