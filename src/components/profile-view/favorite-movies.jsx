import axios from "axios";
import React from "react";
import { Button, Row, Col, Figure, Card, Container, Row, CardGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MovieView } from "../movie-view/movie-view";
import "./profile-view.scss";

function FavoriteMovies({ movie }) {

	const removeFav = (id) => {
		let token = localStorage.getItem('token');
		let user = localStorage.getItem('user');
		let url = `https://seeyouatmovies.herokuapp.com/users/${user}/movies/${movie._id}`;
		axios.delete(url, {
			headers: { Authorization: `Bearer ${token}` }
		})
			.then((response) => {
				alert("Movie was deleted from Favorite Movies List");
				window.open(`/users/${user}`, "_self");
			})
			.catch((error) => {
        console.log(error);
      })
	};

	return (
		<>
			{movie !== null ? (
				<CardGroup className="d-flex align-content-stretch" key={movie._id}>
					<Card className="my-1">

							<Link to={`../movies/${movie._id}`}>
								<Card.Img src={movie.ImagePath} alt={movie.Title} />
								<Card.Title className="text-center mt-2">
									{movie.Title}
								</Card.Title>
							</Link>

						<Button
							className="position-relative"
							variant="outline-secondary"
							onClick={() => removeFav(movie._id)}
						>
							Remove Movie from Favorites
						</Button>
					</Card>
				</CardGroup>
			) : (
				<h3>You have no favorite movies saved </h3>
			)}
		</>
	);

}

export default FavoriteMovies;


// <Figure className="my-1">
// 	<Link to={`../movies/${movie._id}`}>
// 		<Figure.Image src={movie.ImagePath} alt={movie.Title} />
// 		<Figure.Caption>{movie.Title}</Figure.Caption>
// 	</Link>
// </Figure>;
