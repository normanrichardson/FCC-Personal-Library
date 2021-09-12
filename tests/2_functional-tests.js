/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  suite('Routing tests', function() {
    // Test the POST endpoints
    suite('POST /api/books with title => create book object/expect book object', function() {
      // 1 Test adding a book to the library.
      test('Test POST /api/books with title', function(done) {
        chai
          .request(server)
          .post('/api/books')
          .send({
            title: "(test)Book 1"
          })
          .end((err, res)=> {
            assert.equal(res.status, 200);
            assert.equal(res.body.title, "(test)Book 1")
            assert.isString(res.body["_id"])
            assert.isAbove(res.body["_id"].length,1);
            done();
          })
      });
      // 2 Test adding a book to the library with no title (=>error).
      test('Test POST /api/books with no title given', function(done) {
        chai
          .request(server)
          .post('/api/books')
          .end((err, res)=> {
            assert.equal(res.status, 200);
            assert.equal(res.body, "missing required field title")
            done();
          })
      });
      
    });
    // Test the GET endpoints.
    suite('GET /api/books => array of books', function(){
      // 3 Test retrieving all books from the library.
      test('Test GET /api/books',  function(done){
        chai
        .request(server)
        .get('/api/books')
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.isObject(res.body[0])
          assert.property(res.body[0], "comments")
          assert.isArray(res.body[0].comments)
          assert.property(res.body[0], 'commentcount');
          assert.property(res.body[0], 'title');
          assert.property(res.body[0], '_id');
          done();
        });
      });      
      
    });
    // Test the GET endpoints with suite setup.
    suite('GET /api/books/[id] => book object with [id]', function(){
      // Used to store the id of the book created in the suite setup.
      let ret_id = "";
      // Used to test an ivalid id.
      let err_id = "9f2aad4689764230a20c1e4f";
      // Setup the test by creating a book.
      suiteSetup((done) => {
        chai
          .request(server)
          .post('/api/books')
          .send({
            title: "(test)Book 2"
          })
          .end((err, res) => {
            ret_id = res.body["_id"];
            done();
          })
      })
      // 4 Test retrieving an invalid book in the library.
      test('Test GET /api/books/[id] with id not in db',  function(done){
        chai
          .request(server)
          .get("/api/books/"+err_id)
          .end((err,res) => {
            assert.equal(res.status, 200);
            assert.isString(res.body);
            assert.equal(res.body, "no book exists");
            done();
          })
      });
      // 5 Test retrieving a valid book in the library.
      test('Test GET /api/books/[id] with valid id in db',  function(done){
        chai
          .request(server)
          .get("/api/books/"+ret_id)
          .end((err,res) => {
            assert.equal(res.status, 200);
            assert.isObject(res.body)
            assert.property(res.body, "comments")
            assert.isArray(res.body.comments)
            assert.property(res.body, 'commentcount');
            assert.property(res.body, 'title');
            assert.property(res.body, '_id');
            done();
          })
      });
    });
    // Test the POST endpoints with suite setup.
    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      // Used to store the id of the book created in the suite setup.
      let ret_id = "";
      // Used to test an ivalid id.
      let err_id = "9f2aad4689764230a20c1e4f";
      // Setup the test by creating a book.
      suiteSetup((done) => {
        chai
          .request(server)
          .post('/api/books')
          .send({
            title: "(test)Book 3"
          })
          .end((err, res) => {
            ret_id = res.body["_id"];
            done();
          })
      })
      // 6 Test adding an valid comment to a valid book in the library.
      test('Test POST /api/books/[id] with comment', function(done){
        chai
          .request(server)
          .post('/api/books/'+ret_id)
          .send({
            comment: "(test)This is a comment"
          })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isObject(res.body)
            assert.property(res.body, "comments")
            assert.isArray(res.body.comments)
            assert.equal(res.body.comments[0], "(test)This is a comment")
            assert.property(res.body, 'commentcount');
            assert.property(res.body, 'title');
            assert.property(res.body, '_id');
            done();
          })
      });
      // 7 Test adding an invalid comment to a valid book in the library.
      test('Test POST /api/books/[id] without comment field', function(done){
        chai
          .request(server)
          .post('/api/books/'+ret_id)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body, "missing required field comment")
            done();
          })
      });
      // 8 Test adding an valid comment to an invalid book in the library.
      test('Test POST /api/books/[id] with comment, id not in db', function(done){
        chai
          .request(server)
          .post('/api/books/'+err_id)
          .send({
            comment: "(test)This is a comment"
          })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body, "no book exists")
            done();
          })
      });
      
    });
    // Test the DELETE endpoints with suite setup.
    suite('DELETE /api/books/[id] => delete book object id', function() {
      // Used to store the id of the book created in the suite setup.
      let ret_id = "";
      // Used to test an ivalid id.
      let err_id = "9f2aad4689764230a20c1e4f";
      // Setup the test by creating a book.
      suiteSetup((done) => {
        chai
          .request(server)
          .post('/api/books')
          .send({
            title: "(test)Book 4"
          })
          .end((err, res) => {
            ret_id = res.body["_id"];
            done();
          })
      })
      // 9 Test deleting a valid book in the library.
      test('Test DELETE /api/books/[id] with valid id in db', function(done){
        chai
          .request(server)
          .delete('/api/books/'+ret_id)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body, "delete successful")
            done();
          })
      });
      // 10 Test deleting an invalid book in the library.
      test('Test DELETE /api/books/[id] with  id not in db', function(done){
        chai
          .request(server)
          .delete('/api/books/'+err_id)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body, "no book exists")
            done();
          })
      });
    });
  });
});

