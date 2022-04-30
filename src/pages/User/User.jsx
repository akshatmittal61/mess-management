/* import { Card, Container } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'

const User = () => {
	return (
		<>
    <Container component='section'>
        <Card>
            {id}
        </Card>
        </Container>
    </>
  )
}

export default User */

import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Container, TextField } from "@mui/material";
import GlobalContext from "../../Context/GlobalContext";
import { Box } from "@mui/system";

export default function User() {
	const { user } = React.useContext(GlobalContext);
	console.log(user);
	const advance = 19270;
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
					<Typography variant="body2" color="text.secondary">
						This impressive paella is a perfect party dish and a fun
						meal to cook together with your guests. Add 1 cup of
						frozen peas along with the mussels, if you like.
					</Typography>

					<Box
						component="section"
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
							value={advance}
							id="advance"
							label="Mess Advance"
							disabled={true}
						/>
						<TextField
							margin="normal"
							sx={{ width: "45%", mr: 1, ml: 1 }}
							type="number"
							name="daily"
							value={user.daily}
							id="daily"
							label="Daily Charge"
							disabled={true}
						/>
						<TextField
							margin="normal"
							sx={{ width: "45%", mr: 1, ml: 1 }}
							type="number"
							name="man"
							value={user.man}
							id="man"
							label="MAN Day"
							disabled={true}
						/>
						<TextField
							margin="normal"
							sx={{ width: "45%", mr: 1, ml: 1 }}
							type="number"
							name="specials"
							value={user.specials}
							id="specials"
							label="Specials"
							disabled={true}
						/>
					</Box>
				</CardContent>
			</Card>
		</Container>
	);
}
