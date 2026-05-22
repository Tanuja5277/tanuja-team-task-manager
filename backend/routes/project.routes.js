const express = require('express');

const router = express.Router();

const projectController = require('../controllers/project.controller');

const { auth } = require('../middleware/auth.middleware');


// Create Project
router.post('/create', auth, projectController.createProject);

module.exports = router;