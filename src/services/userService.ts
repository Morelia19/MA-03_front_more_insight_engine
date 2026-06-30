import { UserInterface, CourseInterface, SessionInterface, TeacherPaymentInterface } from '../interface'
import { defaultCourses, defaultSessions, defaultPayments } from '../constants'

const getApiBaseUrl = () => {
    const envUrl = import.meta.env.VITE_API_BASE_URL;
    if (typeof globalThis !== 'undefined' && globalThis.location && (globalThis.location.hostname === 'localhost' || globalThis.location.hostname === '127.0.0.1')) {
        return 'http://localhost:4000';
    }
    return envUrl || 'https://ma-02-ms-more-academy.vercel.app';
};
const API_BASE_URL = getApiBaseUrl();

export const getUsers = async (): Promise<UserInterface[]> => {
    const res = await fetch(`${API_BASE_URL}/v1/users`)
    if (!res.ok) {
        throw new Error('Failed to fetch users')
    }
    const apiUsers = await res.json()
    const roleMap: Record<string, 'Estudiante' | 'Profesor' | 'Administrador'> = {
        TEACHER: 'Profesor',
        ADMIN: 'Administrador',
        STUDENT: 'Estudiante'
    }
    const detailMap: Record<string, string> = {
        TEACHER: 'Profesor Activo',
        ADMIN: 'Administrador',
        STUDENT: 'Estudiante'
    }
    return apiUsers.map((u: any) => {
        const fullName = [u.firstName, u.middleName, u.lastName, u.secondLastName]
            .filter(Boolean)
            .join(' ')
        return {
            id: u.id,
            name: fullName,
            email: u.email,
            role: roleMap[u.role] || 'Estudiante',
            detail: detailMap[u.role] || 'Estudiante',
            status: 'Activo'
        }
    })
}

export const createUser = async (name: string, email: string, role: string): Promise<UserInterface> => {
    const roleMap: Record<string, string> = {
        Profesor: 'TEACHER',
        Administrador: 'ADMIN',
        Estudiante: 'STUDENT'
    }

    const nameParts = name.trim().split(' ')
    const firstName = nameParts[0] || ''
    const lastName = nameParts.slice(1).join(' ') || ' '

    const res = await fetch(`${API_BASE_URL}/v1/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            firstName,
            lastName,
            email,
            role: roleMap[role] || 'STUDENT'
        })
    })

    if (!res.ok) {
        throw new Error('Failed to create user')
    }

    const created = await res.json()
    const detailsPlaceholders: Record<string, string> = {
        Profesor: 'Profesor Activo',
        Administrador: 'Administrador',
        Estudiante: 'Estudiante'
    }

    return {
        id: created.id,
        name: `${created.firstName} ${created.lastName}`,
        email: created.email,
        role: role as 'Estudiante' | 'Profesor' | 'Administrador',
        detail: detailsPlaceholders[role] || 'Estudiante',
        status: 'Activo'
    }
}

export const updateUser = async (id: string, name: string): Promise<void> => {
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
    if (!isUuid) {
        return
    }

    const nameParts = name.trim().split(' ')
    const firstName = nameParts[0] || ''
    const lastName = nameParts.slice(1).join(' ') || ' '

    const res = await fetch(`${API_BASE_URL}/v1/users/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            firstName,
            lastName
        })
    })

    if (!res.ok) {
        throw new Error('Failed to update user')
    }
}

export const getCourses = async (): Promise<CourseInterface[]> => {
    try {
        const res = await fetch(`${API_BASE_URL}/v1/courses`)
        if (!res.ok) throw new Error('Failed to fetch courses')
        const json = await res.json()
        const courses = json.data || []
        if (courses.length === 0) return defaultCourses;
        return courses.map((c: any) => ({
            id: c.id,
            title: c.name || c.title || 'Curso sin nombre',
            code: c.code || 'CODE',
            type: c.type === 'Individual' || c.type === 'INDIVIDUAL' ? 'Individual' : 'Grupal',
            teacherId: c.teacherId || c.instructorId || '',
            teacherName: c.teacherName || 'Profe Morelia',
            schedule: c.schedule || 'Lunes y Miércoles 10:00 AM',
            startDate: c.startDate || c.created_at?.split('T')[0] || new Date().toISOString().split('T')[0],
            studentsCount: c.studentsCount || 0,
            maxStudents: c.capacity || c.maxStudents || 6
        }))
    } catch (err) {
        console.warn('API error fetching courses, using mock fallback', err)
        return defaultCourses
    }
}

export const createCourse = async (course: Omit<CourseInterface, 'id' | 'teacherName' | 'studentsCount'>): Promise<any> => {
    const res = await fetch(`${API_BASE_URL}/v1/courses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: course.title,
            code: course.code,
            type: course.type.toUpperCase(),
            instructorId: course.teacherId,
            capacity: course.maxStudents
        })
    })
    if (!res.ok) throw new Error('Failed to create course')
    return res.json()
}

export const getSessions = async (): Promise<SessionInterface[]> => {
    try {
        const res = await fetch(`${API_BASE_URL}/v1/classes`)
        if (!res.ok) throw new Error('Failed to fetch classes')
        const json = await res.json()
        const events = json.events || []
        if (events.length === 0) return defaultSessions;
        return events.map((e: any) => ({
            id: e.id,
            studentName: e.studentName || 'Estudiante General',
            teacherName: e.teacherName || 'Profe Morelia',
            date: e.start?.split('T')[0] || new Date().toISOString().split('T')[0],
            startTime: e.start?.split('T')[1]?.substring(0, 5) || '09:00',
            endTime: e.end?.split('T')[1]?.substring(0, 5) || '10:30',
            status: e.status || 'Programada',
            link: e.meetingUrl || e.link || '',
            dayOfWeek: new Date(e.start || new Date()).getDay()
        }))
    } catch (err) {
        console.warn('API error fetching classes, using mock fallback', err)
        return defaultSessions
    }
}

export const createSession = async (session: Omit<SessionInterface, 'id'>): Promise<any> => {
    const res = await fetch(`${API_BASE_URL}/v1/classes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            courseId: '8a9c80d8-1b2c-3d4e-5f6g-7h8i9j0k1l2m',
            start_time: `${session.date}T${session.startTime}:00Z`,
            end_time: `${session.date}T${session.endTime}:00Z`,
            link: session.link
        })
    })
    if (!res.ok) throw new Error('Failed to create class session')
    return res.json()
}

export const getPayments = async (): Promise<TeacherPaymentInterface[]> => {
    try {
        const res = await fetch(`${API_BASE_URL}/v1/payments/history`)
        if (!res.ok) throw new Error('Failed to fetch payments')
        const json = await res.json()
        const paymentsList = json.data || []
        if (paymentsList.length === 0) return defaultPayments;
        return defaultPayments;
    } catch (err) {
        console.warn('API error fetching payments, using mock fallback', err)
        return defaultPayments
    }
}
