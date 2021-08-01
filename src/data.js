import krystianImage from "./assets/krystian.jpg";
import johnImage from "./assets/john.jpg";

const USERS = {
	john: {
		id: "john",
		name: "John Doe",
		profilePic: johnImage,
		messages: [],
	},
	krystian: {
		id: "krystian",
		name: "Krystian Pach",
		profilePic: krystianImage,
		messages: [],
	},
};

const DEFAULT_MESSAGE = {
	content: "",
	image: "",
	id: "",
	time: 0,
	user: {},
};

export { USERS, DEFAULT_MESSAGE };
