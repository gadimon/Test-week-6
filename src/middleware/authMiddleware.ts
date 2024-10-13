//פונקצייה גנרית לאימות תוקן של משתמש

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


interface AuthRequest extends Request {
    user?: { studentId: string, role: string }
};

//אימות משתמש
export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
    //נסיון לחלץ טוקן
    const token = req.cookies.token;
    
        
    
    if (!token) {
        res.status(401).json({ message: 'תתחיל לאהוד ביתר אולי יהיה לך סיכוי' })
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string, role: string }
        //אם האימות מצליח אז מוסיף את פרטי המשתמש לאימות הבקשה
        // req.user = decoded;
        next();
    } catch (error) {
        res.sendStatus(401).json({ message: "הטוקן לא בתוקף" })
    }
};

