import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Row, Col, CardGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class MovieCard extends React.Component {
	render() {
		const { movie } = this.props;

		return (
			<CardGroup className="card-group">
				<Card className="movie-card my-1">
					<Card.Img variant="top" src={movie.ImagePath} />
					<Card.Body>
						<Card.Title>{movie.Title}</Card.Title>
						<Card.Text>{movie.Description}</Card.Text>
						<Link to={"/movies/:id"}>
							<Button variant="outline-secondary">Open</Button>
						</Link>
					</Card.Body>
				</Card>
			</CardGroup>
		);
	}
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  })
};
