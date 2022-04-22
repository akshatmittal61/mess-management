import React from "react";
import Home from "./pages/Home/Home";
import AOS from "aos";
import "aos/dist/aos.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login/Login";
import Header from "./components/Header/Header";
import Register from "./pages/Register/Register";

const App = () => {
	AOS.init();
	const location = useLocation();
	return (
		<>
			{location.pathname !== "/" && <Header />}
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</>
	);
};

export default App;
