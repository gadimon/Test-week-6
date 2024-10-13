import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import { ITeacher } from './teacherModel'
import { IGrade } from './gradeModel'

export interface IStudent extends Document {
    name: string,
    email: string,
    password: string,
    teacher: ITeacher['_id'],
    grades: IGrade[],
    comparePassword(studentPassword: string): Promise<Boolean>
};

const StudentSchema: Schema = new Schema({
    name: {
        type: String,
        require: true,
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },

    password: {
        type: String,
        require: true,
        minLength: [4, "The password must contain at least 4 characters"],
    },

    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'teacher'
    },
    grades: {
        type: Schema.Types.ObjectId,
        ref: 'grades'
    }


}, { timestamps: true });


//פונקצייה שמצפינה את הסיסמא
StudentSchema.pre<IStudent>('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, 10);
    next();
});


//מתודה להשוואת סיסמאות
StudentSchema.methods.comparePassword = async function (studentPassword: string): Promise<boolean> {
    return bcrypt.compare(studentPassword, this.password)
}


export default mongoose.model<IStudent>("Student", StudentSchema);