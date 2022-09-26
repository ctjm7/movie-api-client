import React from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

export function MovieView({movies}) {

	const selectMovie = () => {
		const { id } = useParams();
		return movies.find(m => m._id === id);
	}

    return (
			<Card className="movie-view">
				{/* <div>{JSON.stringify(selectMovie().Description)}</div> */}

				{/* <div>{JSON.stringify(movie)}</div> */}

				<Card.Img
					className="image"
					variant="top"
					src={selectMovie().ImagePath}
				/>
				<Card.Body>
					<Card.Title>{selectMovie().Title}</Card.Title>

					<Card.Text>Description: {selectMovie().Description}</Card.Text>

					<Card.Text>Director: {selectMovie().Director.Name}</Card.Text>
					<Card.Text>
						Director Biography: {selectMovie().Director.Bio}
					</Card.Text>
					<Link to={`/directors/${selectMovie().Director.Name}`}>
						<Button variant="link">Director</Button>
					</Link>

					<Card.Text>Genre: {selectMovie().Genre.Name}</Card.Text>
					<Card.Text>
						Genre Description: {selectMovie().Genre.Description}
					</Card.Text>
					<Link to={`/genre/${selectMovie().Genre.Name}`}>
						<Button variant="link">Genre</Button>
					</Link>

					<Link to={-1}>
						<Button variant="outline-secondary">Back</Button>
					</Link>
				</Card.Body>
			</Card>
		);
  }
// }


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
		/* <Link onClick={() => {
						onBackClick();
					}}>
					<Button
						variant="outline-secondary"
					>Back</Button>
					</Link> */
	}
