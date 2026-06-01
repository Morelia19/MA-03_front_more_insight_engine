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