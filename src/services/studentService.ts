import Student, { IStudent } from '../models/studentModel';

export const createStudent = async (studentData: Partial<IStudent>, teacherId: string): Promise<IStudent> => {
    const student = new Student({
        ...studentData,
        teacher: teacherId
    });

    return await student.save();
};
