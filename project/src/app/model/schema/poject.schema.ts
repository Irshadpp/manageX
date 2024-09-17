import mongoose, { Schema } from "mongoose";
import { ProjectStatus } from "../enum";
import { ProjectModel, ProjectAttrs } from "../project.model";

const projectSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    status: {
        type: String,
        required: true,
        default: ProjectStatus.PLANNING
    },
    members: [{type: Schema.Types.ObjectId, ref: "User"}],
    tasks: [{type: Schema.Types.ObjectId, ref: "Task"}],
    manager: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    client: {
        type: Schema.Types.ObjectId
    },
    deal: {
        type: Schema.Types.ObjectId
    },
    organizationId: {
        type: Schema.Types.ObjectId
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

projectSchema.statics.build = (attrs: ProjectAttrs) =>{
    return new Project(attrs)
}

const Project = mongoose.model<ProjectAttrs, ProjectModel>("Project", projectSchema);

export {Project}

