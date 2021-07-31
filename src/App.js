import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Moment from "react-moment";

const USERS = {
	john: {
		id: "john",
		name: "John Doe",
		profilePic: "",
		messages: [],
	},
	krystian: {
		id: "krystian",
		name: "Krystian Pach",
		profilePic: "",
		messages: [],
	},
};
const App = () => {
	const [users, setUsers] = useState(USERS);
	const [currentUser, setCurrentUser] = useState(USERS.john);
	const [messages, setMessages] = useState([]);
	const [currentMessage, setCurrentMessage] = useState({
		content: "",
		image: "",
		id: "",
		time: 0,
		user: {},
	});
	const [isEditing, setIsEditing] = useState(false);

	const handleChange = (e) => {
		const value = e.target.value;
		setCurrentMessage({ ...currentMessage, content: value });
	};

	const handleImageUpload = (e) => {
		const [file] = e.target.files;
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				setCurrentMessage({ ...currentMessage, image: e.target.result });
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const newMessage = {
			id: uuidv4(),
			content: currentMessage.content ? currentMessage.content : null,
			image: currentMessage.image ? currentMessage.image : null,
			time: Date.now(),
			user: { ...currentUser },
		};
		setUsers({
			...users,
			[currentUser.id]: {
				...users[currentUser.id],
				messages: [...users[currentUser.id].messages, { ...newMessage }],
			},
		});
		setCurrentMessage({
			content: "",
			image: "",
			id: "",
			time: 0,
			user: {},
		});
	};

	const handleSwitchUsers = (e) => {
		const checked = e.target.checked;
		checked ? setCurrentUser(USERS.krystian) : setCurrentUser(USERS.john);
	};

	const deleteMessage = (id, userId) => {
		const newMessages = users[userId].messages.filter((msg) => msg.id !== id);
		setUsers({
			...users,
			[userId]: {
				...users[userId],
				messages: newMessages,
			},
		});
	};

	const editMessage = (msg) => {
		setIsEditing(true);
		setCurrentMessage(msg);
	};

	const handleEdit = (id, userId, e) => {
		e.preventDefault();
		const newContent = currentMessage.content;
		const newImage = currentMessage.image;
		const newMessages = users[userId].messages.map((msg) => {
			if (msg.id === id) {
				return { ...msg, content: newContent, image: newImage };
			}
			return msg;
		});
		setUsers({
			...users,
			[userId]: {
				...users[userId],
				messages: newMessages,
			},
		});
		setCurrentMessage({
			content: "",
			image: "",
			id: "",
			time: 0,
			user: {},
		});
		setIsEditing(false);
	};

	useEffect(() => {
		setMessages(
			[...users.john.messages, ...users.krystian.messages].sort((a, b) => {
				return a.time - b.time;
			})
		);
	}, [users]);

	return (
		<div>
			<h1>Chat application</h1>
			<div>
				<h3>Switch Users</h3>
				<p>Current user: {currentUser.name}</p>
				<input onChange={handleSwitchUsers} type="checkbox" name="" id="" />
			</div>
			<section>
				<div>
					{messages.map((msg) => {
						const {
							content,
							image,
							id,
							time,
							user: { name, id: userId },
						} = msg;
						return (
							<div key={id}>
								<p>{name}</p>
								{content && <h2>{content}</h2>}
								{image && (
									<img
										src={image}
										alt=""
										style={{
											width: "100px",
											height: "100px",
											background: "red",
										}}
									/>
								)}
								<Moment format="k:mm">{time}</Moment>
								<button onClick={() => deleteMessage(id, userId)} type="button">
									Delete
								</button>
								<button onClick={() => editMessage(msg)} type="button">
									Edit
								</button>
							</div>
						);
					})}
				</div>
				<form
					onSubmit={
						isEditing
							? (e) => handleEdit(currentMessage.id, currentUser.id, e)
							: handleSubmit
					}
				>
					<input
						autoComplete="off"
						value={currentMessage.content}
						onChange={handleChange}
						type="text"
						name="text"
						id="text"
					/>
					<input
						onChange={handleImageUpload}
						type="file"
						accept="image/*"
						multiple={false}
					/>
					<button type="submit">{isEditing ? "Save" : "Send"}</button>
				</form>
				<img
					src={currentMessage.image}
					alt=""
					style={{
						width: "100px",
						height: "100px",
						background: "red",
					}}
				/>
			</section>
		</div>
	);
};

export default App;
