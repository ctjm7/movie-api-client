import React from "react";

function UserInfo(email, name) {
	return (
		<Container>
			<h3>Profile</h3>
			<p>Name: {name}</p>
			<p>Email: {email}</p>
		</Container>
	);
}

export default UserInfo;
