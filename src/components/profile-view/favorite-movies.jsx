import axios from "axios";
import React from "react";
import { Button, Row, Col, Figure, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./profile-view.scss";

function FavoriteMovies({ favoriteMovies }) {
	const removeFav = (id) => {
		let url = `https://seeyouatmovies.herokuapp.com/users/${localStorage.getItem(
			"user"
		)}/movies/${id}`;
		axios.delete(url, {
			headers: { Authorization: `Bearer ${token}` },
		});
	};

	const favoriteMoviesMap = favoriteMovies.map((movie) => movie._id);
	const favoriteMoviesList = movies.filter((movie) => {
		favoriteMoviesMap.includes(movie._id);
	});

	return (
		<Card className="card">
			<Card.Body>
				<Row>
					<Col xs={12}>
						<h3>Favorite Movies</h3>
					</Col>
				</Row>

				<Row>
					{favoriteMoviesList.length === 0 ? (
						<p>("You have no favorite movies")</p>
					) : (
						favoriteMoviesList.map((movie) => {
							return (
								<Col
									xs={12}
									md={6}
									lg={4}
									key={movie._id}
									className="fav-movie"
								>
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
							);
						})
					)}
				</Row>
			</Card.Body>
		</Card>
	);
}

export default FavoriteMovies;
