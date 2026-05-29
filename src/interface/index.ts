export interface UserItem {
    id: string;
    name: string;
    email: string;
    role: 'Estudiante' | 'Profesor' | 'Administrador';
    detail: string;
    status: 'Activo' | 'Inactivo';
}

export interface CourseItem {
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

export interface SessionItem {
    id: string;
    studentName: string;
    teacherName: string;
    date: string;
    startTime: string;
    endTime: string;
    status: 'Programada' | 'Completada' | 'Cancelada';
    link: string;
    dayOfWeek: number;
}

export interface StudentPaymentDetail {
    id: string;
    studentName: string;
    completedClasses: number;
    totalClasses: number;
    ratePerClass: number;
}

export interface TeacherPaymentItem {
    id: string;
    teacherName: string;
    totalClasses: number;
    rate: number;
    studentsCount: number;
    amount: number;
    status: 'Pendiente' | 'Pagado';
    studentDetails: StudentPaymentDetail[];
}

export interface EmergencyLinkItem {
    id: string;
    teacherName: string;
    studentName: string;
    timeAgo: string;
    url: string;
}
