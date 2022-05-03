import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import {
	Card,
	CardContent,
	Container,
	FormControlLabel,
	Input,
	Switch,
	TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import GlobalContext from "../../Context/GlobalContext";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const UserDetails = ({ activeUser, close }) => {
	const [userDetail, setUserDetail] = React.useState({ ...activeUser });
	const [allowEdit, setAllowEdit] = React.useState(false);
	const { user, axiosInstance } = React.useContext(GlobalContext);
	const handleClose = () => {
		close();
	};
	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserDetail({
			...userDetail,
			[name]: name === "email" || name === "name" ? value : +value,
		});
	};
	const handleSubmit = async () => {
		console.log(userDetail);
		await axiosInstance.patch("/api/admin/editmess", {
			email: userDetail.email,
			messAdvance: userDetail.advance,
			dietPerDay: userDetail.daily,
			manDay: userDetail.man,
			specialLunch: userDetail.specials,
			name: userDetail.name
		});
	};
	return (
		<>
			<Dialog
				fullScreen
				onClose={handleClose}
				TransitionComponent={Transition}
				open
			>
				<AppBar sx={{ position: "relative" }}>
					<Toolbar>
						<IconButton
							edge="start"
							color="inherit"
							onClick={handleClose}
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
						<Typography
							sx={{ ml: 2, flex: 1 }}
							variant="h6"
							component="div"
						>
							{userDetail.name}
						</Typography>
						<Button
							autoFocus
							color="inherit"
							onClick={() => {
								handleSubmit();
								handleClose();
							}}
						>
							save
						</Button>
					</Toolbar>
				</AppBar>
				<Container component="section" sx={{ mt: 2, mb: 2 }}>
					<Container>
						<Typography variant="h4" sx={{ mt: 2, mb: 2 }}>
							{userDetail.name}
						</Typography>
					</Container>
					<Box>
						<Card>
							<CardContent>
								{user.isAdmin && (
									<Container
										component="div"
										sx={{
											width: "100%",
											display: "flex",
											justifyContent: "flex-end",
											alignItems: "center",
										}}
									>
										<FormControlLabel
											control={
												<Switch
													onChange={() =>
														setAllowEdit(!allowEdit)
													}
													checked={allowEdit}
												/>
											}
											label="Allow Editing"
										/>
									</Container>
								)}
								<Typography
									variant="h5"
									color="text.secondary"
									gutterBottom
								>
									<Box component="form">
										<Typography>Name: </Typography>
										<Input
											disabled={!allowEdit}
											name="name"
											value={userDetail.name}
											onChange={handleChange}
										/>
									</Box>
								</Typography>
								<Typography color="text.secondary" gutterBottom>
									<Box component="form">
										<Typography>Email: </Typography>
										<Input
											disabled={true}
											name="email"
											value={userDetail.email}
											onChange={handleChange}
										/>
									</Box>
								</Typography>
							</CardContent>
							<CardContent>
								<Box
									component="form"
									onSubmit={handleSubmit}
									sx={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										flexWrap: "wrap",
									}}
								>
									<TextField
										margin="normal"
										sx={{ width: "45%", mr: 1, ml: 1 }}
										type="number"
										name="advance"
										value={userDetail.advance}
										onChange={handleChange}
										id="advance"
										label="Mess Advance"
										disabled={!allowEdit}
									/>
									<TextField
										margin="normal"
										sx={{ width: "45%", mr: 1, ml: 1 }}
										type="number"
										name="daily"
										value={userDetail.daily}
										onChange={handleChange}
										id="daily"
										label="Daily Charge"
										disabled={!allowEdit}
									/>
									<TextField
										margin="normal"
										sx={{ width: "45%", mr: 1, ml: 1 }}
										type="number"
										name="man"
										value={userDetail.man}
										onChange={handleChange}
										id="man"
										label="MAN Day"
										disabled={!allowEdit}
									/>
									<TextField
										margin="normal"
										sx={{ width: "45%", mr: 1, ml: 1 }}
										type="number"
										name="specials"
										value={userDetail.specials}
										onChange={handleChange}
										id="specials"
										label="Specials"
										disabled={!allowEdit}
									/>
								</Box>
							</CardContent>
						</Card>
					</Box>
				</Container>
			</Dialog>
		</>
	);
};
export default UserDetails;
