import axios from "axios";
import React from "react";
import { Button, Row, Col, Figure, Card, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MovieView } from "../movie-view/movie-view";
import "./profile-view.scss";

function FavoriteMovies({ movie }) {

	const removeFav = (id) => {
		let token = localStorage.getItem('token');
		let url = `https://seeyouatmovies.herokuapp.com/users/${localStorage.getItem("user")}/movies/${movie._id}`;
		axios.delete(url, {
			headers: { Authorization: `Bearer ${token}` }
		})
			.then((response) => {
				alert("Movie was deleted from favorites list");
				window.open("/users/:username", "_self");
			})
			.catch((error) => {
        console.log(error);
      })
	};

	return (
		<Row>
			{movie !== null ? (
				<Col key={movie._id}>
					<Figure className="figure">
						<Link to={`/movies/${movie._id}`}>

							<Figure.Image
								className="img"
								src={movie.ImagePath}
								alt={movie.Title}
							/>
							<Figure.Caption className="fig-caption">
								{movie.Title}
							</Figure.Caption>
						</Link>
					</Figure>
					<Button
						className="button"
						variant="outline-secondary"
						onClick={() => removeFav(movie._id)}
					>
						Remove
					</Button>
				</Col>
			) : (
				<h3>You have no favorite movies saved </h3>
			)}
		</Row>
	);

}

export default FavoriteMovies;
