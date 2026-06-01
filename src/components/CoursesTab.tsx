import React, { useState } from 'react'
import { Search, Plus, Book, User, Calendar, Users, MoreVertical, Edit2, Trash2, X } from 'lucide-react'
import { CourseItem, UserItem } from '../interface'

interface CoursesTabProps {
    courses: CourseItem[]
    setCourses: React.Dispatch<React.SetStateAction<CourseItem[]>>
    users: UserItem[]
}

export const CoursesTab: React.FC<CoursesTabProps> = ({ courses, setCourses, users }) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingCourse, setEditingCourse] = useState<CourseItem | null>(null)
    const [menuOpenId, setMenuOpenId] = useState<string | null>(null)

    const [title, setTitle] = useState('')
    const [code, setCode] = useState('')
    const [type, setType] = useState<'Individual' | 'Grupal'>('Grupal')
    const [teacherId, setTeacherId] = useState('')
    const [schedule, setSchedule] = useState('')
    const [startDate, setStartDate] = useState('')
    const [studentsCount, setStudentsCount] = useState(0)
    const [maxStudents, setMaxStudents] = useState(6)

    const teachersList = users.filter(u => u.role === 'Profesor')

    const totalCourses = courses.length
    const individualCount = courses.filter(c => c.type === 'Individual').length
    const groupCount = courses.filter(c => c.type === 'Grupal').length

    const filteredCourses = courses.filter(course => {
        return course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.teacherName.toLowerCase().includes(searchQuery.toLowerCase())
    })

    const openCreateModal = () => {
        setEditingCourse(null)
        setTitle('')
        setCode('')
        setType('Grupal')
        setTeacherId(teachersList[0]?.id || '')
        setSchedule('')
        setStartDate(new Date().toISOString().split('T')[0])
        setStudentsCount(0)
        setMaxStudents(6)
        setIsModalOpen(true)
    }

    const openEditModal = (course: CourseItem) => {
        setEditingCourse(course)
        setTitle(course.title)
        setCode(course.code)
        setType(course.type)
        setTeacherId(course.teacherId)
        setSchedule(course.schedule)
        setStartDate(course.startDate)
        setStudentsCount(course.studentsCount)
        setMaxStudents(course.maxStudents)
        setIsModalOpen(true)
        setMenuOpenId(null)
    }

    const handleSave = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        const selectedTeacher = teachersList.find(t => t.id === teacherId)
        const selectedTeacherName = selectedTeacher ? selectedTeacher.name : 'Sin Profesor'

        if (editingCourse) {
            setCourses(prev => prev.map(c => c.id === editingCourse.id ? {
                ...c,
                title,
                code,
                type,
                teacherId,
                teacherName: selectedTeacherName,
                schedule,
                startDate,
                studentsCount,
                maxStudents
            } : c))
        } else {
            const newCourse: CourseItem = {
                id: Math.random().toString(36).substring(2, 11),
                title,
                code,
                type,
                teacherId,
                teacherName: selectedTeacherName,
                schedule,
                startDate,
                studentsCount,
                maxStudents
            }
            setCourses(prev => [...prev, newCourse])
        }
        setIsModalOpen(false)
    }

    const handleDelete = (id: string) => {
        if (globalThis.confirm('¿Estás seguro de que deseas eliminar este curso?')) {
            setCourses(prev => prev.filter(c => c.id !== id))
            setMenuOpenId(null)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Gestión de Cursos</h1>
                    <p className="text-slate-500 text-sm mt-1">Administra los cursos de la plataforma</p>
                </div>
                <button
                    type="button"
                    onClick={openCreateModal}
                    className="flex items-center gap-2 bg-[#8568C0] text-white px-5 py-2.5 rounded-2xl hover:bg-[#7456b3] transition-all duration-300 font-semibold shadow-md hover:shadow-lg shadow-[#8568c0]/20"
                >
                    <Plus size={18} />
                    Nuevo Curso
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600">
                        <Book size={24} />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-900">{totalCourses}</div>
                        <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Total Cursos</div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                        <User size={24} />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-900">{individualCount}</div>
                        <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Individuales</div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600">
                        <Users size={24} />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-900">{groupCount}</div>
                        <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Grupales</div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] space-y-6">
                <div className="relative max-w-md">
                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                        <Search size={18} />
                    </span>
                    <input
                        type="text"
                        placeholder="Buscar cursos..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8568C0]/20 focus:border-[#8568C0] focus:bg-white transition-all text-sm"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredCourses.length === 0 ? (
                        <div className="col-span-full text-center py-12 text-slate-400">
                            No se encontraron cursos.
                        </div>
                    ) : (
                        filteredCourses.map((course) => (
                            <div
                                key={course.id}
                                className="border border-slate-100 rounded-3xl p-6 hover:shadow-md transition-all duration-300 bg-white flex flex-col gap-4 relative"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                                            <Book size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-800 text-base leading-snug">{course.title}</h3>
                                            <p className="text-slate-400 text-xs font-semibold">{course.code}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                                            course.type === 'Grupal' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'
                                        }`}>
                                            {course.type === 'Grupal' ? '👥 ' : '👤 '}
                                            {course.type}
                                        </span>

                                        <div className="relative">
                                            <button
                                                type="button"
                                                onClick={() => setMenuOpenId(menuOpenId === course.id ? null : course.id)}
                                                className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all"
                                            >
                                                <MoreVertical size={16} />
                                            </button>

                                            {menuOpenId === course.id && (
                                                <>
                                                    <button 
                                                        type="button" 
                                                        className="fixed inset-0 z-10 cursor-default bg-transparent w-full h-full"
                                                        onClick={() => setMenuOpenId(null)} 
                                                    />
                                                    <div className="absolute right-0 mt-2 w-32 bg-white border border-slate-100 rounded-2xl shadow-xl z-20 overflow-hidden py-1">
                                                        <button
                                                            type="button"
                                                            onClick={() => openEditModal(course)}
                                                            className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-600 hover:bg-slate-50 flex items-center gap-2"
                                                        >
                                                            <Edit2 size={12} />
                                                            Editar
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDelete(course.id)}
                                                            className="w-full px-4 py-2 text-left text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2"
                                                        >
                                                            <Trash2 size={12} />
                                                            Eliminar
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-slate-100 my-1" />

                                <div className="space-y-2.5 text-slate-600 text-xs">
                                    <div className="flex items-center gap-2">
                                        <User size={14} className="text-slate-400" />
                                        <span>{course.teacherName}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar size={14} className="text-slate-400" />
                                        <span>{course.schedule}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar size={14} className="text-slate-400" />
                                        <span>Inicio: {course.startDate}</span>
                                    </div>
                                </div>

                                <div className="mt-2">
                                    <div className="flex justify-between items-center text-xs font-semibold text-slate-600 mb-1.5">
                                        <span>Estudiantes</span>
                                        <span>{course.studentsCount}/{course.maxStudents}</span>
                                    </div>
                                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-[#8568C0] rounded-full transition-all duration-500"
                                            style={{ width: `${(course.studentsCount / course.maxStudents) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
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

                        <h2 className="text-xl font-bold text-slate-900 mb-6">
                            {editingCourse ? 'Editar Curso' : 'Nuevo Curso'}
                        </h2>

                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label htmlFor="courseTitle" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Nombre del Curso</label>
                                <input
                                    id="courseTitle"
                                    type="text"
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Ej: More English - Básico"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#8568C0]/20 focus:border-[#8568C0] focus:bg-white transition-all text-sm"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="courseCode" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Código</label>
                                    <input
                                        id="courseCode"
                                        type="text"
                                        required
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        placeholder="Ej: ENG-001"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#8568C0]/20 focus:border-[#8568C0] focus:bg-white transition-all text-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="courseType" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Modalidad</label>
                                    <select
                                        id="courseType"
                                        value={type}
                                        onChange={(e) => setType(e.target.value as any)}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#8568C0]/20 focus:border-[#8568C0] focus:bg-white transition-all text-sm"
                                    >
                                        <option value="Grupal">Grupal</option>
                                        <option value="Individual">Individual</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="assignedTeacher" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Profesor Asignado</label>
                                <select
                                    id="assignedTeacher"
                                    value={teacherId}
                                    onChange={(e) => setTeacherId(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#8568C0]/20 focus:border-[#8568C0] focus:bg-white transition-all text-sm"
                                >
                                    {teachersList.map((t) => (
                                        <option key={t.id} value={t.id}>{t.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="courseSchedule" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Horario</label>
                                <input
                                    id="courseSchedule"
                                    type="text"
                                    required
                                    value={schedule}
                                    onChange={(e) => setSchedule(e.target.value)}
                                    placeholder="Ej: Lunes y Miércoles 10:00 AM"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#8568C0]/20 focus:border-[#8568C0] focus:bg-white transition-all text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="startDate" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Fecha de Inicio</label>
                                <input
                                    id="startDate"
                                    type="date"
                                    required
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#8568C0]/20 focus:border-[#8568C0] focus:bg-white transition-all text-sm"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="studentsCount" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Estudiantes Inscritos</label>
                                    <input
                                        id="studentsCount"
                                        type="number"
                                        min="0"
                                        required
                                        value={studentsCount}
                                        onChange={(e) => setStudentsCount(Number.parseInt(e.target.value, 10) || 0)}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#8568C0]/20 focus:border-[#8568C0] focus:bg-white transition-all text-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="maxStudents" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Aforo Máximo</label>
                                    <input
                                        id="maxStudents"
                                        type="number"
                                        min="1"
                                        required
                                        value={maxStudents}
                                        onChange={(e) => setMaxStudents(Number.parseInt(e.target.value, 10) || 1)}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#8568C0]/20 focus:border-[#8568C0] focus:bg-white transition-all text-sm"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#8568C0] text-white py-3 rounded-xl hover:bg-[#7456b3] transition-all duration-300 font-semibold shadow-md hover:shadow-lg shadow-[#8568c0]/20 mt-4 text-sm"
                            >
                                {editingCourse ? 'Guardar Cambios' : 'Crear Curso'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
