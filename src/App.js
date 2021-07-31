import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { USERS } from "./data";

import { Switch, SendMessage, Message } from "./components";
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
		<div className="container">
			<h1 className="title">Chat application</h1>
			<Switch
				user={currentUser.name}
				isEditing={isEditing}
				handleChange={handleSwitchUsers}
			/>
			<section className="chat-container">
				<div className="messages-container">
					{messages.map((msg) => {
						return (
							<Message
								key={msg.id}
								deleteMessage={deleteMessage}
								editMessage={editMessage}
								msg={msg}
								currentUserId={currentUser.id}
							/>
						);
					})}
				</div>
				<SendMessage
					isEditing={isEditing}
					handleEdit={handleEdit}
					handleSubmit={handleSubmit}
					handleChange={handleChange}
					handleImageUpload={handleImageUpload}
					currentMessage={currentMessage}
					currentUser={currentUser}
				/>
			</section>
		</div>
	);
};

export default App;
