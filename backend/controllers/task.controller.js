const Task = require('../models/Task');


// CREATE TASK
exports.createTask = async (req, res) => {

    try {

        const {
            title,
            description,
            dueDate,
            priority,
            assignedTo,
            projectId
        } = req.body;

        const task = await Task.create({
            title,
            description,
            dueDate,
            priority,
            assignedTo,
            projectId
        });

        res.status(201).json({
            message: 'Task created successfully',
            task
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// GET ALL TASKS
exports.getTasks = async (req, res) => {

    try {

        const tasks = await Task.find()
            .populate('assignedTo', 'name email')
            .populate('projectId', 'projectName');

        res.status(200).json({
            tasks
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// UPDATE TASK STATUS
exports.updateTaskStatus = async (req, res) => {

    try {

        const { id } = req.params;

        const { status } = req.body;

        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        res.status(200).json({
            message: 'Task status updated',
            updatedTask
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// DELETE TASK
exports.deleteTask = async (req, res) => {

    try {

        const { id } = req.params;

        await Task.findByIdAndDelete(id);

        res.status(200).json({
            message: 'Task deleted successfully'
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
// DASHBOARD ANALYTICS
exports.getDashboardAnalytics = async (req, res) => {

    try {

        // Total tasks
        const totalTasks = await Task.countDocuments();

        // Completed tasks
        const completedTasks = await Task.countDocuments({
            status: 'Done'
        });

        // In Progress tasks
        const inProgressTasks = await Task.countDocuments({
            status: 'In Progress'
        });

        // Pending tasks
        const pendingTasks = await Task.countDocuments({
            status: 'To Do'
        });

        // Overdue tasks
        const overdueTasks = await Task.countDocuments({
            dueDate: { $lt: new Date() },
            status: { $ne: 'Done' }
        });

        res.status(200).json({

            totalTasks,
            completedTasks,
            inProgressTasks,
            pendingTasks,
            overdueTasks

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};