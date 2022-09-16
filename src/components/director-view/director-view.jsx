import React from 'react';
import { Col, Row, Container } from "react-bootstrap";
import './director-view.scss';

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;

    return (
			<Container>
				<Row className="director-view">
					<Col>Director</Col>
					<Row>{director.Name}</Row>
					<Row>{director.Bio}</Row>
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
