import React from "react";

const Switch = ({ user, isEditing, handleChange }) => {
	return (
		<>
			<h3 className="subtitle">Switch Users</h3>
			<h3 className="subtitle">Current user: {user}</h3>
			<label className="switch" htmlFor="switch">
				<input
					className="checkbox"
					disabled={isEditing ? true : false}
					onChange={handleChange}
					type="checkbox"
					id="switch"
				/>
				<span
					className={isEditing ? "slider round disabled" : "slider round"}
				></span>
			</label>
		</>
	);
};

export default Switch;
