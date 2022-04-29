import * as React from "react";
import { Avatar, Button, CssBaseline, IconButton } from "@mui/material";
import { TextField, Grid, Box, Typography, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ArrowBack, Lock } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import GlobalContext from "../../Context/GlobalContext";

const theme = createTheme();

export default function Login() {
	const navigate = useNavigate();
	const { isAuthenticated, setIsAuthenticated, setUser } =
		React.useContext(GlobalContext);
	const [loginUser, setLoginUser] = React.useState({
		email: "",
		password: "",
	});
	const handleChange = (e) => {
		const { name, value } = e.target;
		setLoginUser({
			...loginUser,
			[name]: value,
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(loginUser);
		setLoginUser({
			email: "",
			password: "",
		});
		setIsAuthenticated(true);
		const newUser = {
			name: "Akshat Mittal",
			status: "Developing",
			email: "akshatmittal2506@gmail.com",
			phone: 9456849466,
			username: "akshatmittal61",
			batch: "2020",
			bio: "MERN Stack developer",
			currentOrganization: "MERN",
			desgination: "MERN Stack Developer",
			dob: "2002-06-25",
			gender: "Male",
			avatar: "https://avatars.githubusercontent.com/u/84612609?v=4",
			isAdmin: false,
		};
		setUser(newUser);
		localStorage.setItem("user", JSON.stringify(newUser));
		localStorage.setItem("isAuthenticated", true);
	};
	React.useEffect(() => {
		if (isAuthenticated) {
			navigate("/dashboard");
		}
	}, [isAuthenticated, navigate]);
	return (
		<ThemeProvider theme={theme}>
			<Container
				component="header"
				sx={{
					margin: "2rem 0",
				}}
			>
				<IconButton size="large" onClick={() => navigate(-1)}>
					<ArrowBack />
				</IconButton>
			</Container>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<Lock />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 1 }}
					>
						<TextField
							margin="normal"
							required
							fullWidth
							name="email"
							label="Email Address"
							type="email"
							id="email"
							autoComplete="email"
							value={loginUser.email}
							onChange={handleChange}
							autoFocus
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							value={loginUser.password}
							onChange={handleChange}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item>
								<Link to="/register">
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
