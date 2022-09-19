import React, { useState } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import UserInfo from "./user-info";
import FavoriteMovies from "./favorite-movies";
import UpdateUser from "./update-user";
import "./profile-view.scss";

export function ProfileView({ movies }) {
	const [user, setUser] = useState();

	const getUser = (token) => {
		axios
			.get("https://seeyouatmovies.herokuapp.com/users/:Username", {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				// Assign the result to the state
				this.setState({
					Username: response.data.Username,
					Password: response.data.Password,
					Email: response.data.Email,
					Birthday: response.data.Birthday,
				});
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
					Password: password
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
						Birthday: birthday
					},
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				)
				.then((response) => {
					const data = response.data;
					this.setState({
						Username: data.username,
						Password: data.password,
						Email: data.email,
						Birthday: data.birthday,
					});
					console.log(data);
					alert("Profile is updated");
				})
				.catch((e) => {
					console.log("no such user");
				});
		}
	};

	return (
		<Container>
			<Row>
				<Col xs={12} sm={4}>
					<Card>
						<Card.Body>
							<UserInfo name={user.Username} email={user.Emai} />
						</Card.Body>
					</Card>
				</Col>

				<Col xs={12} sm={8}>
					<Card>
						<Card.Body>
							<UpdateUser
								handleSubmit={handleSubmit}
								handleUpdate={handleUpdate}
							/>
						</Card.Body>
					</Card>
				</Col>

				<Col>
					<Card>
						<Card.Body>
							<FavoriteMovies favortieMoviesList={favoriteMoviesList} />
						</Card.Body>
					</Card>
				</Col>
			</Row>
			<Link to={`/users/${user}`}>{user}</Link>;
		</Container>
	);
}
