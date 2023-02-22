const constants = require('../constants/constants')
const taskService = require('../service/taskService');
const { s3Upload, s3DeleteObject } = require("../utils/utils");

module.exports.getAllTasks = async (req, res) => {
    let response = { ...constants.defaultServerResponse }
    try {

        const resp = await taskService.getAllTasks(req.headers['authorization'])
        response.status = 200
        response.message = "All User Tasks"
        response.body = resp
    }
    catch (error) {

        response.message = error.message

    }

    return res.status(response.status).send(response)
}


module.exports.getSingleTask = async (req, res) => {
    let response = { ...constants.defaultServerResponse }

    try {

        const resp = await taskService.getSingleTask(req.params.id, req.headers['authorization'])
        response.status = 200
        response.message = "Get Single Task"
        response.body = resp
    }
    catch (error) {

        response.message = error.message

    }

    return res.status(response.status).send(response)


}


module.exports.editTasks = async (req, res) => {
    let response = { ...constants.defaultServerResponse }
    const { id } = req.params;


    try {

        const findTask = await taskService.getSingleTask(id, req.headers['authorization']);
        if (!findTask) {
            throw new Error(`400:: Task Not Found!`);
        }
        if (req.file) {
            let attachment = await s3Upload(req.file.path, req.file.mimetype, req.file.filename);
            req.body.attachment = attachment.Location;
        }

        const updateTaskData = await taskService.updateTask(id, req.body);

        const resp = await taskService.getSingleTask(req.params.id, req.headers['authorization'])
        response.status = 200
        response.message = "Get Updated Task"
        response.body = resp
    }
    catch (error) {

        response.message = error.message

    }
    return res.status(response.status).send(response)


}


module.exports.deleteTask = async (req, res) => {
    let response = { ...constants.defaultServerResponse }
    const { id } = req.params;


    try {

        const findTask = await taskService.getSingleTask(id, req.headers['authorization']);
        console.log(findTask)
        if (!findTask) {
            throw new Error(`400:: Task Not Found!`);
        }

        if(findTask.attachment){
            await s3DeleteObject(findTask.attachment);
        }

        const resp = await taskService.deleteTask(req.params.id, req.headers['authorization'])

        response.status = 200
        response.message = "Task deleted"
        response.body = resp
    }
    catch (error) {

        response.message = error.message

    }
    return res.status(response.status).send(response)

}



module.exports.createTask = async (req, res) => {
    let response = { ...constants.defaultServerResponse }

    try {
        // console.log("req")
        //  console.log(req)
        console.log(req.file)
        if (req.file) {
            let attachment = await s3Upload(req.file.path, req.file.mimetype, req.file.filename);
            req.body.attachment = attachment.Location;
        }
        console.log(req.body)
        const resp = await taskService.createTask(req.body, req.headers['authorization'])
        response.status = 200
        response.message = "Add New User Task"
        response.body = resp
    }
    catch (error) {

        response.message = error.message

    }

    return res.status(response.status).send(response)



}