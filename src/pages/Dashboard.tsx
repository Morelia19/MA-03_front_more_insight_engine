import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../data/supabase'
import { getUsers } from '../services/userService'
import {
    defaultCourses,
    defaultSessions,
    defaultPayments,
    defaultEmergencyLinks
} from '../constants'
import {
    UserItem,
    CourseItem,
    SessionItem,
    TeacherPaymentItem,
    EmergencyLinkItem
} from '../interface'
import { UsersTab } from '../components/UsersTab'
import { CoursesTab } from '../components/CoursesTab'
import { CalendarTab } from '../components/CalendarTab'
import { PaymentsTab } from '../components/PaymentsTab'
import { EmergencyLinksTab } from '../components/EmergencyLinksTab'
import { DashboardLayout } from '../layouts/DashboardLayout'

type TabType = 'usuarios' | 'cursos' | 'calendario' | 'pagos' | 'links'

const Dashboard = () => {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState<TabType>('usuarios')
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

    const [users, setUsers] = useState<UserItem[]>(() => {
        const saved = localStorage.getItem('ma_admin_users')
        return JSON.parse(saved || '{}')
    })

    const [courses, setCourses] = useState<CourseItem[]>(() => {
        const saved = localStorage.getItem('ma_admin_courses')
        return saved ? JSON.parse(saved) : defaultCourses
    })

    const [sessions, setSessions] = useState<SessionItem[]>(() => {
        const saved = localStorage.getItem('ma_admin_sessions')
        return saved ? JSON.parse(saved) : defaultSessions
    })

    const [payments, setPayments] = useState<TeacherPaymentItem[]>(() => {
        const saved = localStorage.getItem('ma_admin_payments')
        return saved ? JSON.parse(saved) : defaultPayments
    })

    const [emergencyLinks, setEmergencyLinks] = useState<EmergencyLinkItem[]>(() => {
        const saved = localStorage.getItem('ma_admin_emergency_links')
        return saved ? JSON.parse(saved) : defaultEmergencyLinks
    })

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const mappedUsers = await getUsers()
                
                setUsers(prev => {
                    const filteredPrev = prev.filter(p => !mappedUsers.some(m => m.email === p.email))
                    return [...filteredPrev, ...mappedUsers]
                })
            } catch (err) {
                console.error(err)
            }
        }
        fetchUsers()
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
            await supabase.auth.signOut()
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
            {activeTab === 'usuarios' && (
                <UsersTab users={users} setUsers={setUsers} />
            )}
            {activeTab === 'cursos' && (
                <CoursesTab courses={courses} setCourses={setCourses} users={users} />
            )}
            {activeTab === 'calendario' && (
                <CalendarTab sessions={sessions} setSessions={setSessions} users={users} />
            )}
            {activeTab === 'pagos' && (
                <PaymentsTab payments={payments} setPayments={setPayments} />
            )}
            {activeTab === 'links' && (
                <EmergencyLinksTab emergencyLinks={emergencyLinks} setEmergencyLinks={setEmergencyLinks} users={users} />
            )}
        </DashboardLayout>
    )
}

export default Dashboard
