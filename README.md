## Project title

Music Library

### Project Description

This project aims to create a RESTful API that allows users to perform CRUD (Create, Read, Update, Delete) operations on an artists table and an albums table in a PostgreSQL database.  The database is contained in a Docker container using the official postgres image.  The project includes migration tables in the root of the project on Node; scripts for creating and dropping the database (dropping only during testing), and a migrate folder to choose whether to run the .env or .env.test file.  The project also includes controllers, routes, app.js, and utilises integration testing via Supertest, Mocha, and Chai.

With this API, users can add, retrieve, update, and delete artists and albums from the database using HTTP methods, such as GET, POST, PATCH, and DELETE.

The API is built using Node.js, Express.js, pg, and postgres-migrations.  The project is fully tested using the Mocha testing framework and the Chai assertion library, which ensures that the API works as expected and prevents regression bugs.

Overall, this project provides a robust an efficient solution for managing artists and albums in a PostgreSQL database through a RESTful API, with proper testing and documentation for each of use and maintenance.

## Installation of music library

```
$ git clone https://github.com/lewsmit2/music-library.git 
$ cd music-library
$ npm init -y
```

  ### Install Dependencies 

```
npm i -S express pg postgres-migrations
```

### Project Dependencies

```
// package.json
...
  "dependencies": {
    "express": "^4.18.2",
    "pg": "^8.9.0",
    "postgres-migrations": "^5.3.0"
  }
  ...
```

  ### Install devDependencies 

```
npx eslint --init
npx prettier --write .
npm i -D mocha chai supertest
npm i -D dotenv
npm i -D nodemon
```

### Project devDependencies
```
// package.json
...
  "devDependencies": {
    "chai": "^4.3.7",
    "dotenv": "^16.0.3",
    "eslint": "^8.34.0",
    "mocha": "^10.2.0",
    "nodemon": "^2.0.20",
    "supertest": "^6.3.3"
...
```

### Install Docker
https://docs.docker.com/get-docker/

### Create and Run postgres image

```
docker run --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=password -d postgres
```

### Install pgAdmin4
https://www.pgadmin.org/download/

### Add New Server in pgAdmin

- Click 'Add new server',
- Hostname/address: localhost
- User: postgres
- Password: // password of your choice

### Tests


/*Following installation, ensure you cd to the music-library route, then type: */
```
npm test
```

### How to use?

```
npm start
```

Following this, you can access via Postman Desktop at http://localhost:4000/{appropriateRoute}.

For example, the routes for artist are contained in /src/routes/artist and can be accessed and or manipulated through the following URLs:

```
http://localhost:4000/artists/
http://localhost:4000/artists/:id

```
- Where the URL parameter is ':id', replace this with the necessary integer.
- You will need to specify the HTTP verb in Postman, such as 'POST' or 'GET' for the end point without the parameter.  
- This will allow the controller functions 'createArtist' and 'readArtist' to be executed.
- With the 'createArtist' function, you will need to use JSON in Postman.  Click 'Body', 'raw', and change 'text' to 'JSON', and then input as follows: 
```
{
  "name": "a name of your choice",
  "genre": "a genre of your choice"
}
``` 

- The 'GET', 'PATCH', and 'DELETE' for the end point with the parameter relate to the controller functions 'singleArtistById', 'patchArtistById', and 'deleteArtistById'.
- You will need to specify the appropriate HTTP verb in Postman relative to the controller function used, i.e. 'GET' for 'singleArtistById'.
- 'GET' and 'DELETE' will only require the id parameter in the URL of the record you want to retrieve or delete.
- 'PATCH' will require the ':id' as well as the information you want to change.  For example, if you wanted to change only the 'name' field, you would send JSON in the request body as follows:
```
{
  "name": "Jimmy Hendrix"
}
```
The above will replace only the 'name' field of the 'id' specified in the URL parameter ':id'.