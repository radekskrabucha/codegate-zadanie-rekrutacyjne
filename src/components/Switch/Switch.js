import React from "react";
import switchStyles from "./Switch.module.css";

const Switch = ({ user, isEditing, handleChange }) => {
	const { subtitle, switcher, checkbox, slider, disabled } = switchStyles;
	return (
		<>
			<h3 className={subtitle}>Switch Users</h3>
			<h3 className={subtitle}>Current user: {user}</h3>
			<label className={switcher} htmlFor="switch">
				<input
					className={checkbox}
					disabled={isEditing ? true : false}
					onChange={handleChange}
					type="checkbox"
					id="switch"
				/>
				<span className={isEditing ? `${slider} ${disabled}` : slider}></span>
			</label>
		</>
	);
};

export default Switch;
