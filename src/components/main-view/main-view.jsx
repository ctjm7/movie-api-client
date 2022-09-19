import React from 'react';
import axios from 'axios';
import { Container, Row, Col, Nav } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Redirect } from 'react-router-dom';
import { render } from 'react-dom';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { ProfileView } from '../profile-view/profile-view';
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
		const { movies, user, selectedMovie } = this.state;

		/* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView */
		if (!user)
			return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

		if (movies.length === 0) return <div className="main-view" />;

		return (
			// <Container fluid>
			// 	<Row>
			// 		<NavBar />
			// 	</Row>
			// 	<Row className="main-view justify-content-md-center">
			// 		{selectedMovie ? (
			// 			<Col md={8}>
			// 				<MovieView
			// 					movie={selectedMovie}
			// 					onBackClick={(newSelectedMovie) => {
			// 						this.setSelectedMovie(newSelectedMovie);
			// 					}}
			// 				/>
			// 			</Col>
			// 		) : (
			// 			movies.map((movie) => (
			// 				<Col lg={3} md={4} sm={6}>
			// 					<MovieCard
			// 						key={movie._id}
			// 						movie={movie}
			// 						onMovieClick={(newSelectedMovie) => {
			// 							this.setSelectedMovie(newSelectedMovie);
			// 						}}
			// 					/>
			// 				</Col>
			// 			))
			// 		)}
			// 	</Row>

			<BrowserRouter>
				<NavBar user={user} />
				<Routes>
					<Route path="/register" element={<RegistrationView />}></Route>
				</Routes>
			</BrowserRouter>

			/* <Router>
				<Routes>
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
				</Routes>
			</Router> */
			// </Container>
		);
	}
}
export default MainView;
