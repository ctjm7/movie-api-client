import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { BrowserRouter as Route, Router } from "react-router-dom";
import './movie-view.scss';

export class MovieView extends React.Component {
	render() {
		const { movie, onBackClick } = this.props;

		return (
			<Card className="movie-view">
				<Card.Img variant="top" src={movie.imagePath} />
				<Card.Body>
					<Card.Title>{movie.Title}</Card.Title>

					<Card.Text>Description: {movie.Description}</Card.Text>

					<Card.Text>Director: {movie.Director.Name}</Card.Text>
					<Card.Text>Director Biography: {movie.Director.Bio}</Card.Text>
					<Link to={`/directors/${movie.Director.Name}`}>
						<Button variant="link">Director</Button>
					</Link>

					<Card.Text>Genre: {movie.Genre.Name}</Card.Text>
					<Card.Text>Genre Description: {movie.Genre.Description}</Card.Text>
					<Link to={`genre/${movie.Genre.Name}`}>
						<Button variant="link">Genre</Button>
					</Link>

					<Button
						variant="outline-secondary"
						onClick={() => {
							onBackClick(null);
						}}
					>
						Back
					</Button>
				</Card.Body>
			</Card>
		);
	}
}

MovieView.propTypes = {
	movie: PropTypes.shape({
		Title: PropTypes.string.isRequired,
		Description: PropTypes.string.isRequired,
		ImagePath: PropTypes.string.isRequired,
		Genre: PropTypes.shape({
			Name: PropTypes.string.isRequired,
			Description: PropTypes.string.isRequired,
		}),
		Director: PropTypes.shape({
			Name: PropTypes.string.isRequired,
			Bio: PropTypes.string.isRequired,
		}),
	}),
};
