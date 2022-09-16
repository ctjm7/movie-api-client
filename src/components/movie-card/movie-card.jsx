import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
			<Card className="movieCard my-1">
				<Card.Img variant="top" src={movie.imagePath} />
				<Card.Body>
					<Card.Title>{movie.Title}</Card.Title>
					<Card.Text>{movie.Description}</Card.Text>
					<Link to={`/movies/${movies._id}`}>
						<Button variant="link">Open</Button>
					</Link>
				</Card.Body>
			</Card>
		);
  }
}
