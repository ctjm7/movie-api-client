import React from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
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
									{/* <Navbar.Brand herf="">See You at the Movies!</Navbar.Brand> */}
									<Nav className="me-auto">
										{/* <Nav.Link herf="/">Home</Nav.Link>
										<Nav.Link herf="/profile">Profile</Nav.Link> */}
										<Link to="/register">
											Register
										</Link>
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

export default NavBar;
