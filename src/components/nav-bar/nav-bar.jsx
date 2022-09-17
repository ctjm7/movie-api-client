import React from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { RegistrationView } from "../registration-view/registration-view";
import "./nav-bar.scss";

export function NavBar({ user }) {
  const onLoggedOut = () => {
		localStorage.clear();
		window.open("/", "_self");
	};

  const isAuth = () => {
		if (typeof window == "undefined") {
			return false;
		}
		if (localStorage.getItem("token")) {
				return localStorage.getItem("token");
		} else {
			return false;
		}
	};

  return (
		<>
			<Container>
				<Navbar className="nav mb-1" variant="dark">
					<Container>
						<Navbar.Brand herf="">See You at the Movies!</Navbar.Brand>
						<Nav className="me-auto">
							<Nav.Link to="/">Home</Nav.Link>
							<Nav.Link to="/">Profile</Nav.Link>
							<Nav.Link to="/register">Register</Nav.Link>

								{/* <Link to={/register}</Link> */}

							<Button variant="link" onClick={onLoggedOut}>
								Logout
							</Button>
						</Nav>
					</Container>
				</Navbar>
			</Container>
		</>
	);
}
