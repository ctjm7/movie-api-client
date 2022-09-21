import React from "react";
import { Button, Card } from "react-bootstrap";
import "./genre-view.scss";

export class GenreView extends React.Component {
	render() {
		const { genre, onBackClick } = this.props;

		return (
			<Card className="genre-view">
				<Card.Title>Genre</Card.Title>
				<Card.Subtitle>{genre.Name}</Card.Subtitle>
				<Card.Text>{genre.Description}</Card.Text>
				{/* <Button
					variant="outline-secondary"
					onClick={() => {
						onBackClick();
					}}
				>
					Back
				</Button> */}
				<Link to={-1}>
					<Button variant="outline-secondary">Back</Button>
				</Link>
			</Card>
		);
	}
}
