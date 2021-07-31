import React from "react";
import Moment from "react-moment";

const Message = ({ msg, currentUserId, editMessage, deleteMessage }) => {
	const {
		content,
		image,
		id,
		time,
		user: { profilePic, name, id: userId },
	} = msg;
	return (
		<div
			className={`${
				userId === currentUserId ? "message current-user-message" : "message"
			}`}
		>
			<div className="column-profile-image">
				<div className="profile-image-container">
					<img className="profile-image" src={profilePic} alt={name} />
				</div>
			</div>
			<div className="msg-column">
				{content && (
					<div className="content-container">
						<h3 className="name">{name}</h3>
						<p className="content">{content}</p>
					</div>
				)}
				{image && (
					<div className="image-container">
						<img className="image" src={image} alt="" />
					</div>
				)}

				<div className="info-container">
					<Moment className="time info-item" format="k:mm">
						{time}
					</Moment>
					{userId === currentUserId && (
						<>
							<button
								className="btn-text info-item"
								onClick={() => deleteMessage(id, userId)}
								type="button"
							>
								delete
							</button>
							<button
								className="btn-text info-item"
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
