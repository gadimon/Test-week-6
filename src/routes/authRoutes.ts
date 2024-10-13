import  express  from "express";
import { registerStudent, registerTeacher, loginStudent} from '../controllers/authController';
import { authMiddleware } from "../middleware/authMiddleware";




const router = express.Router();

/**
 * @swagger
 * /auth/register:
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
 *               - teacher
 *               - grades
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               teacher:
 *                 type: ITeacher
 *               grades:
 *                 type: IGrade
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
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: token=abcde12345; HttpOnly; Secure; SameSite=Strict
 *       400:
 *         description: שגיאה בנתונים שהוזנו
 */
router.post('/registerStudent', registerStudent);
router.post('/registerTeacher', registerTeacher);

/**
 * @swagger
 * /auth/loginStudent:
 *   post:
 *     summary: התחברות למערכת
 *     description: מאמת את התלמיד ומחזיר תוקן
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
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
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
 *                 userId:
 *                   type: string
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: token=abcde12345; HttpOnly; Secure; SameSite=Strict
 *       401:
 *         description: שם משתמש או סיסמה שגויים
 */
router.post('/loginStudent', authMiddleware, loginStudent);

export default router;