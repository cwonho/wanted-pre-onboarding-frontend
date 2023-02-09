import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import ToDoItem from "./components/ToDoItem";

const ToDoList = () => {
	const [isFocus, setIsFocus] = useState(false);
	const [taskInput, setTaskInput] = useState("");

	const navigate = useNavigate();

	const handleInputFocus = () => {
		setIsFocus(!isFocus);
	};

	const handleTaskInput = (e) => {
		setTaskInput(e.target.value);
	};

	useEffect(() => {
		if (!localStorage.getItem("token")) {
			toast.error("로그인을 먼저 해주세요!");
			navigate("/signin");
		}
	}, []);

	return (
		<OuterWrap>
			<MainWrap>
				<TitleWrap>
					<Title>📝 ToDo List</Title>
				</TitleWrap>
				<InputWrap>
					<AddTaskInput
						data-testid="new-todo-input"
						type="text"
						placeholder="Click to add a new task ✔️"
						value={taskInput}
						onChange={handleTaskInput}
						onFocus={handleInputFocus}
						onBlur={handleInputFocus}
					/>
					<AddButton
						data-testid="new-todo-add-button"
						type="submit"
						isFocus={isFocus}
					>
						추가
					</AddButton>
				</InputWrap>
				<ListWrap>
					{toDoList.map((toDo) => (
						<ToDoItem key={toDo.id} {...toDo} />
					))}
				</ListWrap>
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
	grid-template-rows: 15% 15% 70%;
	width: 30%;
	min-width: 300px;
	height: 80%;
`;

const TitleWrap = styled.div`
	display: grid;
	place-items: center;
`;

const Title = styled.h1`
	font-size: 26px;
	font-weight: 500;
`;

const InputWrap = styled.form`
	position: relative;
	display: grid;
	place-items: center;
`;

const AddTaskInput = styled.input`
	position: relative;
	width: 100%;
	height: 40px;
	padding-left: 10px;
	outline: none;
	border: none;
	border-radius: 5px;

	&::placeholder {
		text-align: center;
		letter-spacing: 1.5px;
	}

	&:focus {
		border: 2px solid black;
		::placeholder {
			color: transparent;
		}
	}
`;

const AddButton = styled.button`
	position: absolute;
	right: 2%;
	width: 45px;
	height: 25px;
	border: none;
	border-radius: 5px;
	visibility: ${(props) => (props.isFocus ? "visible" : "hidden")};
	cursor: pointer;
`;

const ListWrap = styled.ul`
	padding: 10px;
	border: 1px solid #636e72;
	border-radius: 5px;
	overflow-y: scroll;
`;

export default ToDoList;

const toDoList = [
	{ id: 1, todo: "태스크1" },
	{ id: 2, todo: "태스크2" },
];
