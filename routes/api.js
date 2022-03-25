/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

// Import the data layer.

const { books } = require('../controllers')

module.exports = (app) => {
  app.use('/api/books', books);
};
