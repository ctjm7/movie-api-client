import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import './registration-view.scss'
import axios from "axios";

export function RegistrationView(props) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [birthday, setBirthday] = useState("");
	const [usernameErr, setUsernameErr] = useState("");
	const [passwordErr, setPasswordErr] = useState("");
	const [emailErr, setEmailErr] = useState("");

	// validate user inputs
	const validate = () => {
		let isReq = true;
		if (!username) {
			setUsernameErr("Username Required");
			isReq = false;
		} else if (username.length < 4) {
			setUsernameErr("Username must be 4 characters long");
			isReq = false;
		}
		if (!password) {
			setPasswordErr("Password Required");
			isReq = false;
		} else if (password.length < 6) {
			setPassword("Password must be 6 characters long");
			isReq = false;
		}
		if (!email) {
			setEmailErr("Email Required");
			isReq = false;
		} else if (email.indexOf('@') === -1) {
			setEmail("Email is not valid");
			isReq = false;
		}
		return isReq;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const isReq = validate();
		if (isReq) {
			axios.post("https://seeyouatmovies.herokuapp.com/users", {
				Username: username,
				Password: password,
				Email: email,
				Birthday: birthday
			})
			.then(response => {
				const data = response.data;
				console.log(data);
				alert("Registration complete, login to continue");
				window.open('/', 'self');
			})
			.catch(response => {
				console.error(response);
				alert('unable to register');
			});
		}
	};

	return (
		<Container>
			<Row>
				<Col>
					<Card className="reg mx-auto">
						<Card.Body>
							<Card.Title className="text-center">Sign up</Card.Title>
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
									{values.usernameErr && <p>{values.usernameErr}</p>}
								</Form.Group>

								<Form.Group className="mb-3" controlId="formPassword">
									<Form.Label>Password:</Form.Label>
									<Form.Control
										type="password"
										placeholder="Must be 6 or more characters"
										onChange={(e) => setPassword(e.target.value)}
										required
										minLength="6"
									/>
									{values.passwordErr && <p>{values.passwordErr}</p>}
								</Form.Group>

								<Form.Group className="mb-3" controlId="formEmail">
									<Form.Label>Email:</Form.Label>
									<Form.Control
										type="email"
										placeholder="Enter Email"
										onChange={(e) => setEmail(e.target.value)}
										required
									/>
									{values.emailErr && <p>{values.emailErr}</p>}
								</Form.Group>

								<Form.Group className="mb-3" controlId="formBirthday">
									<Form.Label>Birthday:</Form.Label>
									<Form.Control
										type="birthday"
										placeholder="dd-mm-yyyy"
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

// RegistrationView.propTypes = {
// 	register: PropTypes.shape({
// 		username: PropTypes.string.isRequired,
// 		password: PropTypes.string.isRequired,
// 		email: PropTypes.string.isRequired,
// 	})
// };

export default RegistrationView
