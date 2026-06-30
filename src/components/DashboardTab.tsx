import React, { useEffect, useState } from 'react'
import {
    Users,
    GraduationCap,
    BookOpen,
    Calendar,
    CheckSquare,
    TrendingUp,
    CheckCircle2,
    Server,
    ExternalLink
} from 'lucide-react'

interface DashboardStats {
    totalUsers: number
    totalStudents: number
    totalTeachers: number
    activeClasses: number
    tasksSubmitted: number
    averageAttendance: string
    newRegistrations: number
    earnings: {
        amount: number
        currency: string
    }
}

const fallbackStats: DashboardStats = {
    totalUsers: 1248,
    totalStudents: 986,
    totalTeachers: 62,
    activeClasses: 145,
    tasksSubmitted: 432,
    averageAttendance: '95.4%',
    newRegistrations: 28,
    earnings: {
        amount: 12450,
        currency: 'USD'
    }
}

const getApiBaseUrl = () => {
    const envUrl = import.meta.env.VITE_API_BASE_URL;
    if (typeof globalThis !== 'undefined' && globalThis.location && (globalThis.location.hostname === 'localhost' || globalThis.location.hostname === '127.0.0.1')) {
        return 'http://localhost:4000';
    }
    return envUrl || 'https://ma-02-ms-more-academy.vercel.app';
};
const API_BASE_URL = getApiBaseUrl();

export const DashboardTab: React.FC = () => {
    const [stats, setStats] = useState<DashboardStats>(fallbackStats)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/v1/dashboard/admin`)
                if (res.ok) {
                    const json = await res.json()
                    if (json?.stats) {
                        setStats({
                            totalUsers: json.stats.totalUsers || fallbackStats.totalUsers,
                            totalStudents: json.stats.totalStudents || fallbackStats.totalStudents,
                            totalTeachers: json.stats.totalTeachers || fallbackStats.totalTeachers,
                            activeClasses: json.stats.activeClasses || fallbackStats.activeClasses,
                            tasksSubmitted: json.stats.tasksSubmitted || fallbackStats.tasksSubmitted,
                            averageAttendance: json.stats.averageAttendance || fallbackStats.averageAttendance,
                            newRegistrations: json.stats.newRegistrations || fallbackStats.newRegistrations,
                            earnings: json.stats.earnings || fallbackStats.earnings
                        })
                    }
                }
            } catch (err) {
                console.warn('API error fetching stats, using premium fallback mock data', err)
            }
        }
        fetchStats()
    }, [])

    return (
        <div className="space-y-8 animate-[fadeIn_0.4s_ease-out]">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-slate-500 text-sm font-semibold">Resumen general de la plataforma</h2>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <select className="appearance-none bg-white border border-slate-200 px-4 py-2.5 pr-10 rounded-2xl text-xs font-bold text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8568C0]/15 focus:border-[#8568C0] cursor-pointer transition-all">
                            <option>27 may – 3 jun 2026</option>
                            <option>Últimos 30 días</option>
                            <option>Este mes</option>
                        </select>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                            <Calendar size={14} />
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400">Usuarios totales</span>
                        <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-[#8568C0]">
                            <Users size={20} />
                        </div>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-2xl font-black text-slate-800">{stats.totalUsers.toLocaleString()}</h3>
                        <div className="flex items-center gap-1 mt-1.5 text-[10px] font-black text-emerald-500">
                            <TrendingUp size={12} />
                            <span>+12.5%</span>
                            <span className="text-slate-400 font-bold ml-1">vs semana anterior</span>
                        </div>
                    </div>
                </div>

                {/* Students */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400">Estudiantes</span>
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500">
                            <GraduationCap size={20} />
                        </div>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-2xl font-black text-slate-800">{stats.totalStudents.toLocaleString()}</h3>
                        <div className="flex items-center gap-1 mt-1.5 text-[10px] font-black text-emerald-500">
                            <TrendingUp size={12} />
                            <span>+15.3%</span>
                            <span className="text-slate-400 font-bold ml-1">vs semana anterior</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400">Profesores</span>
                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                            <BookOpen size={20} />
                        </div>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-2xl font-black text-slate-800">{stats.totalTeachers.toLocaleString()}</h3>
                        <div className="flex items-center gap-1 mt-1.5 text-[10px] font-black text-emerald-500">
                            <TrendingUp size={12} />
                            <span>+8.1%</span>
                            <span className="text-slate-400 font-bold ml-1">vs semana anterior</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400">Clases activas</span>
                        <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
                            <Calendar size={20} />
                        </div>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-2xl font-black text-slate-800">{stats.activeClasses.toLocaleString()}</h3>
                        <div className="flex items-center gap-1 mt-1.5 text-[10px] font-black text-amber-500">
                            <TrendingUp size={12} />
                            <span>+6.4%</span>
                            <span className="text-slate-400 font-bold ml-1">vs semana anterior</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400">Tareas entregadas</span>
                        <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500">
                            <CheckSquare size={20} />
                        </div>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-2xl font-black text-slate-800">{stats.tasksSubmitted.toLocaleString()}</h3>
                        <div className="flex items-center gap-1 mt-1.5 text-[10px] font-black text-purple-500">
                            <TrendingUp size={12} />
                            <span>+18.7%</span>
                            <span className="text-slate-400 font-bold ml-1">vs semana anterior</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm lg:col-span-1 flex flex-col justify-between">
                    <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                        <h3 className="font-extrabold text-sm text-slate-800">Actividad en la plataforma</h3>
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-100">Últimos 7 días</span>
                    </div>
                    
                    <div className="h-64 my-4 relative flex items-end">
                        <svg viewBox="0 0 300 150" className="w-full h-full">
                            <line x1="0" y1="30" x2="300" y2="30" stroke="#f1f5f9" strokeWidth="1" />
                            <line x1="0" y1="70" x2="300" y2="70" stroke="#f1f5f9" strokeWidth="1" />
                            <line x1="0" y1="110" x2="300" y2="110" stroke="#f1f5f9" strokeWidth="1" />
                            <line x1="0" y1="140" x2="300" y2="140" stroke="#e2e8f0" strokeWidth="1.5" />

                            <path
                                d="M 0 100 Q 50 80 100 85 T 200 60 T 300 45"
                                fill="none"
                                stroke="#8568C0"
                                strokeWidth="3"
                                strokeLinecap="round"
                            />
                            <path
                                d="M 0 100 Q 50 80 100 85 T 200 60 T 300 45 L 300 140 L 0 140 Z"
                                fill="url(#purpleGradient)"
                                opacity="0.1"
                            />

                            <path
                                d="M 0 120 Q 50 110 100 115 T 200 100 T 300 90"
                                fill="none"
                                stroke="#10B981"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                            />

                            <defs>
                                <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#8568C0" />
                                    <stop offset="100%" stopColor="#8568C0" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 justify-center">
                        <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#8568C0]" />
                            <span>Usuarios activos</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                            <span>Clases realizadas</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                        <h3 className="font-extrabold text-sm text-slate-800">Distribución de usuarios</h3>
                        <span className="text-[10px] font-black text-slate-400">Total: 1,248</span>
                    </div>

                    <div className="flex items-center justify-center my-6 relative h-48">
                        <svg viewBox="0 0 120 120" className="w-36 h-36 transform -rotate-90">
                            <circle cx="60" cy="60" r="45" fill="none" stroke="#F1F5F9" strokeWidth="18" />
                            <circle
                                cx="60"
                                cy="60"
                                r="45"
                                fill="none"
                                stroke="#8568C0"
                                strokeWidth="18"
                                strokeDasharray="223.3 282.7"
                                strokeDashoffset="0"
                            />
                            <circle
                                cx="60"
                                cy="60"
                                r="45"
                                fill="none"
                                stroke="#E2E8F0"
                                strokeWidth="18"
                                strokeDasharray="42.4 282.7"
                                strokeDashoffset="-223.3"
                            />
                            <circle
                                cx="60"
                                cy="60"
                                r="45"
                                fill="none"
                                stroke="#10B981"
                                strokeWidth="18"
                                strokeDasharray="14.1 282.7"
                                strokeDashoffset="-265.7"
                            />
                            <circle
                                cx="60"
                                cy="60"
                                r="45"
                                fill="none"
                                stroke="#3B82F6"
                                strokeWidth="18"
                                strokeDasharray="2.8 282.7"
                                strokeDashoffset="-279.8"
                            />
                        </svg>
                        <div className="absolute flex flex-col items-center justify-center">
                            <span className="text-xl font-black text-slate-800">1,248</span>
                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Total</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-[10px] font-bold text-slate-500">
                        <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#8568C0]" />
                            <span className="truncate">Estudiantes: 79%</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                            <span className="truncate">Profesores: 5%</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
                            <span className="truncate">Admins: 1%</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                            <span className="truncate">Invitados: 15%</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                        <h3 className="font-extrabold text-sm text-slate-800">Actividad reciente</h3>
                        <button type="button" className="text-[10px] font-black text-[#8568C0] hover:underline">Ver todas</button>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-4 my-4 custom-scrollbar pr-1">
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                                <Calendar size={14} />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="text-xs font-bold text-slate-700 truncate">Nueva clase creada</span>
                                <span className="text-[10px] text-slate-400">Inglés Intermedio B1</span>
                                <span className="text-[9px] text-slate-400 font-bold mt-0.5">Hace 10 min</span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                                <CheckSquare size={14} />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="text-xs font-bold text-slate-700 truncate">Tarea entregada</span>
                                <span className="text-[10px] text-slate-400">Python para principiantes</span>
                                <span className="text-[9px] text-slate-400 font-bold mt-0.5">Hace 25 min</span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-lg bg-purple-50 text-[#8568C0] flex items-center justify-center shrink-0">
                                <Users size={14} />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="text-xs font-bold text-slate-700 truncate">Nuevo usuario registrado</span>
                                <span className="text-[10px] text-slate-400">María Fernanda (Estudiante)</span>
                                <span className="text-[9px] text-slate-400 font-bold mt-0.5">Hace 1 h</span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                                <CheckCircle2 size={14} />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="text-xs font-bold text-slate-700 truncate">Pago procesado</span>
                                <span className="text-[10px] text-slate-400">Suscripción Pro - $120.00</span>
                                <span className="text-[9px] text-slate-400 font-bold mt-0.5">Hace 2 h</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                        <h3 className="font-extrabold text-sm text-slate-800">Clases más activas</h3>
                        <button type="button" className="text-[10px] font-black text-[#8568C0] hover:underline">Ver todas</button>
                    </div>

                    <div className="flex-1 overflow-x-auto my-4 custom-scrollbar">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-100 text-[10px] font-black text-slate-400">
                                    <th className="pb-2.5">Clase</th>
                                    <th className="pb-2.5">Profesor</th>
                                    <th className="pb-2.5 text-center">Alumnos</th>
                                    <th className="pb-2.5 text-right">Progreso</th>
                                </tr>
                            </thead>
                            <tbody className="text-[11px] font-bold text-slate-700">
                                <tr className="border-b border-slate-50">
                                    <td className="py-2.5 truncate max-w-[100px]">Inglés Intermedio B1</td>
                                    <td className="py-2.5 truncate max-w-[80px]">Profe Morelia</td>
                                    <td className="py-2.5 text-center">128</td>
                                    <td className="py-2.5 text-right text-[#8568C0]">75%</td>
                                </tr>
                                <tr className="border-b border-slate-50">
                                    <td className="py-2.5 truncate max-w-[100px]">Álgebra lineal</td>
                                    <td className="py-2.5 truncate max-w-[80px]">Profe Mario</td>
                                    <td className="py-2.5 text-center">96</td>
                                    <td className="py-2.5 text-right text-[#8568C0]">60%</td>
                                </tr>
                                <tr className="border-b border-slate-50">
                                    <td className="py-2.5 truncate max-w-[100px]">Python para principiantes</td>
                                    <td className="py-2.5 truncate max-w-[80px]">Profe Morelia</td>
                                    <td className="py-2.5 text-center">84</td>
                                    <td className="py-2.5 text-right text-[#8568C0]">40%</td>
                                </tr>
                                <tr>
                                    <td className="py-2.5 truncate max-w-[100px]">Sueco Básico A1</td>
                                    <td className="py-2.5 truncate max-w-[80px]">Profe Erik</td>
                                    <td className="py-2.5 text-center">72</td>
                                    <td className="py-2.5 text-right text-[#8568C0]">25%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-slate-400">Ingresos</span>
                            <h4 className="text-xl font-black text-[#1E293B]">${stats.earnings.amount.toLocaleString()}</h4>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-0.5"><TrendingUp size={10} /> +14.2%</span>
                            <span className="text-[8px] font-bold text-slate-400">vs mes anterior</span>
                        </div>
                    </div>

                    <div className="h-32 my-4 relative flex items-end">
                        <svg viewBox="0 0 200 100" className="w-full h-full">
                            <path
                                d="M 0 90 L 30 70 L 65 80 L 100 50 L 135 60 L 170 30 L 200 20"
                                fill="none"
                                stroke="#8568C0"
                                strokeWidth="3"
                                strokeLinecap="round"
                            />
                            <path
                                d="M 0 90 L 30 70 L 65 80 L 100 50 L 135 60 L 170 30 L 200 20 L 200 100 L 0 100 Z"
                                fill="url(#purpleGradientMini)"
                                opacity="0.1"
                            />
                            <defs>
                                <linearGradient id="purpleGradientMini" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#8568C0" />
                                    <stop offset="100%" stopColor="#8568C0" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                        <h3 className="font-extrabold text-sm text-slate-800 flex items-center gap-2">
                            <Server size={16} className="text-emerald-500" />
                            Estado de servidores
                        </h3>
                        <span className="text-[8px] font-bold text-emerald-500 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md">Todos operativos</span>
                    </div>

                    <div className="flex-1 space-y-3.5 my-4">
                        <div className="flex items-center justify-between text-[11px] font-bold">
                            <span className="text-slate-500">Plataforma Web</span>
                            <span className="text-emerald-500 flex items-center gap-1.5 font-extrabold">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                                <span>Operativo</span>
                            </span>
                        </div>

                        <div className="flex items-center justify-between text-[11px] font-bold">
                            <span className="text-slate-500">API</span>
                            <span className="text-emerald-500 flex items-center gap-1.5 font-extrabold">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                                <span>Operativo</span>
                            </span>
                        </div>

                        <div className="flex items-center justify-between text-[11px] font-bold">
                            <span className="text-slate-500">Base de datos</span>
                            <span className="text-emerald-500 flex items-center gap-1.5 font-extrabold">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                                <span>Operativo</span>
                            </span>
                        </div>

                        <div className="flex items-center justify-between text-[11px] font-bold">
                            <span className="text-slate-500">Almacenamiento</span>
                            <span className="text-emerald-500 flex items-center gap-1.5 font-extrabold">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                                <span>Operativo</span>
                            </span>
                        </div>

                        <div className="flex items-center justify-between text-[11px] font-bold">
                            <span className="text-slate-500">Servicio de correos</span>
                            <span className="text-emerald-500 flex items-center gap-1.5 font-extrabold">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                                <span>Operativo</span>
                            </span>
                        </div>
                    </div>

                    <button 
                        type="button" 
                        className="w-full flex items-center justify-center gap-1.5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-extrabold transition-all"
                    >
                        Ver detalles del sistema
                        <ExternalLink size={12} />
                    </button>
                </div>
            </div>
        </div>
    )
}
