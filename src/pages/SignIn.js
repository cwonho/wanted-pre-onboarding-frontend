import AuthBox from "./components/AuthBox";

const Signin = () => {
	return <AuthBox isSignIn={true} {...SIGNIN_DATA} />;
};

export default Signin;

const SIGNIN_DATA = {
	title: "SignIn",
	text: "New to wanted?",
	change: "SignUp",
};
