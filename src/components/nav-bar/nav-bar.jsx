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
		<Navbar className="nav mb-1">
			<Container>
				<Navbar.Brand className="nav-brand" herf="/">
					See You at the Movies!
				</Navbar.Brand>
				<Nav className="me-auto nav-link">
					{isAuth() && <Link to={`/users/${user}`}>Profile</Link>}
					{!isAuth() && <Link to={"/login"}>Login</Link>}
					{!isAuth() && <Link to="/register">Register</Link>}
					{isAuth() && (
						<Button variant="link" onClick={onLoggedOut}>
							Logout
						</Button>
					)}
				</Nav>
			</Container>
		</Navbar>
	);
}
