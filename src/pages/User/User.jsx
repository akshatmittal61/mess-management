import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Container, InputLabel, TextField } from "@mui/material";
import GlobalContext from "../../Context/GlobalContext";
import { Box } from "@mui/system";

export default function User() {
	const { user, axiosInstance } = React.useContext(GlobalContext);
	const [userDetails, setUserDetails] = React.useState({
		...user,
	});
	const getDetails = async () => {
		const response = await axiosInstance.get(
			"/api/admin/singleMessDetails"
		);
		const { dietPerDay, manDay, messAdvance, specialLunch } =
			response.data.errors[0].details;
		setUserDetails({
			...user,
			daily: dietPerDay,
			man: manDay,
			advance: messAdvance,
			specials: specialLunch,
			balance: dietPerDay * manDay,
			grand: dietPerDay * manDay + specialLunch,
			left: messAdvance - (dietPerDay * manDay + specialLunch),
		});
	};
	React.useEffect(() => {
		getDetails();
	}, []);
	return (
		<Container
			component="main"
			sx={{
				width: "100vw",
				height: "calc(100vh - 4.5rem)",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Card sx={{ maxWidth: window.innerWidth / 1.5 }}>
				<CardHeader
					avatar={<Avatar src={user.avatar} alt={user.name} />}
					title={user.name}
					subheader={user.email}
				/>
				<CardContent>
					<Box
						component="section"
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							flexWrap: "wrap",
						}}
					>
						<InputLabel>Mess Advance</InputLabel>
						<TextField
							margin="normal"
							sx={{ width: "45%", mr: 1, ml: 1 }}
							type="number"
							name="advance"
							value={userDetails.advance}
							id="advance"
							placeholder="Mess Advance"
							disabled={true}
						/>
						<TextField
							margin="normal"
							sx={{ width: "45%", mr: 1, ml: 1 }}
							type="number"
							name="daily"
							value={userDetails.daily}
							id="daily"
							label="Daily Charge"
							disabled={true}
						/>
						<TextField
							margin="normal"
							sx={{ width: "45%", mr: 1, ml: 1 }}
							type="number"
							name="man"
							value={userDetails.man}
							id="man"
							label="MAN Day"
							disabled={true}
						/>
						<TextField
							margin="normal"
							sx={{ width: "45%", mr: 1, ml: 1 }}
							type="number"
							name="specials"
							value={userDetails.specials}
							id="specials"
							label="Specials"
							disabled={true}
						/>
						<TextField
							margin="normal"
							sx={{ width: "45%", mr: 1, ml: 1 }}
							type="number"
							name="advance"
							value={userDetails.advance}
							id="advance"
							label="Advance"
							disabled={true}
						/>
						<TextField
							margin="normal"
							sx={{ width: "45%", mr: 1, ml: 1 }}
							type="number"
							name="balance"
							value={userDetails.balance}
							id="balance"
							label="Balance"
							disabled={true}
						/>
						<TextField
							margin="normal"
							sx={{ width: "45%", mr: 1, ml: 1 }}
							type="number"
							name="grand"
							value={userDetails.grand}
							id="grand"
							label="Grand"
							disabled={true}
						/>
						<TextField
							margin="normal"
							sx={{ width: "45%", mr: 1, ml: 1 }}
							type="number"
							name="left"
							value={userDetails.left}
							id="left"
							label="Left"
							disabled={true}
						/>
					</Box>
				</CardContent>
			</Card>
		</Container>
	);
}
