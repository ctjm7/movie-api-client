# See You at the Movies!

This is an application using React to access a REST API and database. It uses React to build the client-side for the application. The application utilizes the tech stack MERN (MongoDB, Express, React, and Node.js).

## Description
This is a client-side application using React. It is based on an existing server-side code that was created using a REST API and database.

## Purpose of the App
This app is was developed to be introduced to React while recreating a client side application that was previously done using React. This is to allow learning Angular in an environment that I am already familiar. This application allows users to view a list of movies. The information provided is a movie description, genre details, and director information. The user can create a profile, update their information and add movies to a favorites list.

## Key Features
### Main view
* Returns a list of ALL movies to the user (each listed item with an image, title, and description)
* Sorting and filtering
* Ability to select a movie for more details
### Single movie view
* Returns data (description, genre, director, image) about a single movie to the user
* Allows users to add a movie to their list of favorites
### Login view
* Allows users to log in with a username and password
* Registration view
* Allows new users to register (username, password, email, birthday)
### Genre view
* Returns data about a genre, with a name and description
* Displays example movies
### Director view
* Returns data about a director (name, bio, birth year, death year)
* Displays example movies
### Profile view
* Allows users to update their user info (username, password, email, date of birth)
* Allows existing users to deregister
* Displays favorite movies
* Allows users to remove a movie from their list of favorites

## User Stories
* As a user, I want to be able to receive information on movies, directors, and genres so that I can learn more about movies I’ve watched or am interested in.
* As a user, I want to be able to create a profile so I can save data about my favorite movies.

## Tech Used
React, JavaScript, React Redux, Bootstrap

## Dependencies
``` "@reduxjs/toolkit": "^1.8.5",
    "axios": "^0.27.2",
    "prop-types": "^15.8.1",
    "react": "^18.2.0",
    "react-bootstrap": "^2.5.0",
    "react-dom": "^18.2.0",
    "react-redux": "^8.0.4",
    "react-router-dom": "^6.4.0",
    "redux": "^4.2.0",
    "redux-devtools-extension": "^2.13.9"

    "devDependencies":
    "@parcel/transformer-sass": "^2.7.0",
    "buffer": "^6.0.3",
    "parcel": "^2.7.0",
    "process": "^0.11.10"
