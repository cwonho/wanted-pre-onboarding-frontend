import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import ToDoItem from "./components/ToDoItem";
import API from "../../api";

const ToDoList = () => {
	const [taskInput, setTaskInput] = useState("");
	const [toDoList, setToDoList] = useState([]);

	const navigate = useNavigate();

	const handleTaskInput = (e) => {
		setTaskInput(e.target.value);
	};

	const getToDoList = () => {
		fetch(`${API.TODOS}`, {
			method: "GET",
			headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
		})
			.then((res) => res.json())
			.then((data) => {
				if (data) {
					setToDoList(data);
				} else {
					toast.error("태스크 데이터를 불러오지 못했습니다.");
				}
			});
	};

	const createToDoItem = () => {
		if (taskInput.length === 0) {
			toast.error("한글자 이상 입력해주세요.");
			return;
		}

		fetch(`${API.TODOS}`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ todo: taskInput }),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.todo) {
					toast.success("태스크가 등록되었습니다!");
					getToDoList();
					setTaskInput("");
				} else {
					toast.error("태스크 등록 실패!");
				}
			});
	};

	const deleteToDoItem = useCallback((id) => {
		fetch(`${API.TODOS}/${id}`, {
			method: "DELETE",
			headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
		}).then((res) => {
			if (res.status === 204) {
				toast.success("태스크가 삭제되었습니다.");
				getToDoList();
			} else {
				toast.error("태스크 삭제를 실패하였습니다.");
			}
		});
	}, []);

	const updateToDoItem = useCallback((id, todo, isCompleted, status) => {
		fetch(`${API.TODOS}/${id}`, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ todo: todo, isCompleted: isCompleted }),
		}).then((res) => {
			if (res.status === 200) {
				toast.success(`태스크가 ${status}`);
				getToDoList();
			} else {
				toast.success("태스크 수정을 실패하였습니다.");
			}
		});
	}, []);

	const handleEnterSubmit = (e) => {
		if (e.keyCode === 13) {
			document.getElementById("add-button").click();
		}
		return;
	};

	useEffect(() => {
		if (!localStorage.getItem("token")) {
			toast.error("로그인을 먼저 해주세요!");
			navigate("/signin");
		}
		getToDoList();
	}, []);

	useEffect(() => {
		const titleElement = document.getElementsByTagName("title")[0];
		titleElement.innerHTML = "투두리스트";
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
						onKeyDown={handleEnterSubmit}
					/>
					<AddButton
						data-testid="new-todo-add-button"
						id="add-button"
						onClick={createToDoItem}
					>
						추가
					</AddButton>
				</InputWrap>
				<ListWrap>
					{toDoList.map((toDo) => (
						<ToDoItem
							key={toDo.id}
							{...toDo}
							deleteToDoItem={deleteToDoItem}
							updateToDoItem={updateToDoItem}
						/>
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
	height: 100vh;
`;

const MainWrap = styled.div`
	display: grid;
	grid-template-rows: 15% 15% 70%;
	width: 30%;
	min-width: 300px;
	height: 80vh;
`;

const TitleWrap = styled.div`
	display: grid;
	place-items: center;
`;

const Title = styled.h1`
	font-size: 26px;
	font-weight: 500;
`;

const InputWrap = styled.div`
	position: relative;
	display: flex;
	align-items: center;
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
	cursor: pointer;
`;

const ListWrap = styled.ul`
	padding: 10px;
	border: 1px solid #636e72;
	border-radius: 5px;
	overflow-y: scroll;
`;

export default ToDoList;
