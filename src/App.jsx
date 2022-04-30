import React, { useContext } from "react";
import Home from "./pages/Home/Home";
import AOS from "aos";
import "aos/dist/aos.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login/Login";
import Header from "./components/Header/Header";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Logout from "./components/Logout";
import User from "./pages/User/User";
import GlobalContext from "./Context/GlobalContext";

const App = () => {
	AOS.init();
	const location = useLocation();
	const { user } = useContext(GlobalContext);
	return (
		<>
			{location.pathname !== "/" &&
				location.pathname !== "/login" &&
				location.pathname !== "/register" && <Header />}
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route
					path="/dashboard"
					element={
						<PrivateRoute>
							{user && (user.isAdmin ? <Dashboard /> : <User />)}
						</PrivateRoute>
					}
				/>
				{/* <Route path="/user/:id" element={<User />} /> */}
				<Route
					path="/logout"
					element={
						<PrivateRoute>
							<Logout />
						</PrivateRoute>
					}
				/>
			</Routes>
		</>
	);
};

export default App;
