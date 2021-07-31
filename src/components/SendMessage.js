import React from "react";
import defaultImage from "../assets/default.svg";

const SendMessage = ({
	handleEdit,
	handleSubmit,
	handleChange,
	handleImageUpload,
	isEditing,
	currentMessage,
	currentUser,
}) => {
	return (
		<form
			className="send-message-form"
			method="POST"
			onSubmit={
				isEditing
					? (e) => handleEdit(currentMessage.id, currentUser.id, e)
					: handleSubmit
			}
		>
			<input
				className="message-input"
				autoComplete="off"
				placeholder="message..."
				value={currentMessage.content}
				onChange={handleChange}
				type="text"
			/>
			<input
				onChange={handleImageUpload}
				type="file"
				accept="image/*"
				multiple={false}
				id="image"
				className="image-input"
			/>
			<label htmlFor="image" className="image-input-container">
				<img
					className="image"
					src={currentMessage.image ? currentMessage.image : defaultImage}
					alt=""
				/>
			</label>
			{isEditing ? (
				<button className="save btn" type="submit">
					&#10004;
				</button>
			) : (
				<button className="btn" type="submit">
					&#10095;
				</button>
			)}
		</form>
	);
};

export default SendMessage;
