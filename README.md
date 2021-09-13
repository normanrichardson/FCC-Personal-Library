# [Personal Library](https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/personal-library)

This was put together for the Quality Assurance course on [FCC](https://www.freecodecamp.org/learn/quality-assurance). The aim was to create and test a web application that acts as a personal library of books and comments on books.

View at:

[![run on replit](https://replit.com/badge/github/@Mormonorman/FCC-Personal-Library)](https://replit.com/@Mormonorman/FCC-Personal-Library?v=1)

## Built With
 * NodeJS
 * Express
 * MongoDB
 * Mongoose ODM
 * Docker

## Local testing with docker
As the project reads and writes to a database, I have extended the project by adding docker/containers, so testing can be done locally.

1. Clone

> git clone https://github.com/normanrichardson/FCC-Personal-Library.git

> cd FCC-Exercise-Tracker

2. Execute docker-compose

> docker-compose up

Go to localhost:3000

3. Testing

> npn run test 