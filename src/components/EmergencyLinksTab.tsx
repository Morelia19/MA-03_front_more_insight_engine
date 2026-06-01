import React, { useState } from 'react'
import { Link2, AlertTriangle, Copy, Check, Plus, X } from 'lucide-react'
import { EmergencyLinkItem, UserItem } from '../interface'

interface EmergencyLinksTabProps {
    emergencyLinks: EmergencyLinkItem[]
    setEmergencyLinks: React.Dispatch<React.SetStateAction<EmergencyLinkItem[]>>
    users: UserItem[]
}

export const EmergencyLinksTab: React.FC<EmergencyLinksTabProps> = ({
    emergencyLinks,
    setEmergencyLinks,
    users
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [copiedId, setCopiedId] = useState<string | null>(null)

    const [teacherName, setTeacherName] = useState('')
    const [studentName, setStudentName] = useState('')
    const [url, setUrl] = useState('https://meet.google.com/xyz-pdqk-wmn')

    const teachersList = users.filter(u => u.role === 'Profesor')
    const studentsList = users.filter(u => u.role === 'Estudiante')

    const openCreateModal = () => {
        setTeacherName(teachersList[0]?.name || '')
        setStudentName(studentsList[0]?.name || '')
        setUrl('https://meet.google.com/xyz-pdqk-wmn')
        setIsModalOpen(true)
    }

    const handleGenerate = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        const newLink: EmergencyLinkItem = {
            id: Math.random().toString(36).substring(2, 11),
            teacherName,
            studentName,
            timeAgo: 'Hace unos instantes',
            url
        }

        setEmergencyLinks(prev => [newLink, ...prev])
        setIsModalOpen(false)
    }

    const handleCopy = (id: string, linkUrl: string) => {
        navigator.clipboard.writeText(linkUrl)
        setCopiedId(id)
        setTimeout(() => setCopiedId(null), 2000)
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Links de Emergencia</h1>
                    <p className="text-slate-500 text-sm mt-1">Genera links cuando el profesor no pueda hacerlo</p>
                </div>
                <button
                    type="button"
                    onClick={openCreateModal}
                    className="flex items-center gap-2 bg-[#8568C0] text-white px-5 py-2.5 rounded-2xl hover:bg-[#7456b3] transition-all duration-300 font-semibold shadow-md hover:shadow-lg shadow-[#8568c0]/20"
                >
                    <Plus size={18} />
                    Generar Link
                </button>
            </div>

            <div className="flex gap-4 p-5 bg-amber-50/50 border border-amber-100 rounded-3xl text-amber-800 text-sm font-semibold shadow-xs">
                <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={20} />
                <p className="leading-relaxed">
                    Usa esta función solo cuando el profesor no pueda generar el link a tiempo.
                </p>
            </div>

            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] space-y-4">
                {emergencyLinks.length === 0 ? (
                    <div className="text-center py-12 text-slate-400">
                        No hay links de emergencia generados.
                    </div>
                ) : (
                    emergencyLinks.map((item) => (
                        <div
                            key={item.id}
                            className="border border-slate-100 rounded-2xl p-5 hover:shadow-md transition-all duration-300 bg-white flex justify-between items-center gap-4"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
                                    <Link2 size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800 text-sm leading-snug">
                                        {item.teacherName} → {item.studentName}
                                    </h3>
                                    <p className="text-slate-400 text-xs mt-0.5">{item.timeAgo}</p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => handleCopy(item.id, item.url)}
                                className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${
                                    copiedId === item.id
                                        ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                                        : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                                }`}
                                title="Copiar enlace"
                            >
                                {copiedId === item.id ? <Check size={16} /> : <Copy size={16} />}
                            </button>
                        </div>
                    ))
                )}
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

                        <h2 className="text-xl font-bold text-slate-900 mb-6">Generar Link de Emergencia</h2>

                        <form onSubmit={handleGenerate} className="space-y-4">
                            <div>
                                <label htmlFor="teacher-select" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Profesor</label>
                                <select
                                    id="teacher-select"
                                    value={teacherName}
                                    onChange={(e) => setTeacherName(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#8568C0]/20 focus:border-[#8568C0] focus:bg-white transition-all text-sm animate-[fadeIn_0.3s_ease]"
                                >
                                    {teachersList.map((t) => (
                                        <option key={t.id} value={t.name}>{t.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="student-select" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Estudiante</label>
                                <select
                                    id="student-select"
                                    value={studentName}
                                    onChange={(e) => setStudentName(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#8568C0]/20 focus:border-[#8568C0] focus:bg-white transition-all text-sm"
                                >
                                    {studentsList.map((s) => (
                                        <option key={s.id} value={s.name}>{s.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="url-input" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Link generado (URL)</label>
                                <input
                                    id="url-input"
                                    type="text"
                                    required
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    placeholder="https://meet.google.com/..."
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#8568C0]/20 focus:border-[#8568C0] focus:bg-white transition-all text-sm"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#8568C0] text-white py-3 rounded-xl hover:bg-[#7456b3] transition-all duration-300 font-semibold shadow-md hover:shadow-lg shadow-[#8568c0]/20 mt-4 text-sm"
                            >
                                Generar Link
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
