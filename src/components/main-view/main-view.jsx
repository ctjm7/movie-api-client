import React, {useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavBar } from "../nav-bar/nav-bar";
import "./main-view.scss";


export function MainView() {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      setUser(localStorage.getItem("user"));
      getMovies(accessToken);
    }
  },[user, movies]);

  const onLoggedIn = (authData) => {
    console.log(authData);
      setUser(authData.user.Username);
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  const getMovies = (token) => {
    axios
      .get("https://seeyouatmovies.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setMovies(response.data);
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
									movies.map((m) => (
										<Col md={3} key={m._id}>
											<MovieCard movie={m} />
										</Col>
									))
								)
							}
						/>
						<Route path="/register" element={(<RegistrationView />)} />
						<Route
							exact
							path="movies/:id"
							element={<MovieView movies={movies} />}
						/>
						<Route
							path="/directors/:name"
							element={(movies.length === 0) ?
								(<div className="main-view" />)
								:(< DirectorView movies={movies} />)}
						/>
						<Route
							path="/genre/:name"
							element={(movies.length === 0) ?
								(<div className="main-view" />)
								:(< GenreView movies={movies} />)}
						/>
						<Route path={`/users/${user}`} element={
							!user ? (<LoginView onLoggedIn={(user) => onLoggedIn(user)} />
							) : (
							<ProfileView movies={movies} user={user} />)} />
					</Routes>
				</Row>
			</Container>
		</BrowserRouter>
	);
}

export default MainView;
