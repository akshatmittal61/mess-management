import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { IconButton, Snackbar } from "@mui/material";
import { ArrowBack, Close, Lock } from "@mui/icons-material";
import GlobalContext from "../../Context/GlobalContext";

const theme = createTheme();

export default function Register() {
	const navigate = useNavigate();
	const { axiosInstance } = React.useContext(GlobalContext);
	const [user, setUser] = React.useState({
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [open, setOpen] = React.useState(false);
	const [snackMessage, setSnackMessage] = React.useState("");
	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
	};
	const handleChange = (e) => {
		const { name, value } = e.target;
		setUser({
			...user,
			[name]: value,
		});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (user.password !== user.confirmPassword) {
			setSnackMessage("Passwords do not match");
			setOpen(true);
			setTimeout(() => {
				setOpen(false);
			}, 5000);
			setUser({
				...user,
				confirmPassword: "",
			});
		} else {
			try {
				const response = await axiosInstance.patch(
					"/api/auth/register",
					{
						email: user.email,
						password: user.password,
					}
				);
				const { status } = response;
				console.log(status);
				setSnackMessage(response.errors[0].message);
				setOpen(true);
				setTimeout(() => {
					setOpen(false);
				}, 5000);
			} catch (error) {
				const { data } = error.response;
				setSnackMessage(data.errors[0].message);
				setOpen(true);
				setTimeout(() => {
					setOpen(false);
				}, 5000);
			}
			setUser({
				email: "",
				password: "",
				confirmPassword: "",
			});
		}
	};

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
						Sign up
					</Typography>
					<Box
						component="form"
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 3 }}
					>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									value={user.email}
									onChange={handleChange}
									autoComplete="email"
									autoFocus
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									value={user.password}
									onChange={handleChange}
									autoComplete="new-password"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="confirmPassword"
									label="Confirm Password"
									type="password"
									id="confirmPassword"
									value={user.confirmPassword}
									onChange={handleChange}
									autoComplete="new-password"
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign Up
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<Link to="/login">
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
			<Snackbar
				open={open}
				autoHideDuration={6000}
				onClose={handleClose}
				message={snackMessage}
				action={
					<IconButton
						size="small"
						aria-label="close"
						color="inherit"
						onClick={handleClose}
					>
						<Close fontSize="small" />
					</IconButton>
				}
			/>
		</ThemeProvider>
	);
}
