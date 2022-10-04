import React, {useState, useEffect } from "react";
import axios from "axios";
import { connect } from 'react-redux';
import { Container, Row } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { setMovies, setUser  } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavBar } from "../nav-bar/nav-bar";
import "./main-view.scss";

function MainView(props) {
	const { movies, user } = props;

  useEffect(() => {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      props.setUser(localStorage.getItem("user"));
      getMovies(accessToken);
    }
  },[user]);

  const onLoggedIn = (authData) => {
    console.log(authData);
    props.setUser(authData.user.Username);
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    getMovies(authData.token);
  }

  const getMovies = (token) => {
    axios
      .get("https://seeyouatmovies.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        props.setMovies(response.data);
        })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
		<BrowserRouter>
			<Container fluid>
				<Row>
					<NavBar user={user} />
				</Row>
				<Row className="main-view justify-content-md-center">
					<Routes>
						<Route
							path="/"
							element={
								/* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView */
								!user ? (
									<LoginView onLoggedIn={(user) => onLoggedIn(user)} />
								) : (
										<MoviesList movies={movies}/>
								)
							}
						/>
						<Route path="/register" element={<RegistrationView />} />
						<Route
							exact
							path="movies/:id"
							element={
								movies.length === 0 ? (
								<div className="main-view" />
								) : (
									<MovieView movies={movies} />
								)
							}
						/>
						<Route
							path="/directors/:name"
							element={
								movies.length === 0 ? (
									<div className="main-view" />
								) : (
									<DirectorView movies={movies} />
								)
							}
						/>
						<Route
							path="/genre/:name"
							element={
								movies.length === 0 ? (
									<div className="main-view" />
								) : (
									<GenreView movies={movies} />
								)
							}
						/>
						<Route
							path={`/users/${user}`}
							element={
								!user ? (
									<LoginView onLoggedIn={(user) => onLoggedIn(user)} />
								) : (
									<ProfileView movies={movies} user={user} />
								)
							}
						/>
					</Routes>
				</Row>
			</Container>
		</BrowserRouter>
	);
}

let mapStateToProps = state => {
	return {
		movies: state.movies,
		user: state.user
	}
}

export default connect(mapStateToProps, { setMovies, setUser }) (MainView);
