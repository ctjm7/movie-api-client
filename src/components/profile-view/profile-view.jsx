import React, { useState, useEffect } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import FavoriteMovies from "./favorite-movies";
import UpdateUser from "./update-user";
import "./profile-view.scss";

export function ProfileView({ movies }) {
	const [user, setUser] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [birthday, setBirthday] = useState("");
	const [favoriteMovies, setFavoriteMovies] = useState([]);

	useEffect(() => {
		let accessToken = localStorage.getItem("token");
		if (accessToken !== null) {
			setUser(localStorage.getItem("user"));
			getUser(accessToken);
		}
	}, [user]);

	const getUser = (token) => {
		const user = localStorage.getItem("user");
		axios
			.get(`https://seeyouatmovies.herokuapp.com/users/${user}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				const data = response.data;
				setUsername(data.Username);
				setPassword(data.Password);
				setEmail(data.Email);
				setBirthday(data.Birthday);
				setFavoriteMovies(data.FavoriteMovies);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const isReq = validate();
		if (isReq) {
			/* Send a request to the server for authentication */
			axios
				.post("https://seeyouatmovies.herokuapp.com/login", {
					Username: username,
					Password: password,
				})
				.then((response) => {
					const data = response.data;
					props.onLoggedIn(data);
				})
				.catch((e) => {
					console.log("no such user");
				});
		}
	};

	const handleUpdate = (e) => {
		e.preventDefault();
		const isReq = validate();
		let token = localStorage.getItem("token");
		if (isReq) {
			axios
				.put(
					"https://seeyouatmovies.herokuapp.com/users/:Username",
					{
						Username: username,
						Password: password,
						Email: email,
						Birthday: birthday,
					},
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				)
				.then((response) => {
					const data = response.data;
					setUsername(data.Username);
					setPassword(data.Password);
					setEmail(data.Email);
					setBirthday(data.Birthday);
					console.log(data);
					alert("Profile is updated");
				})
				.catch((e) => {
					console.log("no such user");
				});
		}
	};

	return (
		<>
			<Row>
				<Col xs={12} sm={4}>
					<Card>
						<Card.Body>
							<Card.Title>Profile</Card.Title>
							<p>Name: {username}</p>
							<p>Email: {email} </p>
						</Card.Body>
					</Card>
				</Col>

				<Col xs={12} sm={8}>
							<UpdateUser
								user={user}
								handleSubmit={handleSubmit}
								handleUpdate={handleUpdate}
							/>
				</Col>
			</Row>

			<Row>
				<h5>Favorite Movies</h5>

							{favoriteMovies.map((movieId) => {
								let movie = movies.find((m) => m._id === movieId);
								return (
									<Col xs={12} md={6} lg={4}>
										<FavoriteMovies key={movieId} movie={movie} />
									</Col>
								);
							}
							)}
			</Row>
		</>
	);
}
