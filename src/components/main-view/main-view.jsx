import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect, Routes } from 'react-router-dom';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { ProfileView } from '../profile-view/profile-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { UpdateUser } from '../profile-view/update-user';
import { Container, Row, Col } from 'react-bootstrap';
import { NavBar } from '../nav-bar/nav-bar';
import './main-view.scss';

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

		return (
			<Router>
				<NavBar user={user} />
				<Row className="main-view justify-content-md-center">
					<Routes>
						<Route
							path="/login"
							element={
								<LoginView
									movies={movies}
									onLoggedIn={(user) => this.onLoggedIn(user)}
								/>
							}
						></Route>
						<Route
							exact
							path="/"
							render={() => {
								/* If no user, the LoginView is rendered. If user is loggoed in, the user details are passed as a prop to the LoginView */
								if (!user)
									return (
										<Col>
											<LoginView
												movies={movies}
												onLoggedIn={(user) => this.onLoggedIn(user)}
											/>
										</Col>
									);
								/* Before the movies have loaded */
								if (movies.length === 0) return <div className="main-view" />;
								return movies.map((movie) => (
									<Col md={3} key={movie._id}>
										<MovieCard movie={movie} />
									</Col>
								));
							}}
						/>
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
						/* route for link on main-view to profile-view */
						<Route
							path={`/users/${user}`}
							render={({ history }) => {
								if (!user) return <Redirect to="/" />;
								return (
									<Col>
										<ProfileView
											movies={movies}
											user={user}
											onBackClick={() => history.goBack()}
										/>
									</Col>
								);
							}}
						/>
						<Route
							path="/movies/${movie._id}"
							render={({ match, history }) => {
								return (
									<Col md={8}>
										<MovieView
											movie={movies.find(
												(movie) => movie._id === match.params.movieId
											)}
											onBackClick={() => history.goBack()}
										/>
									</Col>
								);
							}}
						/>
						<Route
							path="/directors/:Name"
							render={({ match, history }) => {
								return (
									<Col md={8}>
										<DirectorView
											director={
												movies.find(
													(movie) => movie.Director.Name === match.params.name
												).Director
											}
											onBackClick={() => history.goBack()}
										/>
									</Col>
								);
							}}
						/>
						<Route
							path="/genre/:Name"
							render={({ match, history }) => {
								return (
									<Col md={8}>
										<GenreView
											genre={
												movies.find(
													(movie) => movie.Genre.Name === match.params.name
												).Genre
											}
											onBackClick={() => history.goBack()}
										/>
									</Col>
								);
							}}
						/>
						{/* <Route
							path={`/update-user/${user}`}
							render={({ history }) => {
								if (!user) return <Redirect to="/" />;
								return (
									<Col>
										<UpdateUser
											user={user}
											onBackClick={() => history.goBack()}
										/>
									</Col>
								);
							}}
						/> */}
					</Routes>
				</Row>
			</Router>
		);
	}
}

export default MainView;
