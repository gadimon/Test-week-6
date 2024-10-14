import express from "express";
import { addGrade } from "../controllers/gradeController";
import { registerStudent, registerTeacher, loginUser } from '../controllers/authController';
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

/**
 * @swagger
 * /auth/registerStudent:
 *   post:
 *     summary: רישום תלמיד חדש
 *     description: מייצר תלמיד חדש
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - teacherId
 *               - grades
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               teacherId:
 *                 type: string
 *               grades:
 *                 type: array
 *                 items:
 *                   type: number
 *     responses:
 *       201:
 *         description: התלמיד נרשם בהצלחה
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 userId:
 *                   type: string
 *       400:
 *         description: שגיאה בנתונים שהוזנו
 */
router.post('/registerStudent', registerStudent);

/**
 * @swagger
 * /auth/registerTeacher:
 *   post:
 *     summary: רישום מורה חדש
 *     description: רושם מורה חדש
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - classRoom
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               classRoom:
 *                 type: string
 *     responses:
 *       201:
 *         description: המורה נרשם בהצלחה
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 teacherId:
 *                   type: string
 *       400:
 *         description: שגיאה בנתונים שהוזנו
 */
router.post('/registerTeacher', registerTeacher);

/**
 * @swagger
 * /auth/loginUser:
 *   post:
 *     summary: התחברות למערכת
 *     description: מאמת את המשתמש ומחזיר תוקן
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - role
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [teacher]
 *     responses:
 *       200:
 *         description: התחברות הצליחה
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       401:
 *         description: שם משתמש או סיסמה שגויים
 */
router.post('/loginUser', loginUser);

/**
 * @swagger
 * /api/grades/add-grade:
 *   post:
 *     summary: הוספת ציון לתלמיד
 *     description: רק מורה יכול להוסיף ציון לתלמיד בכיתתו
 *     tags: [Grades]
 *     security:
 *       - bearerAuth: []  # מדגיש שהנתיב דורש אימות באמצעות טוקן JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - studentId
 *               - value
 *               - comment
 *             properties:
 *               studentId:
 *                 type: string
 *               value:
 *                 type: number
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: ציון נוסף בהצלחה
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 grade:
 *                   type: object
 *                   properties:
 *                     student:
 *                       type: string
 *                     teacher:
 *                       type: string
 *                     value:
 *                       type: number
 *                     comment:
 *                       type: string
 *       403:
 *         description: אין הרשאה לבצע פעולה זו
 *       404:
 *         description: התלמיד לא נמצא
 */
router.post('/add-grade', authMiddleware, addGrade);

export default router;
