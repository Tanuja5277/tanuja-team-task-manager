const Project = require('../models/Project');


// CREATE PROJECT
exports.createProject = async (req, res) => {

    try {

        const { projectName, description } = req.body;

        const project = await Project.create({

            projectName,
            description,

            // Logged in user becomes admin
            admin: req.user.id,

            // Add creator as first member
            members: [req.user.id]

        });

        res.status(201).json({
            message: 'Project created successfully',
            project
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};