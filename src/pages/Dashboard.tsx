import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUsers, getCourses, getSessions, getPayments } from '../services/userService'
import {
    defaultCourses,
    defaultSessions,
    defaultPayments,
    defaultEmergencyLinks
} from '../constants'
import {
    UserInterface,
    CourseInterface,
    SessionInterface,
    TeacherPaymentInterface,
    EmergencyLinkInterface
} from '../interface'
import { UsersTab } from '../components/UsersTab'
import { CoursesTab } from '../components/CoursesTab'
import { CalendarTab } from '../components/CalendarTab'
import { PaymentsTab } from '../components/PaymentsTab'
import { EmergencyLinksTab } from '../components/EmergencyLinksTab'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { DashboardTab } from '../components/DashboardTab'

type TabType =
    | 'dashboard'
    | 'usuarios'
    | 'clases'
    | 'cursos'
    | 'contenido'
    | 'tareas'
    | 'calendario'
    | 'mensajes'
    | 'reportes'
    | 'pagos'
    | 'configuracion'
    | 'soporte'
    | 'links'

const Dashboard = () => {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState<TabType>('dashboard')
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

    const [users, setUsers] = useState<UserInterface[]>(() => {
        const saved = localStorage.getItem('ma_admin_users')
        return JSON.parse(saved || '[]')
    })

    const [courses, setCourses] = useState<CourseInterface[]>(() => {
        const saved = localStorage.getItem('ma_admin_courses')
        return saved ? JSON.parse(saved) : defaultCourses
    })

    const [sessions, setSessions] = useState<SessionInterface[]>(() => {
        const saved = localStorage.getItem('ma_admin_sessions')
        return saved ? JSON.parse(saved) : defaultSessions
    })

    const [payments, setPayments] = useState<TeacherPaymentInterface[]>(() => {
        const saved = localStorage.getItem('ma_admin_payments')
        return saved ? JSON.parse(saved) : defaultPayments
    })

    const [emergencyLinks, setEmergencyLinks] = useState<EmergencyLinkInterface[]>(() => {
        const saved = localStorage.getItem('ma_admin_emergency_links')
        return saved ? JSON.parse(saved) : defaultEmergencyLinks
    })

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const mappedUsers = await getUsers()
                const newEmails = new Set(mappedUsers.map(m => m.email))
                
                setUsers(prev => {
                    const filteredPrev = prev.filter( p => !newEmails.has(p.email))
                    return [...filteredPrev, ...mappedUsers]
                })
            } catch (err) {
                console.error(err)
            }
        }
        fetchUsers()
    }, [])

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const apiCourses = await getCourses()
                setCourses(apiCourses)
            } catch (err) {
                console.error(err)
            }
        }
        fetchCourses()
    }, [])

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const apiSessions = await getSessions()
                setSessions(apiSessions)
            } catch (err) {
                console.error(err)
            }
        }
        fetchSessions()
    }, [])

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const apiPayments = await getPayments()
                setPayments(apiPayments)
            } catch (err) {
                console.error(err)
            }
        }
        fetchPayments()
    }, [])

    useEffect(() => {
        localStorage.setItem('ma_admin_users', JSON.stringify(users))
    }, [users])

    useEffect(() => {
        localStorage.setItem('ma_admin_courses', JSON.stringify(courses))
    }, [courses])

    useEffect(() => {
        localStorage.setItem('ma_admin_sessions', JSON.stringify(sessions))
    }, [sessions])

    useEffect(() => {
        localStorage.setItem('ma_admin_payments', JSON.stringify(payments))
    }, [payments])

    useEffect(() => {
        localStorage.setItem('ma_admin_emergency_links', JSON.stringify(emergencyLinks))
    }, [emergencyLinks])

    const handleSignOut = async () => {
        if (globalThis.confirm('¿Estás seguro de que deseas cerrar sesión?')) {
            navigate('/login')
        }
    }

    return (
        <DashboardLayout
            isSidebarCollapsed={isSidebarCollapsed}
            setIsSidebarCollapsed={setIsSidebarCollapsed}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            handleSignOut={handleSignOut}
        >
            {activeTab === 'dashboard' && (
                <DashboardTab />
            )}
            {activeTab === 'usuarios' && (
                <UsersTab users={users} setUsers={setUsers} />
            )}
            {activeTab === 'clases' && (
                <div className="bg-white rounded-3xl p-8 border border-slate-100 text-center font-bold text-slate-500">Gestión de Clases - Próximamente</div>
            )}
            {activeTab === 'cursos' && (
                <CoursesTab courses={courses} setCourses={setCourses} users={users} />
            )}
            {activeTab === 'contenido' && (
                <div className="bg-white rounded-3xl p-8 border border-slate-100 text-center font-bold text-slate-500">Gestión de Contenido y Recursos - Próximamente</div>
            )}
            {activeTab === 'tareas' && (
                <div className="bg-white rounded-3xl p-8 border border-slate-100 text-center font-bold text-slate-500">Gestión de Tareas - Próximamente</div>
            )}
            {activeTab === 'calendario' && (
                <CalendarTab sessions={sessions} setSessions={setSessions} users={users} />
            )}
            {activeTab === 'mensajes' && (
                <div className="bg-white rounded-3xl p-8 border border-slate-100 text-center font-bold text-slate-500">Bandeja de Mensajes - Próximamente</div>
            )}
            {activeTab === 'reportes' && (
                <div className="bg-white rounded-3xl p-8 border border-slate-100 text-center font-bold text-slate-500">Reportes y Exportación - Próximamente</div>
            )}
            {activeTab === 'pagos' && (
                <PaymentsTab payments={payments} setPayments={setPayments} />
            )}
            {activeTab === 'configuracion' && (
                <div className="bg-white rounded-3xl p-8 border border-slate-100 text-center font-bold text-slate-500">Configuración del Sistema - Próximamente</div>
            )}
            {activeTab === 'soporte' && (
                <div className="bg-white rounded-3xl p-8 border border-slate-100 text-center font-bold text-slate-500">Soporte y Ayuda - Próximamente</div>
            )}
            {activeTab === 'links' && (
                <EmergencyLinksTab emergencyLinks={emergencyLinks} setEmergencyLinks={setEmergencyLinks} users={users} />
            )}
        </DashboardLayout>
    )
}

export default Dashboard
