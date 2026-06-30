export interface CourseInterface {
    id: string;
    title: string;
    code: string;
    type: 'Individual' | 'Grupal';
    teacherId: string;
    teacherName: string;
    schedule: string;
    startDate: string;
    studentsCount: number;
    maxStudents: number;
}