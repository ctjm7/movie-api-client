import React from "react";
import { Col, Row, Container } from "react-bootstrap";

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;

    return (
			<Container>
				<Row className="genre-view">
					<Col>Director</Col>
					<Row>{genre.Name}</Row>
					<Row>{genre.Description}</Row>
					<Button
						onClick={() => {
							onBackClick();
						}}
					>
						Back
					</Button>
				</Row>
			</Container>
		);
  }
}

export default GenreView
