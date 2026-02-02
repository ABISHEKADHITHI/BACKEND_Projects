const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const todoroute = require("./routes/todoroutes")

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/tododb")
.then(() => console.log('mongodb connected'))
.catch( err => console.log(err));

app.use("/api/todolist", todoroute)

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000")
});
