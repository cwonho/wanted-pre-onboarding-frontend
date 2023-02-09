import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router";
import GlobalStyle from "./styles/GlobalStyle";
import { ToastContainer } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";

const root = ReactDOM.createRoot(document.getElementById("root"));

if (typeof window !== "undefined") {
	injectStyle();
}

root.render(
	<>
		<GlobalStyle />
		<ToastContainer autoClose={2000} />
		<Router />
	</>
);
