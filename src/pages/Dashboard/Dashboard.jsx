import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import UserDetails from "../../components/UserDetails/UserDetails";
import GlobalContext from "../../Context/GlobalContext";
import LinearProgress from "@mui/material/LinearProgress";

const columns = [
	{ id: "email", label: "Email", minWidth: 50, format: (value) => value },
	{ id: "name", label: "Name", minWidth: 70 },
	{
		id: "advance",
		label: "Mess Advance",
		minWidth: 70,
		align: "right",
	},
	{
		id: "daily",
		label: "Daily Charge",
		minWidth: 70,
		align: "right",
	},
	{
		id: "man",
		label: "MAN Day",
		minWidth: 70,
		align: "right",
	},
	{
		id: "balance",
		label: "Total Balance",
		minWidth: 70,
		align: "right",
	},
	{
		id: "specials",
		label: "Specials",
		minWidth: 70,
		align: "right",
	},
	{
		id: "grand",
		label: "Grand Total",
		minWidth: 120,
		align: "right",
	},
	{
		id: "left",
		label: "Left Balance",
		minWidth: 70,
		align: "right",
	},
];

function createData(email, name, advance, daily, man, specials) {
	const balance = daily * man;
	const grand = balance + specials;
	const left = advance - grand;
	return {
		email,
		name,
		advance,
		daily,
		man,
		balance,
		specials,
		grand,
		left,
	};
}

const Dashboard = () => {
	const { axiosInstance } = React.useContext(GlobalContext);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [rows, setRows] = React.useState([]);
	const [openDetails, setOpenDetails] = React.useState(false);
	const [openUser, setOpenUser] = React.useState(null);
	const [isLoading, setisLoading] = React.useState(true);
	const getPersonDetails = async (email, config) => {
		const personDetails = await axiosInstance.post(
			"/api/admin/profile",
			{
				email: email,
			},
			config
		);
		return personDetails;
	};
	const getAllData = async () => {
		const config = {
			headers: {
				"x-auth-token": localStorage.getItem("token"),
			},
		};
		const response = await axiosInstance.get(
			"/api/admin/getMessDetails",
			config
		);
		const { details } = response.data.errors[0];
		setRows([]);
		details.forEach((person) => {
			getPersonDetails(person.email, config)
				.then((res) => {
					return res.data;
				})
				.then((data) => {
					const personDetails = data.errors[0];
					setRows([
						...rows,
						createData(
							person.email,
							personDetails.details.name,
							person.messAdvance,
							person.dietPerDay,
							person.manDay,
							person.specialLunch
						),
					]);
				});
		});
	};
	React.useEffect(() => {
		getAllData();
	}, [openDetails]);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};
	const handleOpenUser = (user) => {
		setOpenUser(user);
		setOpenDetails(true);
	};

	return (
		<Paper
			sx={{
				width: window.innerWidth > 880 ? "95%" : "99%",
				overflow: "hidden",
				margin: "3rem auto",
			}}
		>
			<TableContainer sx={{ maxHeight: 440 }}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth }}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					{isLoading && <LinearProgress />}
					<TableBody>
						{rows
							.slice(
								page * rowsPerPage,
								page * rowsPerPage + rowsPerPage
							)
							.map((row, index) => {
								return (
									<TableRow
										hover
										role="checkbox"
										tabIndex={-1}
										key={index}
										onClick={() => handleOpenUser(row)}
									>
										{columns.map((column) => {
											const value = row[column.id];
											return (
												<TableCell
													key={column.id}
													align={column.align}
												>
													{column.format &&
													typeof value === "number"
														? column.format(value)
														: value}
												</TableCell>
											);
										})}
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
			{openDetails && (
				<UserDetails
					activeUser={openUser}
					close={() => setOpenDetails(false)}
				/>
			)}
		</Paper>
	);
};
export default Dashboard;
