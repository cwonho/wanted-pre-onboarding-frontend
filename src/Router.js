import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginSignup from "./pages/LoginSignup";
import ToDoList from "./pages/ToDoList";

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LoginSignup />} />
				<Route path="/todo" element={<ToDoList />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
