const express = require("express");

const router = express.Router();

const Task = require("../models/Task");

// CREATE TASK

router.post("/create", async (req, res) => {

    try {

        const {
            title,
            description,
            priority,
            dueDate
        } = req.body;

        const newTask = new Task({
            title,
            description,
            priority,
            dueDate
        });

        await newTask.save();

        res.status(201).json({
            success: true,
            message: "Task Created",
            task: newTask
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// GET TASKS

router.get("/", async (req, res) => {

    try {

        const tasks = await Task.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            tasks
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// DELETE TASK

router.delete("/:id", async (req, res) => {

    try {

        await Task.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Task Deleted"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
router.put("/complete/:id", async (req, res) => {

    try {

        const task = await Task.findById(req.params.id);

        task.completed = !task.completed;

        await task.save();

        res.status(200).json({
            success: true,
            message: "Task Updated"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
module.exports = router;