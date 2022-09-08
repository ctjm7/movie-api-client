import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Navbar, Nav, Row, Col, Card, Form, Button } from 'react-bootstrap';
import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
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
						<Nav.Link href="">Register</Nav.Link>
					</Nav>
				</Container>
			</Navbar>

			<Container className="justify-content-center">
				<Row>
					<Col>
						<Card className="login mx-auto">
							<Card.Body>
								<Card.Title className="text-center">Login</Card.Title>
								<Form>
									<Form.Group className="mb-3" controlId="formUsername">
										<Form.Label>Username:</Form.Label>
										<Form.Control
											type="text"
											placeholder="Enter Username"
											onChange={(e) => setUsername(e.target.value)}
											required
										/>
									</Form.Group>

									<Form.Group className="mb-3" controlId="formPassword">
										<Form.Label>Password:</Form.Label>
										<Form.Control
											type="password"
											placeholder="Enter Password"
											onChange={(e) => setPassword(e.target.value)}
											required
										/>
									</Form.Group>

									<Button
										className="btn"
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
		</Container>
	);
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};
