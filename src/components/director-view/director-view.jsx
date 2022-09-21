import React from "react";
import { Button, Card } from "react-bootstrap";
import "./director-view.scss";

export class DirectorView extends React.Component {
	render() {
		const { director, onBackClick } = this.props;

		return (
			<Card className="director-view">
				<Card.Title>Director</Card.Title>
				<Card.Subtitle>{director.Name}</Card.Subtitle>
				<Card.Text>{director.Bio}</Card.Text>
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
