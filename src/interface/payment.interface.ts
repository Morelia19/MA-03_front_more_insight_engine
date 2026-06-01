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