import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import GlobalContext from "../Context/GlobalContext";

const Logout = () => {
	const { setIsAuthenticated, setUser } = useContext(GlobalContext);
	useEffect(() => {
		setIsAuthenticated(false);
		setUser(null);
		localStorage.setItem("isAuthenticated", false);
		localStorage.setItem("user", null);
	}, [setIsAuthenticated, setUser]);
	return <Navigate to="/login" />;
};

export default Logout;
