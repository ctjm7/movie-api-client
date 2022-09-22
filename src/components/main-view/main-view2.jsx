import React from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Redirect } from "react-router-dom";
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavBar } from "../nav-bar/nav-bar";
import "./main-view.scss";

export class MainView extends React.Component {
	constructor() {
		super();
		this.state = {
			movies: [],
			user: null
		};
	}

	componentDidMount() {
		let accessToken = localStorage.getItem("token");
		if (accessToken !== null) {
			this.setState({
				user: localStorage.getItem("user"),
			});
			this.getMovies(accessToken);
		}
	}

	onLoggedIn(authData) {
		console.log(authData);
		this.setState({
			user: authData.user.Username,
		});
		localStorage.setItem("token", authData.token);
		localStorage.setItem("user", authData.user.Username);
		this.getMovies(authData.token);
	}

	getMovies(token) {
		axios
			.get("https://seeyouatmovies.herokuapp.com/movies", {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				this.setState({
					movies: response.data,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}


	render() {
		const { movies, user } = this.state;

		/* I am using the match-id functional component to pass the useParams() to find a selected movie. This then goes to MovieView component in route below */
		// const { id } = this.props;

		const selectMovie = () => {
			const selectedMovie =
				movies.find((m) => m._id === { id });
			return selectedMovie;
		};


		// if (movies.length === 0) return <div className="main-view" />;

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
										<LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
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

			// <Route exact path="/directors/:name" element={<DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />}/>

			/*
					<Route
						path="/register"
						element={<RegistrationView />}
						render={() => {
							if (user) return <Redirect to="/" />;
							return (
								<Col md={8}>
									<RegistrationView />
								</Col>
							);
						}}
					/>
				*/
		);
	}
}

export default MainView;
