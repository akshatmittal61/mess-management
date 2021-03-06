const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

dotenv.config();
const corsOptions = {
	origin: "*",
	credentials: true,
	optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

// MongoDb connection
mongoose.connect(
	process.env.MONGO_URL,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	function (err) {
		if (err) {
			console.log(err);
		} else {
			console.log("Database Connected");
		}
	}
);

// // routes
const auth = require("./routes/auth");
const admin = require("./routes/admin");

// //routes use
app.use("/api/admin", admin);
app.use("/api/auth", auth);

// if (process.env.NODE_ENV === "production") {
	app.use(express.static("build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "build", "index.html"));
	});
// }

const PORT=process.env.PORT||4000

app.listen(PORT, () => {
	console.log("Server started at port " + PORT);
});
