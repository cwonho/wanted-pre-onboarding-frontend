import styled from "styled-components";

const ToDoItem = ({ todo }) => {
	return (
		<ItemWrap>
			<LabelWrap>
				<CompleteBox type="checkbox" />
				<Item>{todo}</Item>
			</LabelWrap>
			<ManageWrap>
				<EditButton>수정</EditButton>
				<DeleteButton>삭제</DeleteButton>
			</ManageWrap>
		</ItemWrap>
	);
};

const ItemWrap = styled.li`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 50px;
	padding: 0 20px;
`;

const LabelWrap = styled.label`
	display: flex;
	align-items: center;
`;

const CompleteBox = styled.input``;

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

export default ToDoItem;
