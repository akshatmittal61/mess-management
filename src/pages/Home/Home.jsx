import React from "react";
import "./home.css";
import building from "../../images/building.jpg";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();
	return (
		<section
			className="home"
			style={{
				backgroundImage: `url(${building})`,
			}}
		>
			<div className="home-content" data-aos="zoom-in">
				<div className="home-title">
					<span>Indian Institue of Information Technology, Una</span>
				</div>
				<div className="home-subtitle">
					<span>Mess Management</span>
				</div>
				<div className="home-buttons">
					<Button
						onClick={() => navigate("/login")}
						variant="contained"
					>
						Login
					</Button>
					<Button
						onClick={() => navigate("/register")}
						variant="contained"
					>
						Register
					</Button>
				</div>
			</div>
		</section>
	);
};

export default Home;
