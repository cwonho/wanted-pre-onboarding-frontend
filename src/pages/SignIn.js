import { useEffect } from "react";
import AuthBox from "./components/AuthBox";

const Signin = () => {
	useEffect(() => {
		const titleElement = document.getElementsByTagName("title")[0];
		titleElement.innerHTML = "로그인";
	}, []);

	return <AuthBox isSignIn={true} {...SIGNIN_DATA} />;
};

export default Signin;

const SIGNIN_DATA = {
	title: "SignIn",
	text: "New to wanted?",
	change: "SignUp",
};
