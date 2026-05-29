import React, { useState } from 'react'
import { Plus, Search, ChevronLeft, ChevronRight, Video, X } from 'lucide-react'
import { SessionItem, UserItem } from '../interface'

interface CalendarTabProps {
    sessions: SessionItem[]
    setSessions: React.Dispatch<React.SetStateAction<SessionItem[]>>
    users: UserItem[]
}

export const CalendarTab: React.FC<CalendarTabProps> = ({ sessions, setSessions, users }) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedTeacherFilter, setSelectedTeacherFilter] = useState('all')
    const [selectedStatusFilter, setSelectedStatusFilter] = useState('all')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [viewMode, setViewMode] = useState<'Semana' | 'Mes'>('Semana')

    const [studentName, setStudentName] = useState('')
    const [teacherId, setTeacherId] = useState('')
    const [date, setDate] = useState('2026-05-28')
    const [startTime, setStartTime] = useState('15:00')
    const [endTime, setEndTime] = useState('16:00')
    const [status, setStatus] = useState<'Programada' | 'Completada' | 'Cancelada'>('Programada')
    const [link, setLink] = useState('https://meet.google.com/abc-defg-hij')

    const teachersList = users.filter(u => u.role === 'Profesor')

    const days = [
        { label: 'LUN', dateNum: '25', fullDate: '2026-05-25', index: 0 },
        { label: 'MAR', dateNum: '26', fullDate: '2026-05-26', index: 1 },
        { label: 'MIÉ', dateNum: '27', fullDate: '2026-05-27', index: 2 },
        { label: 'JUE', dateNum: '28', fullDate: '2026-05-28', index: 3 },
        { label: 'VIE', dateNum: '29', fullDate: '2026-05-29', index: 4 },
        { label: 'SÁB', dateNum: '30', fullDate: '2026-05-30', index: 5 },
        { label: 'DOM', dateNum: '31', fullDate: '2026-05-31', index: 6 }
    ]

    const hours = ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00']

    const filteredSessions = sessions.filter(session => {
        const matchesSearch = session.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            session.teacherName.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesTeacher = selectedTeacherFilter === 'all' || session.teacherName === selectedTeacherFilter
        const matchesStatus = selectedStatusFilter === 'all' || session.status === selectedStatusFilter
        return matchesSearch && matchesTeacher && matchesStatus
    })

    const openCreateModal = () => {
        setStudentName('')
        setTeacherId(teachersList[0]?.name || '')
        setDate('2026-05-28')
        setStartTime('15:00')
        setEndTime('16:00')
        setStatus('Programada')
        setLink('https://meet.google.com/abc-defg-hij')
        setIsModalOpen(true)
    }

    const handleCreateSession = (e: React.FormEvent) => {
        e.preventDefault()
        const selectedDateObj = new Date(date)
        let dayIndex = selectedDateObj.getDay() - 1
        if (dayIndex === -1) {
            dayIndex = 6
        }

        const newSession: SessionItem = {
            id: Math.random().toString(36).substring(2, 11),
            studentName,
            teacherName: teacherId || 'Sin Profesor',
            date,
            startTime,
            endTime,
            status,
            link,
            dayOfWeek: dayIndex
        }

        setSessions(prev => [...prev, newSession])
        setIsModalOpen(false)
    }

    const getSessionForSlot = (dayIndex: number, hourStr: string) => {
        return sessions.find(s => {
            const sessionHour = s.startTime.split(':')[0]
            const slotHour = hourStr.split(':')[0]
            const isSameDay = s.dayOfWeek === dayIndex
            const isSameHour = sessionHour === slotHour
            return isSameDay && isSameHour
        })
    }

    const getSessionBadgeStyles = (statusVal: 'Programada' | 'Completada' | 'Cancelada') => {
        if (statusVal === 'Cancelada') {
            return 'bg-red-50 text-red-600'
        }
        if (statusVal === 'Completada') {
            return 'bg-emerald-50 text-emerald-600'
        }
        return 'bg-purple-50 text-[#8568C0]'
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Calendario</h1>
                <p className="text-slate-500 text-sm mt-1">Gestiona y crea sesiones</p>
            </div>
            <div className="flex flex-wrap justify-between items-center gap-4 bg-white p-4 border border-slate-100 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)]">
                <div className="flex items-center gap-2">
                    <button 
                        type="button"
                        className="px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 transition-all"
                    >
                        Hoy
                    </button>
                    <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
                        <button 
                            type="button"
                            className="p-2 hover:bg-slate-50 border-r border-slate-200 text-slate-500 transition-all"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <button 
                            type="button"
                            className="p-2 hover:bg-slate-50 text-slate-500 transition-all"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                    <span className="text-sm font-bold text-slate-800 ml-2">25 – 31 May 2026</span>
                </div>

                <div className="flex bg-slate-100 p-1 rounded-xl">
                    <button
                        type="button"
                        onClick={() => setViewMode('Semana')}
                        className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            viewMode === 'Semana' ? 'bg-white text-[#8568C0] shadow-sm' : 'text-slate-500 hover:text-slate-700'
                        }`}
                    >
                        Semana
                    </button>
                    <button
                        type="button"
                        onClick={() => setViewMode('Mes')}
                        className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            viewMode === 'Mes' ? 'bg-white text-[#8568C0] shadow-sm' : 'text-slate-500 hover:text-slate-700'
                        }`}
                    >
                        Mes
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
                <div className="lg:col-span-3 bg-white border border-slate-100 rounded-3xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] overflow-x-auto">
                    <div className="min-w-[600px]">
                        <div className="grid grid-cols-8 border-b border-slate-100 pb-4 text-center font-bold text-xs text-slate-500">
                            <div className="text-left pl-2">Hora</div>
                            {days.map((day) => {
                                const isToday = day.dateNum === '28'
                                return (
                                    <div key={day.label} className="flex flex-col items-center">
                                        <span className="text-[10px] tracking-wider text-slate-400 font-bold uppercase">{day.label}</span>
                                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm mt-1 transition-all ${
                                            isToday ? 'bg-[#8568C0] text-white font-bold shadow-md shadow-[#8568c0]/20' : 'text-slate-700'
                                        }`}>
                                            {day.dateNum}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="divide-y divide-slate-100">
                            {hours.map((hour) => (
                                <div key={hour} className="grid grid-cols-8 min-h-[64px] items-center text-xs">
                                    <div className="font-bold text-slate-400 pl-2 py-4">{hour}</div>
                                    {days.map((day) => {
                                        const session = getSessionForSlot(day.index, hour)
                                        return (
                                            <div key={day.index} className="border-l border-slate-100 h-full p-1.5 flex flex-col justify-center relative">
                                                {session && (
                                                    <div className={`p-2 rounded-2xl h-full flex flex-col justify-center shadow-xs border leading-tight ${
                                                        session.status === 'Cancelada'
                                                            ? 'bg-red-50/70 border-red-100 text-red-700'
                                                            : 'bg-purple-50/70 border-purple-100 text-purple-700'
                                                    }`}>
                                                        <span className="font-bold truncate">{session.studentName}</span>
                                                        <span className="text-[10px] opacity-75 truncate">{session.startTime}-{session.endTime}</span>
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <button
                        type="button"
                        onClick={openCreateModal}
                        className="w-full flex items-center justify-center gap-2 bg-[#8568C0] text-white py-3 rounded-2xl hover:bg-[#7456b3] transition-all duration-300 font-semibold shadow-md hover:shadow-lg shadow-[#8568c0]/20 text-sm"
                    >
                        <Plus size={18} />
                        Crear sesión
                    </button>
                    <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] space-y-4">
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                                <Search size={16} />
                            </span>
                            <input
                                type="text"
                                placeholder="Buscar..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8568C0]/20 focus:border-[#8568C0] focus:bg-white transition-all text-xs"
                            />
                        </div>

                        <select
                            value={selectedTeacherFilter}
                            onChange={(e) => setSelectedTeacherFilter(e.target.value)}
                            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#8568C0]/20 focus:border-[#8568C0] focus:bg-white transition-all text-xs font-semibold"
                        >
                            <option value="all">Todos los profesores</option>
                            {teachersList.map((t) => (
                                <option key={t.id} value={t.name}>{t.name}</option>
                            ))}
                        </select>

                        <select
                            value={selectedStatusFilter}
                            onChange={(e) => setSelectedStatusFilter(e.target.value)}
                            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#8568C0]/20 focus:border-[#8568C0] focus:bg-white transition-all text-xs font-semibold"
                        >
                            <option value="all">Todos los estados</option>
                            <option value="Programada">Programada</option>
                            <option value="Completada">Completada</option>
                            <option value="Cancelada">Cancelada</option>
                        </select>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-xs font-bold text-slate-500 px-1">
                            <span>Sesiones</span>
                            <span>{filteredSessions.length}</span>
                        </div>

                        <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                            {filteredSessions.length === 0 ? (
                                <div className="text-center py-8 text-slate-400 text-xs bg-white rounded-3xl border border-slate-100">
                                    No hay sesiones.
                                </div>
                            ) : (
                                filteredSessions.map((session) => (
                                    <div
                                        key={session.id}
                                        className="bg-white border border-slate-100 rounded-2xl p-4 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] space-y-3 hover:shadow-md transition-all duration-300"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-bold text-slate-800 text-xs leading-snug">{session.studentName}</h4>
                                                <p className="text-slate-400 text-[10px] mt-0.5">Prof. {session.teacherName}</p>
                                            </div>
                                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${getSessionBadgeStyles(session.status)}`}>
                                                {session.status}
                                            </span>
                                        </div>

                                        <p className="text-[10px] font-semibold text-slate-500">
                                            {session.date} • {session.startTime} - {session.endTime}
                                        </p>

                                        {session.status !== 'Cancelada' && (
                                            <a
                                                href={session.link}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center justify-center gap-1.5 w-full py-2 bg-slate-50 border border-slate-200 hover:bg-purple-50 hover:border-purple-200 hover:text-[#8568C0] rounded-xl text-[10px] font-bold text-slate-600 transition-all"
                                            >
                                                <Video size={12} />
                                                Link
                                            </a>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl relative animate-slideInUp">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-6 right-6 text-slate-400 hover:text-slate-600"
                        >
                            <X size={20} />
                        </button>

                        <h2 className="text-xl font-bold text-slate-900 mb-6">Crear Sesión</h2>

                        <form onSubmit={handleCreateSession} className="space-y-4">
                            <div>
                                <label htmlFor="studentNameInput" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Nombre del Estudiante</label>
                                <input
                                    id="studentNameInput"
                                    type="text"
                                    required
                                    value={studentName}
                                    onChange={(e) => setStudentName(e.target.value)}
                                    placeholder="Nombre del alumno"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#8568C0]/20 focus:border-[#8568C0] focus:bg-white transition-all text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="teacherSelect" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Profesor</label>
                                <select
                                    id="teacherSelect"
                                    value={teacherId}
                                    onChange={(e) => setTeacherId(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#8568C0]/20 focus:border-[#8568C0] focus:bg-white transition-all text-sm"
                                >
                                    {teachersList.map((t) => (
                                        <option key={t.id} value={t.name}>{t.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="dateInput" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Fecha</label>
                                <input
                                    id="dateInput"
                                    type="date"
                                    required
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#8568C0]/20 focus:border-[#8568C0] focus:bg-white transition-all text-sm"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="startTimeInput" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Hora de Inicio</label>
                                    <input
                                        id="startTimeInput"
                                        type="text"
                                        required
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                        placeholder="Ej: 15:00"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#8568C0]/20 focus:border-[#8568C0] focus:bg-white transition-all text-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="endTimeInput" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Hora de Fin</label>
                                    <input
                                        id="endTimeInput"
                                        type="text"
                                        required
                                        value={endTime}
                                        onChange={(e) => setEndTime(e.target.value)}
                                        placeholder="Ej: 16:00"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#8568C0]/20 focus:border-[#8568C0] focus:bg-white transition-all text-sm"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="statusSelect" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Estado</label>
                                    <select
                                        id="statusSelect"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value as any)}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#8568C0]/20 focus:border-[#8568C0] focus:bg-white transition-all text-sm"
                                    >
                                        <option value="Programada">Programada</option>
                                        <option value="Completada">Completada</option>
                                        <option value="Cancelada">Cancelada</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="linkInput" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Link de Clase</label>
                                    <input
                                        id="linkInput"
                                        type="text"
                                        required
                                        value={link}
                                        onChange={(e) => setLink(e.target.value)}
                                        placeholder="Link videollamada"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#8568C0]/20 focus:border-[#8568C0] focus:bg-white transition-all text-sm"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#8568C0] text-white py-3 rounded-xl hover:bg-[#7456b3] transition-all duration-300 font-semibold shadow-md hover:shadow-lg shadow-[#8568c0]/20 mt-4 text-sm"
                            >
                                Crear Sesión
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
