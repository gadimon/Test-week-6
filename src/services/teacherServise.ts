import Teacher, { ITeacher } from '../models/teacherModel';

export const createTeacher = async (teacherData: Partial<ITeacher>): Promise<ITeacher> => {
    const teacher = new Teacher({
        ...teacherData,
    });

    return await teacher.save();
};
