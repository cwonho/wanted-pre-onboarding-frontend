import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const AuthBox = ({ title, text, change, isSignIn }) => {
	const navigate = useNavigate();

	const onSwitchClick = () => {
		navigate(`/${change}`);
	};

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
							placeholder="Email"
						/>
						<AuthInput
							data-testid="password-input"
							type="password"
							placeholder="Password"
						/>
						<AuthButton
							data-testid={isSignIn ? "signin-button" : "signup-button"}
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
	font-weight: bold;
	background-color: black;
	border: none;
	cursor: pointer;

	&:active {
		transform: scale(0.99);
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
