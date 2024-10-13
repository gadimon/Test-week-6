import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import {ITeacher} from './teacherModel'
import {IGrade} from './gradeModel'

export interface IStudent extends Document {
    name: string,
    email: string,
    password: string,
    teacherId: ITeacher,
    grades: IGrade[],
    comparePassword(studentPassword: string): Promise<Boolean>
};