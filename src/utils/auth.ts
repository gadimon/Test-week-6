import jwt from 'jsonwebtoken';

export const generateToken = (studentId: string): string => {
    return jwt.sign({ studentId }, process.env.JWT_SECRET as string, { expiresIn: '10h' })
};