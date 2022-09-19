import React from "react";
import { Button, Form, Card, Row, Container } from "react-bootstrap";

function UpdateUser({ handleSubmit, handleUpdate, user }) {
	const deleteUser = () => {
		let token = localStorage.getItem("token");
		axios
			.delete("https://seeyouatmovies.herokuapp.com/users/:Username", {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((res) => {
				alert("Your user account was deleted");
				localStorage.clear();
				window.open("/", "_self");
			})
			.catch((err) => console.log(err));
	};

	return (
		<Container>
			<Row>
				<Col>
					<Card className="reg mx-auto">
						<Card.Body>
							<Card.Title className="text-center">Update Profile</Card.Title>
							<Form>
								<Form.Group className="mb-3" controlId="formUsername">
									<Form.Label>Username:</Form.Label>
									<Form.Control
										type="text"
										name="Username"
										defaultValue={user.Username}
										onChange={(e) => handleUpdate(e.target.value)}
										required
										placeholder="Enter a username"
									/>
								</Form.Group>

								<Form.Group className="mb-3" controlId="formPassword">
									<Form.Label>Password:</Form.Label>
									<Form.Control
										type="password"
										defaultValue={user.Password}
										onChange={(e) => handleUpdate(e.target.value)}
										required
										placeholder="Password must be 4 characters"
										minLength="4"
									/>
								</Form.Group>

								<Form.Group className="mb-3" controlId="formEmail">
									<Form.Label>Email:</Form.Label>
									<Form.Control
										type="email"
										defaultValue={user.Email}
										onChange={(e) => handleUpdate(e.target.value)}
										required
										placeholder="Enter Email"
									/>
								</Form.Group>

								<Form.Group className="mb-3" controlId="formBirthday">
									<Form.Label>Birthday:</Form.Label>
									<Form.Control
										type="birthday"
										onChange={(e) => handleUpdate(e.target.value)}
										placeholder="dd-mm-yyyy"
									/>
								</Form.Group>

								<Button
									variant="outline-secondary"
									type="submit"
									onClick={(e) => handleSubmit(e.target.value)}
								>
									Submit
								</Button>
								<Button
									variant="outline-danger"
									type="submit"
									onClick={deleteUser}
								>
									Delete Profile
								</Button>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}

export default UpdateUser;
