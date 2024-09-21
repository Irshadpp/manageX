import mongoose, { Schema } from "mongoose";
import { DurationType, Priority, ProjectStatus } from "../enum";
import { TaskAttrs, TaskModel } from "../task.model";

const attachmentSchema = new mongoose.Schema({
        title: {
          type: String,
        },
        description: {
          type: String,
        },
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        attachments: [String],
}, { timestamps: true })

const subTaskSchema = new mongoose.Schema({
    title: {
        type: String
    },
    status: {
        type: String,
        default: ProjectStatus.PLANNING
    },
    duration: {
        length: {
            type: Number
        },
        durationType: {
            type: String,
            default: DurationType.MINUTES
        }
    }
});

const replaySchema = new mongoose.Schema({
    text: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
}, { timestamps: true })

const commentSchema = new mongoose.Schema({
    text: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    replays: {
        type: [replaySchema]
    }
}, { timestamps: true });

const taskSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    projectId: {
        type: String
    },
    organizationId: {
        type: String
    },
    startDate: {
        type: Date
    },
    dueDate: {
        type: Date
    },
    status: {
        type: String,
        default: ProjectStatus.PLANNING
    },
    priority: {
        type: String,
        default: Priority.LOW
    },
    assignee: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    attachments: {
        type: [attachmentSchema]
    },
    subTasks: {
        type: [subTaskSchema]
    },
    comments: {
        type: [commentSchema]
    }
},{
    toJSON:{
        timestamps: true,
        virtuals: true,
        transform(doc, ret){
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

taskSchema.statics.build = (attrs: TaskAttrs) =>{
    return new Task(attrs)
}

const Task = mongoose.model<TaskAttrs, TaskModel>("Task", taskSchema);

export { Task }