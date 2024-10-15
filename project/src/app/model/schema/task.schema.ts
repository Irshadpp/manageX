import mongoose, { Schema } from "mongoose";
import { DurationType, Priority, ProjectStatus } from "../enum";
import { TaskAttrs, TaskModel } from "../task.model";
import { toJSONPlugin } from "../plugins/to-json";

// Define the schemas
const attachmentSchema = new mongoose.Schema({
    title: String,
    description: String,
    user: { type: Schema.Types.ObjectId, ref: "User" },
    attachments: [String],
});

const subTaskSchema = new mongoose.Schema({
    title: String,
    status: { type: String, default: ProjectStatus.PLANNING },
    duration: {
        length: Number,
        durationType: { type: String, default: DurationType.MINUTES },
    },
});

const replaySchema = new mongoose.Schema({
    text: String,
    user: { type: Schema.Types.ObjectId, ref: "User" },
});

const commentSchema = new mongoose.Schema({
    text: String,
    user: { type: Schema.Types.ObjectId, ref: "User" },
    replays: [replaySchema],
});

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    projectId: String,
    organizationId: String,
    startDate: Date,
    dueDate: Date,
    status: { type: String, default: ProjectStatus.PLANNING },
    priority: { type: String, default: Priority.LOW },
    assignee: { type: Schema.Types.ObjectId, ref: "User" },
    attachments: [attachmentSchema],
    subTasks: [subTaskSchema],
    comments: [commentSchema],
});

attachmentSchema.plugin(toJSONPlugin);
subTaskSchema.plugin(toJSONPlugin);
replaySchema.plugin(toJSONPlugin);
commentSchema.plugin(toJSONPlugin);
taskSchema.plugin(toJSONPlugin);

taskSchema.statics.build = (attrs: TaskAttrs) => {
    return new Task(attrs);
};

const Task = mongoose.model<TaskAttrs, TaskModel>("Task", taskSchema);

export { Task };
