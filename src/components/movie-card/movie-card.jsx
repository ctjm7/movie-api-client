import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    return (
			<Card className="movieCard my-1">
				<Card.Img variant="top" src={movie.ImagePath} />
				<Card.Body>
					<Card.Title>{movie.Title}</Card.Title>
					<Card.Text>{movie.Description}</Card.Text>
					{/* <Link to={`/movies/${movies._id}`}>
						<Button variant="link">Open</Button>
					</Link> */}
					<Button onClick={() => onMovieClick(movie)} variant="outline-secondary">
						Open
					</Button>
				</Card.Body>
			</Card>
		);
  }
}

/* <Card className="card">
			<Card.Body>
				<Row>
					<Col xs={12}>
						<h3>Favorite Movies</h3>
					</Col>
				</Row> */

		// 						<Col
		// 							xs={12}
		// 							md={6}
		// 							lg={4}
		// 							key={movie._id}
		// 							className="fav-movie"
		// 						>
		// 							<Figure className="figure">
		// 								<Link to={`/movies/${movie._id}`}>
		// 									<Figure.Image
		// 										className="img"
		// 										src={movie.ImagePath}
		// 										alt={movie.Title}
		// 									/>
		// 									<Figure.Caption className="fig-caption">
		// 										{movie.Title}
		// 									</Figure.Caption>
		// 								</Link>
		// 							</Figure>

		// 						</Col>
		// 					);
		// 				})
		// 			)}
		// 		</Row>
		// 	</Card.Body>
		// </Card>



MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  })
};
