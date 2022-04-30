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

const columns = [
	{ id: "roll", label: "Roll No", minWidth: 50, format: (value) => +value },
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

function createData(roll, name, daily, man, specials) {
	const advance = 19270;
	const balance = daily * man;
	const grand = balance + specials;
	const left = advance - grand;
	return {
		roll,
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

export default function Dashboard() {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [rows, setRows] = React.useState([
		createData(20107, "Akshat Mittal", 140, 20, 70),
		createData(20106, "Akshat Khosya", 140, 18, 70),
	]);
	React.useEffect(() => {
		setRows([
			...rows,
			createData(20154, "Saurabh", 140, 15, 80),
			createData(20138, "Mitali", 140, 18, 70),
		]);
	}, []);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};
	const [openDetails, setOpenDetails] = React.useState(false);
	const [openUser, setOpenUser] = React.useState(null);
	const handleOpenUser = (user) => {
		setOpenUser(user);
		setOpenDetails(true);
	};

	return (
		<Paper sx={{ width: "95%", overflow: "hidden", margin: "3rem auto" }}>
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
}
