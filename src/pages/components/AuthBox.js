import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";

const AuthBox = ({ title, text, change, isSignIn }) => {
	const [userInput, setUserInput] = useState({ email: "", password: "" });

	const { email, password } = userInput;

	const navigate = useNavigate();

	const isValid = email.includes("@") && password.length >= 8;

	const handleUserInput = (e) => {
		const { name, value } = e.target;
		setUserInput({ ...userInput, [name]: value });
	};

	const handleAuth = () => {
		if (!isSignIn) {
			fetch("https://pre-onboarding-selection-task.shop/auth/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: email,
					password: password,
				}),
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.access_token) {
						toast.success("회원가입 성공!");
						navigate("/signin");
					} else {
						toast.error(data.message);
						setUserInput({ email: "", password: "" });
					}
				});
		} else {
			fetch("https://pre-onboarding-selection-task.shop/auth/signin", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: email,
					password: password,
				}),
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.access_token) {
						console.log(data);
						toast.success("로그인 성공!");
						localStorage.setItem("token", data.access_token);
						navigate("/todo");
					} else {
						toast.error(data.message);
						setUserInput({ email: "", password: "" });
					}
				});
		}
	};

	const handleEnterSubmit = (e) => {
		if (e.keyCode === 13) {
			document.getElementById("auth-button").click();
		}
		return;
	};

	const onSwitchClick = () => {
		navigate(`/${change}`);
	};

	useEffect(() => {
		if (localStorage.getItem("token")) {
			toast.success("자동 로그인되었습니다!");
			navigate("/todos");
		}
	}, []);

	return (
		<OuterWrap>
			<MainWrap>
				<LogoWrap>
					<Logo>wanted</Logo>
				</LogoWrap>
				<BodyWrap>
					<TitleWrap>
						<Title>{title}</Title>
					</TitleWrap>
					<AuthWrap>
						<AuthInput
							data-testid="email-input"
							type="email"
							name="email"
							value={email}
							placeholder="Email"
							onChange={handleUserInput}
						/>
						<AuthInput
							data-testid="password-input"
							type="password"
							name="password"
							value={password}
							placeholder="Password"
							onChange={handleUserInput}
							onKeyDown={handleEnterSubmit}
						/>
						<AuthButton
							data-testid={isSignIn ? "signin-button" : "signup-button"}
							id="auth-button"
							disabled={!isValid}
							onClick={handleAuth}
						>
							{title}
						</AuthButton>
						<SwitchText>
							{text} <Switch onClick={onSwitchClick}>{change}</Switch>
						</SwitchText>
					</AuthWrap>
				</BodyWrap>
			</MainWrap>
		</OuterWrap>
	);
};

const OuterWrap = styled.div`
	display: grid;
	place-items: center;
	width: 100vw;
	min-height: 100vh;
`;

const MainWrap = styled.div`
	display: grid;
	grid-template-rows: 20% 80%;
	width: 450px;
	height: 450px;
`;

const LogoWrap = styled.div`
	display: grid;
	place-items: center;
`;

const Logo = styled.h1`
	font-size: 32px;
	font-weight: 500;
	letter-spacing: -1px;
`;

const BodyWrap = styled.div`
	border: 1px solid #636e72;
	border-radius: 5px;
`;

const TitleWrap = styled.div`
	display: grid;
	place-items: center;
	height: 20%;
	padding-top: 20px;
`;

const Title = styled.h2`
	font-size: 18px;
`;

const AuthWrap = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	height: 80%;
	padding: 0 50px;
`;

const AuthInput = styled.input`
	padding: 0 10px;
	height: 15%;

	&:focus {
		outline: none;
		border: 2px solid black;
		::placeholder {
			color: transparent;
		}
	}
`;

const AuthButton = styled.button`
	height: 20%;
	color: #fff;
	opacity: ${(props) => (props.disabled ? "0.6" : "1")};
	font-weight: bold;
	background-color: black;
	border: none;
	cursor: ${(props) => (props.disabled ? "null" : "pointer")};

	&:active {
		transform: ${(props) => (props.disabled ? "null" : "scale(0.99)")};
	}
`;

const SwitchText = styled.p`
	font-size: 12px;
	text-align: center;
	color: #636e72;
`;

const Switch = styled.span`
	color: black;
	font-size: 12px;
	font-weight: bold;
	cursor: pointer;
`;

export default AuthBox;
