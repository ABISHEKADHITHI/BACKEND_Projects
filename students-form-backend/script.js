const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const studentRoute = require("./routes/studentroute")

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/studentsdb")
.then(() => console.log("mongodb connected"))
.catch(err => console.log(err));

app.use("/api/students", studentRoute)

app.listen(3000, () => {
    console.log("server is running on http://localhost:3000")
});
