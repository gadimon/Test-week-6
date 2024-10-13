import mongoose, { Schema, Document, Types } from "mongoose";
import bcrypt from "bcrypt";

export interface ITeacher extends Document {
    name: string,
    email: string,
    password: string,
    classRoom: string,
    comparePassword(teacherPassword: string): Promise<Boolean>
};


const TeacherSchema: Schema = new Schema({
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

    classRoom: {
        type: String,
        require: true,
        unique: true,
    },
});


//פונקצייה שמצפינה את הסיסמא
TeacherSchema.pre<ITeacher>('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, 10);
    next();
});


//מתודה להשוואת סיסמאות
TeacherSchema.methods.comparePassword = async function (steacherPassword: string): Promise<boolean> {
    return bcrypt.compare(steacherPassword, this.password)
}


export default mongoose.model<ITeacher>("Teacher", TeacherSchema);