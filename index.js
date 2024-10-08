const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const fs = require("fs");

const port = process.env.PORT || 3030;

app.use(express.json())
app.use(cors({ origin: true, methods: "GET,HEAD,POST,PUT,PATCH,DELETE", credentials: true }));

const Routes = require("./routes");

app.use("/", Routes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});