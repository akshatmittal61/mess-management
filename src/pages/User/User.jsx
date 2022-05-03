import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import {
	Container,
	InputLabel,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
} from "@mui/material";
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
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Label</TableCell>
									<TableCell>Amount</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								<TableRow>
									<TableCell>
										<Typography>Mess Advance</Typography>
									</TableCell>
									<TableCell>
										<Typography>
											{userDetails.advance}
										</Typography>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>
										<Typography>MAN Day</Typography>
									</TableCell>
									<TableCell>
										<Typography>
											{userDetails.man}
										</Typography>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>
										<Typography>Specials</Typography>
									</TableCell>
									<TableCell>
										<Typography>
											{userDetails.specials}
										</Typography>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>
										<Typography>Balance</Typography>
									</TableCell>
									<TableCell>
										<Typography>
											{userDetails.balance}
										</Typography>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>
										<Typography>Grand Total</Typography>
									</TableCell>
									<TableCell>
										<Typography>
											{userDetails.grand}
										</Typography>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>
										<Typography>
											Total Amount Left
										</Typography>
									</TableCell>
									<TableCell>
										<Typography>
											{userDetails.left}
										</Typography>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>
										<Typography>Mess Advance</Typography>
									</TableCell>
									<TableCell>
										<Typography>
											{userDetails.advance}
										</Typography>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				</CardContent>
			</Card>
		</Container>
	);
}
