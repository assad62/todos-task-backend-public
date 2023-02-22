const Tasks = require('../models/taskModel')
const utills = require('../utils/utils')


module.exports.getSingleTask = async (_id) => {
  try {

    const tasks = await Tasks.findById({ _id });

    if (!tasks) {
      throw new Error();
    }

    return tasks
  }
  catch (error) {
    throw new Error(error)
  }

}



module.exports.getAllTasks = async (authToken) => {

  try {

    const userId = utills.getUserId(authToken)
    const tasks = await Tasks.find({ userId });
    if (!tasks) {
      throw new Error();
    }

    return tasks



  } catch (error) {

    throw new Error(error);
  }



}


module.exports.createTask = async (task, authToken) => {

  try {
    const userId = utills.getUserId(authToken)
    const { title, description, lat, lng, completeBy, attachment,completed } = task
   

    const newTask = new Tasks({
      userId,
      title,
      description,
      lat,
      lng,
      attachment,
      completeBy,
      completed
    });
    let result = await newTask.save();


    if (!result) {
      throw new Error();
    }

    return {
      "status": "Task added succesfully"
    }
  }
  catch (error) {
    throw new Error(error)
  }

}


module.exports.updateTask = async (_id, updateData) => {
  try {

    const updateTask = await Tasks.findOneAndUpdate({ _id: _id }, updateData)

    return updateTask
  }
  catch (error) {
    throw new Error(error)
  }

}

module.exports.deleteTask = async (_id) => {
  try {

    const removeTask = await Tasks.deleteOne({ _id });

    return removeTask;
  }
  catch (error) {
    throw new Error(error)
  }

}