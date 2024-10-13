import { Request, Response, NextFunction } from "express";
import { createStudent } from '../services/studentService';
import { createTeacher } from "../services/teacherServise";
import Student from '../models/studentModel';
import Teacher from '../models/teacherModel';
import { generateToken } from "../utils/auth";



export const registerStudent = async (req: Request, res: Response) => {  
    const { name, email, password, teacherId} = req.body;

    try {
        const existingStudent = await Student.findOne({ email: email });
        if (existingStudent) {
             res.status(400).json({ message: 'התלמיד כבר רשום לכיתה אחרת.' });
             return
        }

        const student = await createStudent({ name, email, password }, teacherId);

         res.status(201).json(student);
         return
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'שגיאה ברישום הסטודנט' });
    }

};


export const registerTeacher = async (req: Request, res: Response) => {  
    const { name, email, password, classRoom } = req.body;

    try {
        const existingTeacherWithClass = await Teacher.findOne({ class: classRoom });
        if (existingTeacherWithClass) {
             res.status(400).json({ message: 'הכיתה תפוסה כפרה' });
             return
        }

        const teacher = await createTeacher({ name, email, password, classRoom: classRoom });

        res.status(201).json(teacher);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'שגיאה ברישום המורה' });
    }
};




   

export const loginStudent = async (req: Request, res: Response) => {
    const { password, email} = req.body;
    try {
        const student = await Student.findOne({email});

    if(!student || !(await student.comparePassword(password))){
         res.status(401).json({message: "username or password are wrong"})
         return
    };
    await student.save();

 
        const token = generateToken(student.id);
        res.cookie('token', token,{
            httpOnly: true,
            secure: false,
            maxAge: 3600000
        })
        res.status(201).json({ message: "נרשמת בהצלחה תלמיד", token }); 
    } catch (error) {
        console.log(error);
        
    }
    

   
    };

