const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
    },
    attachment: {
      type: String,
    },
    completeBy: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TaskModel = mongoose.model("tasks", TaskSchema);

module.exports = TaskModel;
