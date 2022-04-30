import React, { useState, createContext } from "react";
import axios from "axios";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
	const isLocalAuthenticated = localStorage.getItem("isAuthenticated");
	const [isAuthenticated, setIsAuthenticated] = useState(
		JSON.parse(isLocalAuthenticated)
	);
	const [isLoading, setIsLoading] = useState(false);
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem("user")) || null
	);
	const axiosInstance = axios.create({
		baseURL: "http://localhost:5000/",
	});
	return (
		<GlobalContext.Provider
			value={{
				isAuthenticated,
				setIsAuthenticated,
				isLoading,
				setIsLoading,
				axiosInstance,
				user,
				setUser,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalContext;
