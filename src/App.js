import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Moment from "react-moment";

const USERS = {
	John: {
		id: 1,
		firstName: "John",
		lastName: "Doe",
		profilePic: "",
		messages: [],
	},
	Krystian: {
		id: 2,
		firstName: "Krystian",
		lastName: "Pach",
		profilePic: "",
		messages: [],
	},
};
const App = () => {
	const [users, setUsers] = useState(USERS);
	const [currentUser, setCurrentUser] = useState(USERS.John);
	const [messages, setMessages] = useState([]);
	const [currentMessage, setCurrentMessage] = useState({ text: "", image: "" });

	const handleChange = (e) => {
		const value = e.target.value;
		const name = e.target.name;
		setCurrentMessage({ ...currentMessage, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const newMessage = {
			id: uuidv4(),
			content: currentMessage.text,
			time: Date.now(),
			user: { currentUser },
		};
		setUsers({
			...users,
			[currentUser.firstName]: {
				...users[currentUser.firstName],
				messages: [...users[currentUser.firstName].messages, { ...newMessage }],
			},
		});
		setCurrentMessage({ text: "", image: "" });
	};

	const handleSwitchUsers = (e) => {
		const checked = e.target.checked;
		checked ? setCurrentUser(USERS.Krystian) : setCurrentUser(USERS.John);
	};

	const deleteMessage = (id, firstName) => {
		const newMessages = users[firstName].messages.filter(
			(msg) => msg.id !== id
		);
		setUsers({
			...users,
			[firstName]: {
				...users[firstName],
				messages: newMessages,
			},
		});
	};

	useEffect(() => {
		setMessages(
			[...users.John.messages, ...users.Krystian.messages].sort((a, b) => {
				return a.time - b.time;
			})
		);
	}, [users]);

	return (
		<div>
			<h1>Chat application</h1>
			<div>
				<h3>Switch Users</h3>
				<p>
					Current user: {`${currentUser.firstName} ${currentUser.lastName}`}
				</p>
				<input onChange={handleSwitchUsers} type="checkbox" name="" id="" />
			</div>
			<section>
				<div>
					{messages.map((msg) => {
						const {
							content,
							id,
							time,
							user: { firstName, lastName },
						} = msg;
						return (
							<div key={id}>
								<p>{`${firstName} ${lastName}`}</p>
								<h2>{content}</h2>
								<Moment format="k:mm">{time}</Moment>
								<button
									onClick={() => deleteMessage(id, firstName)}
									type="button"
								>
									Delete
								</button>
								<button type="button">Edit</button>
							</div>
						);
					})}
				</div>
				<form onSubmit={handleSubmit}>
					<input
						autoComplete="off"
						value={currentMessage.text}
						onChange={handleChange}
						type="text"
						name="text"
						id="text"
					/>
					<button type="submit">Send</button>
				</form>
			</section>
		</div>
	);
};

export default App;
