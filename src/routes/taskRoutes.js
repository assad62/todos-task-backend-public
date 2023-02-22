const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController')
const tokenValidation = require('../middleware/tokenValidation')
const { upload } = require("../utils/utils");

//get all tasks
router.get('/tasks', tokenValidation.validateToken, taskController.getAllTasks)
//create tasks
router.post('/tasks', [tokenValidation.validateToken, upload.single('file')], taskController.createTask)
// //get single task
router.get('/tasks/:id', tokenValidation.validateToken, taskController.getSingleTask)
// //edit task
router.patch('/tasks/:id', [tokenValidation.validateToken, upload.single('file')], taskController.editTasks)
// //delete task
router.delete('/tasks/:id',taskController.deleteTask)



module.exports = router;