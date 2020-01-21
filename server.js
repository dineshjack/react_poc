const express = require("express");
const dbConnection = require("./config/db")

const app = express();

//connect db
dbConnection();

//init middleware or for bodyparser
app.use(express.json({ extended : false }));

//api Routes
app.use('/api/user',require('./routes/api/user'));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));