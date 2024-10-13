import  express  from "express";
import { registerStudent, registerTeacher, loginStudent} from '../controllers/authController';
import { authMiddleware } from "../middleware/authMiddleware";




const router = express.Router();

router.post('/registerStudent', registerStudent);
router.post('/registerTeacher', registerTeacher);
router.post('/loginStudent', authMiddleware, loginStudent);

export default router;