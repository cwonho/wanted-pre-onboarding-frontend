import { useEffect } from "react";
import AuthBox from "./components/AuthBox";

const Signup = () => {
	useEffect(() => {
		const titleElement = document.getElementsByTagName("title")[0];
		titleElement.innerHTML = "회원가입";
	}, []);

	return <AuthBox {...SIGNUP_DATA} />;
};

export default Signup;

const SIGNUP_DATA = {
	title: "SignUp",
	text: "Already have an account?",
	change: "SignIn",
};
