import React from "react";
import Moment from "react-moment";
import messageStyles from "./Message.module.css";

const Message = ({ msg, currentUserId, editMessage, deleteMessage }) => {
	const {
		content,
		image,
		id,
		time,
		user: { profilePic, name, id: userId },
	} = msg;

	const {
		message,
		currentUserMessage,
		columnProfileImage,
		profileImageContainer,
		profileImage,
		msgColumn,
		contentContainer,
		username,
		msgContent,
		imageContainer,
		msgImage,
		infoContainer,
		infoItem,
		btnText,
	} = messageStyles;
	return (
		<div
			className={`${
				userId === currentUserId ? `${message} ${currentUserMessage}` : message
			}`}
		>
			<div className={columnProfileImage}>
				<div className={profileImageContainer}>
					<img className={profileImage} src={profilePic} alt={name} />
				</div>
			</div>
			<div className={msgColumn}>
				{content && (
					<div className={contentContainer}>
						<h3 className={username}>{name}</h3>
						<p className={msgContent}>{content}</p>
					</div>
				)}
				{image && (
					<div className={imageContainer}>
						<img className={msgImage} src={image} alt="" />
					</div>
				)}

				<div className={infoContainer}>
					<Moment className={infoItem} format="k:mm">
						{time}
					</Moment>
					{userId === currentUserId && (
						<>
							<button
								className={`${btnText} ${infoItem}`}
								onClick={() => deleteMessage(id, userId)}
								type="button"
							>
								delete
							</button>
							<button
								className={`${btnText} ${infoItem}`}
								onClick={() => editMessage(msg)}
								type="button"
							>
								edit
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Message;
