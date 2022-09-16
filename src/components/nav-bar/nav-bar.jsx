import React from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './nav-bar.scss'

export function NavBar({ user }) {
  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  }

  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  }

  return (
		<Navbar className="nav mb-1" variant="dark">
			<Container>
				<Navbar.Brand className="nav-brand" herf="/">
					See You at the Movies!
				</Navbar.Brand>
				<Nav className="me-auto">
					{isAuth() && <Nav.Link href={`/users/${user}`}>Profile</Nav.Link>}
					{!isAuth() && <Nav.Link href="/">Login</Nav.Link>}
					{!isAuth() && <Nav.Link href="/register">Register</Nav.Link>}
					{isAuth() && <Button variant="link" onClick={onLoggedOut}>Logout</Button>}
				</Nav>
			</Container>
		</Navbar>
	);
}
