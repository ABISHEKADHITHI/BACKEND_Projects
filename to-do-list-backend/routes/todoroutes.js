const express = require("express")
const router = express.Router();
const ToDo = require("../models/tododb")

router
    .post("/", async (req, res) => {
        try {
            const task = new ToDo(req.body);
            await task.save();
            res.status(201).json( task )
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    })

    .get("/", async (req, res) => {
        try {
            const { status } = req.query;
            const filter = status ? { status } : {}
            const tasks = await ToDo.find(filter);
            res.json(tasks);
        }
        catch (err) {
            res.status(500).json({ error: err.message })
        }
    })
    .get("/:id", async (req, res) => {
        try {
            const task = await ToDo.findById(req.params.id);
            if (!task) {
                return res.status(404).json({ errormessage: "Task not found"})
            }
            res.json(task);
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    })
    .put("/:id", async (req, res) => {
        try{
            const updatetask = await ToDo.findByIdAndUpdate(req.params.id, req.body, { new:true } );
            if (!updatetask) {
                return res.status(404).json({ errormessage: "Task not found"})
            }
            res.json(updatetask);
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    })
    .delete("/:id", async (req, res) => {
        try{
            const deletedtask = await ToDo.findByIdAndDelete(req.params.id);
            if (!deletedtask) {
                return res.status(404).json({ errormessage: "Task not found"})
            }
            res.json({ message: "task deleted sucessfully" });
        }
        catch (err) {
            if (err.name === "CastError") {
                return res.status(400).json({ errorMessage: "Invalid task ID" });
            }
            res.status(500).json({ error: err.message });
        }
    })

module.exports = router;