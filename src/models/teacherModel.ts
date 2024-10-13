import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITeacher extends Document {
    name: string,
    email: string,
    password: string,
    class: string,
    comparePassword(teacherPassword: string): Promise<Boolean>
};