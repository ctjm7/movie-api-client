import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button, Navbar, Nav, Container, Row, Col, Card } from "react-bootstrap";
import './registration-view.scss'

export function RegistrationView(props) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [birthday, setBirthday] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(username, password, email, birthday);
		/* Send a request to the server for authentication */
		/* then call props.onRegistration(username) */
		props.onRegistration(username);
	};

	return (
		<Container>
			<Navbar className="nav mb-1" variant="dark">
				<Container>
					<Navbar.Brand herf="">
						<img
							src="src/img/movie-reel-icon.svg"
							width="30"
							height="30"
							className="d-inline-block align-top nav-logo"
						/>
						See You at the Movies!
					</Navbar.Brand>
					<Nav className="me-auto">
						<Nav.Link href="">Home</Nav.Link>
						<Nav.Link href="">Profile</Nav.Link>
					</Nav>
				</Container>
			</Navbar>

			<Row>
				<Col>
					<Card className="reg mx-auto">
						<Card.Body>
							<Card.Title className="text-center">Registration</Card.Title>
							<Form>
								<Form.Group className="mb-3" controlId="formUsername">
									<Form.Label>Username:</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter Username"
										onChange={(e) => setUsername(e.target.value)}
										required
										minLength="4"
									/>
								</Form.Group>

								<Form.Group className="mb-3" controlId="formPassword">
									<Form.Label>Password:</Form.Label>
									<Form.Control
										type="password"
										placeholder="Must be 8 or more characters"
										onChange={(e) => setPassword(e.target.value)}
										required
										minLength="8"
									/>
								</Form.Group>

								<Form.Group className="mb-3" controlId="formEmail">
									<Form.Label>Email:</Form.Label>
									<Form.Control
										type="email"
										placeholder="Enter Email"
										onChange={(e) => setEmail(e.target.value)}
										required
									/>
								</Form.Group>

								<Form.Group className="mb-3" controlId="formBirthday">
									<Form.Label>Birthday:</Form.Label>
									<Form.Control
										type="birthday"
										placeholder="Enter Birthday"
										onChange={(e) => setBirthday(e.target.value)}
									/>
								</Form.Group>

								<Button
									variant="outline-secondary"
									type="submit"
									onClick={handleSubmit}
								>
									Submit
								</Button>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}

RegistrationView.propTypes = {
	register: PropTypes.shape({
		username: PropTypes.string.isRequired,
		password: PropTypes.string.isRequired,
		email: PropTypes.string.isRequired,
	})
};
