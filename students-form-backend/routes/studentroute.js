const express = require("express");
const router = express.Router();
const Student = require("../models/studentmodel");

router.post("/", async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json( student )
    }
    catch (err) {
        res.status(400).json( { error: err.message})
    }
})

router.get("/", async (req,res) => {
    try {
        const students = await Student.find();
        res.json(students);
    }
    catch (err) {
        res.status(500).json({ error: err.message})
    }
})

router.get("/:id", async (req,res) => {
    try {
        const student = await Student.findById(req.params.id);
        if(!student) {
            return res.status(404).json({ errormessage: "Student not found" })
        }
        res.json(student);
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.put("/:id", async (req, res) => {
    try {
        const updatestudent = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if(!updatestudent){
             return res.status(404).json({ errormessage: "Student not found" })
        }
        res.json(updatestudent)
    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return res.status(404).json({ errorMessage: "Student not found" });
        }
        res.json({ message: "Student deleted successfully" });
    } 
    catch (err) {
        if (err.name === "CastError") {
            return res.status(400).json({ errorMessage: "Invalid student ID" });
        }
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;