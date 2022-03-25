/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';
const { books } = require('./controllers')

module.exports = (app) => {
  app.use('/api/books', books);
};
