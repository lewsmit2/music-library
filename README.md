## Project title

Music Library - SQL, Databases, Express.js, Routing.

### API flow of HTML request:

| API flow           | Purpose                                   |
| ------------------ | ----------------------------------------- |
| index.js           | process config env                        |
| src/app.js         | process routers                           |
| src/routes/\*      | process get/post/put/patch controllers    |
| src/controllers/\* | process controllers and response |

### Database setup for each test:

To ensure tests have a new database created each time we run a test.

```
// package.json
 ...
 "scripts": {
    "migrate": "node scripts/migrate.js",
    "prestart": "node scripts/create-database.js && npm run migrate",
    "start": "nodemon -r dotenv/config index.js",
    "pretest": "node scripts/create-database.js test && npm run migrate test",
    "test": "mocha tests/**/*.js --exit --recursive --timeout 60000 --file ./scripts/test-setup.js",
    "posttest": "node scripts/drop-database.js test"
  },
  ...
```

### A top-level directory layout

    .
    ├── migrations         # Setup databases before each test
    ├── scripts            # Scripts for migrations
    ├── src
    │      ├── routes      # Source of routers
    │      ├── controllers # Source of request handlers
    │      └── db          # define query of pg
    ├── tests              # test files for requests
    └── README.md

## Installation

```
$ git clone https://github.com/lewsmit2/music-library.git 
$ cd music-library
$ npm install
```

## API Reference

```
// package.json
...
  "devDependencies": {
    "chai": "^4.3.7",
    "dotenv": "^16.0.3",
    "mocha": "^10.2.0",
    "nodemon": "^2.0.20",
    "supertest": "^6.3.3"
  },
  ...
```

## Tests

```
open terminal and go to directory 'music-library', then
$ npm test
```

## How to use?

From this exercise, you may learn how to handle request for CRUD operation to relational database.

### Recommended Reading List

- [Node-postgres](https://node-postgres.com/)
- [Docker in 5 minutes](https://www.youtube.com/watch?v=_dfLOzuIg2o)
- [Docker installation](https://docs.docker.com/get-docker/)
- [pgAdmin4 installation](https://www.pgadmin.org/download/) 
- [Documentation - Dotenv](https://github.com/motdotla/dotenv/blob/master/README.md)
- [Documentation - Nodemon](https://www.npmjs.com/package/nodemon)
- [Preventing SQL Injection in Node.js](https://www.veracode.com/blog/secure-development/how-prevent-sql-injection-nodejs)