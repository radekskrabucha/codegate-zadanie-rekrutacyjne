import React from "react";
import defaultImage from "../../assets/default.svg";
import SendMessageFormStyles from "./SendMessageForm.module.css";

const SendMessage = ({
	handleEdit,
	handleSubmit,
	handleChange,
	handleImageUpload,
	isEditing,
	currentMessage,
	currentUser,
}) => {
	const {
		sendMessageForm,
		messageInput,
		imageInput,
		imageInputContainer,
		image,
		btn,
		save,
	} = SendMessageFormStyles;
	return (
		<form
			className={sendMessageForm}
			method="POST"
			onSubmit={
				isEditing
					? (e) => handleEdit(currentMessage.id, currentUser.id, e)
					: handleSubmit
			}
		>
			<input
				className={messageInput}
				autoComplete="off"
				placeholder="message..."
				value={currentMessage.content}
				onChange={handleChange}
				type="text"
			/>
			<input
				className={imageInput}
				onChange={handleImageUpload}
				type="file"
				accept="image/*"
				multiple={false}
				id="image"
			/>
			<label htmlFor="image" className={imageInputContainer}>
				<img
					className={image}
					src={currentMessage.image ? currentMessage.image : defaultImage}
					alt=""
				/>
			</label>
			{isEditing ? (
				<button className={`${save} ${btn}`} type="submit">
					&#10004;
				</button>
			) : (
				<button className={btn} type="submit">
					&#10095;
				</button>
			)}
		</form>
	);
};

export default SendMessage;
