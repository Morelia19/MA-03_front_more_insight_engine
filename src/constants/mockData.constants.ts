import { CourseInterface, SessionInterface, TeacherPaymentInterface, EmergencyLinkInterface } from '../interface'

export const defaultCourses: CourseInterface[] = [
    { id: 'course-1', title: 'More English - Básico', code: 'ENG-001', type: 'Grupal', teacherId: 'teacher-1', teacherName: 'Dr. Carlos Mendoza', schedule: 'Lunes y Miércoles 10:00 AM', startDate: '2025-01-15', studentsCount: 4, maxStudents: 6 },
    { id: 'course-2', title: 'More Maths - Intermedio', code: 'MAT-002', type: 'Individual', teacherId: 'teacher-2', teacherName: 'Ing. Ana Torres', schedule: 'Martes y Jueves 2:00 PM', startDate: '2025-01-10', studentsCount: 1, maxStudents: 1 },
    { id: 'course-3', title: 'More Code - Python', code: 'COD-003', type: 'Individual', teacherId: 'teacher-3', teacherName: 'Lic. Roberto Díaz', schedule: 'Viernes 4:00 PM', startDate: '2025-02-01', studentsCount: 1, maxStudents: 1 },
    { id: 'course-4', title: 'More English - Conversación', code: 'ENG-004', type: 'Grupal', teacherId: 'teacher-1', teacherName: 'Dr. Carlos Mendoza', schedule: 'Martes y Jueves 9:00 AM', startDate: '2025-01-20', studentsCount: 3, maxStudents: 5 }
]

export const defaultSessions: SessionInterface[] = [
    { id: 'session-1', studentName: 'Isabella Medina', teacherName: 'Laura Vargas', date: '2026-05-26', startTime: '15:30', endTime: '16:30', status: 'Cancelada', link: 'https://meet.google.com/xyz-pdqk-wmn', dayOfWeek: 1 },
    { id: 'session-2', studentName: 'Mateo Flores', teacherName: 'Dr. Carlos Mendoza', date: '2026-05-27', startTime: '17:00', endTime: '18:00', status: 'Completada', link: 'https://meet.google.com/xyz-pdqk-wmn', dayOfWeek: 2 },
    { id: 'session-3', studentName: 'Ana García', teacherName: 'Dr. Carlos Mendoza', date: '2026-05-28', startTime: '16:00', endTime: '17:00', status: 'Programada', link: 'https://meet.google.com/xyz-pdqk-wmn', dayOfWeek: 3 },
    { id: 'session-4', studentName: 'María López', teacherName: 'Dr. Carlos Mendoza', date: '2026-05-28', startTime: '15:00', endTime: '16:00', status: 'Programada', link: 'https://meet.google.com/xyz-pdqk-wmn', dayOfWeek: 3 },
    { id: 'session-5', studentName: 'Sofía Ramírez', teacherName: 'Dr. Carlos Mendoza', date: '2026-05-29', startTime: '10:00', endTime: '11:00', status: 'Programada', link: 'https://meet.google.com/xyz-pdqk-wmn', dayOfWeek: 4 },
    { id: 'session-6', studentName: 'Jorge Castro', teacherName: 'Laura Vargas', date: '2026-05-29', startTime: '11:00', endTime: '12:00', status: 'Cancelada', link: 'https://meet.google.com/xyz-pdqk-wmn', dayOfWeek: 4 }
]

export const defaultPayments: TeacherPaymentInterface[] = [
    {
        id: 'payment-1',
        teacherName: 'Dr. Carlos Mendoza',
        totalClasses: 12,
        rate: 20,
        studentsCount: 3,
        amount: 240,
        status: 'Pendiente',
        studentDetails: [
            { id: 'pd-1', studentName: 'María González', completedClasses: 4, totalClasses: 8, ratePerClass: 20 },
            { id: 'pd-2', studentName: 'Juan Pérez', completedClasses: 3, totalClasses: 4, ratePerClass: 20 },
            { id: 'pd-3', studentName: 'Sofia Ramírez', completedClasses: 5, totalClasses: 8, ratePerClass: 20 }
        ]
    },
    {
        id: 'payment-2',
        teacherName: 'Ing. Ana Torres',
        totalClasses: 8,
        rate: 20,
        studentsCount: 2,
        amount: 160,
        status: 'Pendiente',
        studentDetails: [
            { id: 'pd-4', studentName: 'Mateo Flores', completedClasses: 4, totalClasses: 4, ratePerClass: 20 },
            { id: 'pd-5', studentName: 'Ana García', completedClasses: 4, totalClasses: 4, ratePerClass: 20 }
        ]
    },
    {
        id: 'payment-3',
        teacherName: 'Lic. Roberto Díaz',
        totalClasses: 15,
        rate: 20,
        studentsCount: 3,
        amount: 300,
        status: 'Pagado',
        studentDetails: [
            { id: 'pd-6', studentName: 'Ana López', completedClasses: 5, totalClasses: 5, ratePerClass: 20 },
            { id: 'pd-7', studentName: 'Carlos Ruiz', completedClasses: 5, totalClasses: 5, ratePerClass: 20 },
            { id: 'pd-8', studentName: 'Sofía Medina', completedClasses: 5, totalClasses: 5, ratePerClass: 20 }
        ]
    }
]

export const defaultEmergencyLinks: EmergencyLinkInterface[] = [
    { id: 'link-1', teacherName: 'Dr. Carlos Mendoza', studentName: 'María García', timeAgo: 'Hace 2 horas', url: 'https://meet.google.com/xyz-pdqk-wmn' }
]