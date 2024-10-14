import { Request, Response } from "express";
import Student from '../models/studentModel';
import Teacher from '../models/teacherModel';
import Grade from '../models/gradeModel';
import mongoose, { Types } from 'mongoose';

export interface AuthRequest extends Request {
    user?: {
        userId: string;
        role: string;
    };
}

export const addGrade = async (req: AuthRequest, res: Response) => {
    const { studentId, value, comment } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
        res.status(401).json({ message: "Unauthorized: no user ID found" });
        return;
    }

    try {
        const teacher = await Teacher.findById(userId);
        if (!teacher) {
            res.status(403).json({ message: "רק מורה מחובר יכול לשנות ציון" });
            return;
        }

        const student = await Student.findById(studentId).populate('teacher');
        if (!student) {
            res.status(404).json({ message: "Student not found." });
            return;
        }

        // השוואת מזהי המורים
        const teacherId = teacher._id as Types.ObjectId;
        if (!student.teacher || student.teacher._id.toString() !== teacherId.toString()) {
            res.status(403).json({ message: 'אתה יכול לתת ציון רק לתלמיד בכיתה שלך' });
            return;
        }

        // בדיקה אם יש הערה
        if (!comment) {
            res.status(400).json({ message: 'חייב לתת הערה עם הציון, תהיה נחמד!' });
            return;
        }

        const grade = new Grade({
            student: student._id,
            teacher: teacher._id,
            value: value,
            comment: comment
        });
        await grade.save();

        res.status(200).json({ message: 'הציון נוסף בהצלחה' });

    } catch (error) {
        const err = error as Error;
        console.error("Detailed error:", err.message);
        res.status(500).json({ message: "Error adding grade.", error: err.message });
    }
};
