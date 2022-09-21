import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

export class MovieView extends React.Component {

  render() {
		const { movie, onBackClick } = this.props;


		// const navigate = useNavigate();


    return (
			<Card className="movie-view">
				<Card.Img variant="top" src={movie.ImagePath} />
				<Card.Body>
					<Card.Title>{movie.Title}</Card.Title>

					<Card.Text>Description: {movie.Description}</Card.Text>


					<Link to={-1}>
					<Button
						variant="outline-secondary"
					>
						Back
				</Button>
				</Link>

				</Card.Body>
			</Card>
		);
  }
}

// onClick={() => {
// 							onBackClick();

// MovieView.propTypes = {
//   movie: PropTypes.shape({
//     Title: PropTypes.string.isRequired,
//     Description: PropTypes.string.isRequired,
//     ImagePath: PropTypes.string.isRequired,
//     Genre: PropTypes.shape({
//       Name: PropTypes.string.isRequired,
//       Description: PropTypes.string.isRequired
//     }),
//     Director: PropTypes.shape({
//       Name: PropTypes.string.isRequired,
//       Bio: PropTypes.string.isRequired
//     })
//   }).isRequired,

// };


	{
		/* </Card.Body>* <Card.Text>Director: {movie.Director.Name}</Card.Text>
						<Card.Text>Director Biography: {movie.Director.Bio}</Card.Text>

						<Card.Text>Genre: {movie.Genre.Name}</Card.Text>
						<Card.Text>Genre Description: {movie.Genre.Description}</Card.Text> */
	}

	{
		/* <Link onClick={() => {
						onBackClick();
					}}>
					<Button
						variant="outline-secondary"
					>Back</Button>
					</Link> */
	}
