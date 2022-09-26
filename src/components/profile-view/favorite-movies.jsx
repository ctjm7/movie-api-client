import axios from "axios";
import React from "react";
import { Button, Row, Col, Figure, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./profile-view.scss";

function FavoriteMovies({ movie }) {

	const removeFav = (id) => {
		let token = localStorage.getItem('token');
		let url = `https://seeyouatmovies.herokuapp.com/users/${localStorage.getItem("user")}/movies/${movie._id}`;
		axios.delete(url, {
			headers: { Authorization: `Bearer ${token}` },
		});
	};

	return (
			<Card className="card">
				<Card.Body>
					 <Row>
					{(movie !== 0) ? (
							<Col
								xs={12}
								md={6}
								lg={4}

								className="fav-movie"
							>
								<Figure className="figure">
									<Link to={`movies/${movie._id}`}>
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
				</Card.Body>
			</Card>
	);

}

export default FavoriteMovies;
