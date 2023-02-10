import React, { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

const ToDoItem = ({
	id,
	isCompleted,
	todo,
	deleteToDoItem,
	updateToDoItem,
}) => {
	const [isEdit, setIsEdit] = useState(false);
	const [editContent, setEditContent] = useState(todo);

	const handleDelete = () => {
		deleteToDoItem(id);
	};

	const toggleIsEdit = () => {
		setIsEdit(!isEdit);
	};

	const handleCompleteCheck = () => {
		if (!isCompleted) {
			updateToDoItem(id, todo, !isCompleted, "완료되었습니다.");
		} else {
			updateToDoItem(id, todo, !isCompleted, "재개되었습니다.");
		}
	};

	const handleEditInput = (e) => {
		setEditContent(e.target.value);
	};

	const handleEditSubmit = () => {
		if (editContent.length === 0) {
			toast.error("한글자 이상 입력해주세요.");
			return;
		}

		if (editContent === todo) {
			toggleIsEdit();
			return;
		}

		updateToDoItem(id, editContent, isCompleted, "수정되었습니다.");
		toggleIsEdit();
	};

	const handleEditCancel = () => {
		setIsEdit(false);
		setEditContent(todo);
	};

	const handleEnterSubmit = (e) => {
		if (e.keyCode === 13) {
			document.getElementById("edit-button").click();
		}
		return;
	};

	return (
		<>
			<ItemWrap>
				<LabelWrap>
					{isEdit ? (
						<EditInput
							type="text"
							data-testid="modify-input"
							value={editContent}
							onChange={handleEditInput}
							onKeyDown={handleEnterSubmit}
						/>
					) : (
						<>
							<CompleteBox
								type="checkbox"
								defaultChecked={isCompleted}
								onClick={handleCompleteCheck}
							/>
							<Item>{todo}</Item>
						</>
					)}
				</LabelWrap>
				<ManageWrap>
					{isEdit ? (
						<>
							<EditButton
								data-testid="submit-button"
								id="edit-button"
								onClick={handleEditSubmit}
							>
								제출
							</EditButton>
							<DeleteButton
								data-testid="cancel-button"
								onClick={handleEditCancel}
							>
								취소
							</DeleteButton>
						</>
					) : (
						<>
							<EditButton data-testid="modify-button" onClick={toggleIsEdit}>
								수정
							</EditButton>
							<DeleteButton data-testid="delete-button" onClick={handleDelete}>
								삭제
							</DeleteButton>
						</>
					)}
				</ManageWrap>
			</ItemWrap>
		</>
	);
};

const ItemWrap = styled.li`
	display: flex;
	align-items: center;
	height: 50px;
	padding: 0 20px;
`;

const LabelWrap = styled.label`
	position: relative;
	display: flex;
	flex: 1;
	align-items: center;
`;

const EditInput = styled.input`
	position: relative;
	width: 90%;
	height: 30px;
	padding-left: 10px;
	border: 1px solid #636e72;
	border-radius: 5px;
	outline: none;
`;

const CompleteBox = styled.input`
	&:checked {
		accent-color: black;
	}
`;

const Item = styled.p`
	width: 100%;
	margin-left: 10px;
`;

const ManageWrap = styled.div`
	display: flex;
	align-items: center;
`;

const EditButton = styled.button`
	width: 45px;
	height: 25px;
	border: none;
	border-radius: 5px;
	cursor: pointer;
`;

const DeleteButton = styled(EditButton)`
	margin-left: 5px;
`;

export default React.memo(ToDoItem);
