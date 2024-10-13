import mongoose, { Schema, Document, Types } from "mongoose";
import { ITeacher } from './teacherModel';
import { IStudent } from './studentModel'

export interface IGrade extends Document {
    studentId: IStudent['_id'],
    teacherId: ITeacher['_id'],
    value: number,
    connent: string,
};