import AuthBox from "./components/AuthBox";

const Signup = () => {
	return <AuthBox {...SIGNUP_DATA} />;
};

export default Signup;

const SIGNUP_DATA = {
	title: "SignUp",
	text: "Already have an account?",
	change: "SignIn",
};
