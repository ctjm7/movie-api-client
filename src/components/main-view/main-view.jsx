import React, {useState, useEffect, setState} from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Redirect, useParams } from "react-router-dom";
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavBar } from "../nav-bar/nav-bar";
import "./main-view.scss";
import { useEffect } from "react";

export function MainView() {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      // setState({
      setUser: localStorage.getItem("user");
      // });
      getMovies(accessToken);
    }
  },[]);

  const onLoggedIn = (authData) => {
    console.log(authData);
    // setState({
      setUser: authData.user.Username;
    // });
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
        // setState({
        setMovies: response.data;
        // });
        })
      .catch((error) => {
        console.log(error);
      });
  }

  const selectMovie = () => {
    const selectedMovie = movies.find(m => m._id === useParams());
    return selectedMovie;
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
									// <LoginView onLoggedIn={(user) => onLoggedIn(user)} />
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

						<Route path="/register" element={<RegistrationView />} />

						<Route
							exact
							path="/movies/:id"
							element={
								<MovieView movie={selectMovie} />

								// <MovieView movie={movies.find(m => m._id === match.params.id)} />
							}
						/>
					</Routes>
				</Row>
			</Container>
		</BrowserRouter>
	);

}

export default MainView;
