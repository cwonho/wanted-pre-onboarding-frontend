import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ToDoList = () => {
	const navigate = useNavigate();

	useEffect(() => {
		if (!localStorage.getItem("token")) {
			navigate("/signin");
		}
	}, []);

	return <div></div>;
};

export default ToDoList;
