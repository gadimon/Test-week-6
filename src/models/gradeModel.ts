import mongoose, { Schema, Document, Types } from "mongoose";
import { ITeacher } from './teacherModel';
import { IStudent } from './studentModel'

export interface IGrade extends Document {
    student: IStudent['_id'],
    teacher: ITeacher['_id'],
    value: number,
    comment: string,
};

const gradeSchema: Schema = new Schema ({
    student: {
        type: Schema.Types.ObjectId,
        ref: 'student',
        required: true 
    },

    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'teacher',
        required: true 
    },

    value: {
        type: Number,
        require: true,
    },

    comment: {
        type: String,
        require: true,
    }
});

export default mongoose.model<IGrade>("Grade", gradeSchema);