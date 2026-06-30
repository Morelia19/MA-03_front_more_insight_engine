import React from 'react'
import {
    Users,
    BookOpen,
    Calendar as CalendarIcon,
    CreditCard,
    Link2,
    LogOut,
    Bell,
    ChevronLeft,
    ChevronRight,
    Search,
    LayoutDashboard,
    Video,
    Folder,
    CheckSquare,
    MessageSquare,
    BarChart3,
    Settings,
    HelpCircle,
    ShieldCheck,
    MessageCircle
} from 'lucide-react'
import PuppyMascot from '../assets/img/puppy_mascot.png'

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

interface DashboardLayoutProps {
    isSidebarCollapsed: boolean
    setIsSidebarCollapsed: (value: boolean) => void
    activeTab: TabType
    setActiveTab: (tab: TabType) => void
    handleSignOut: () => void
    children: React.ReactNode
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    activeTab,
    setActiveTab,
    handleSignOut,
    children
}) => {
    const navigationItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'usuarios', label: 'Usuarios', icon: Users },
        { id: 'clases', label: 'Clases', icon: Video },
        { id: 'cursos', label: 'Cursos', icon: BookOpen },
        { id: 'contenido', label: 'Contenido', icon: Folder },
        { id: 'tareas', label: 'Tareas', icon: CheckSquare },
        { id: 'calendario', label: 'Calendario', icon: CalendarIcon },
        { id: 'mensajes', label: 'Mensajes', icon: MessageSquare, badge: 8 },
        { id: 'reportes', label: 'Reportes', icon: BarChart3 },
        { id: 'pagos', label: 'Pagos', icon: CreditCard },
        { id: 'configuracion', label: 'Configuración', icon: Settings },
        { id: 'soporte', label: 'Soporte', icon: HelpCircle },
        { id: 'links', label: 'Links Emergencia', icon: Link2 }
    ] as const

    const tabTitles: Record<TabType, { title: string; subtitle: string }> = {
        dashboard: { title: 'Dashboard', subtitle: 'Resumen general de la plataforma' },
        usuarios: { title: 'Usuarios', subtitle: 'Gestión de profesores, estudiantes y administradores' },
        clases: { title: 'Clases', subtitle: 'Programación e inicio de clases de Zoom/Meet' },
        cursos: { title: 'Cursos', subtitle: 'Catálogo de cursos y asignación de docentes' },
        contenido: { title: 'Contenido', subtitle: 'Gestión de recursos y archivos didácticos' },
        tareas: { title: 'Tareas', subtitle: 'Entregas y calificaciones' },
        calendario: { title: 'Calendario', subtitle: 'Visualización de clases programadas' },
        mensajes: { title: 'Mensajes', subtitle: 'Bandeja de entrada interna' },
        reportes: { title: 'Reportes', subtitle: 'Exportar reportes de matrículas y rendimiento' },
        pagos: { title: 'Pagos', subtitle: 'Boletas, deudas e historial de pagos' },
        configuracion: { title: 'Configuración', subtitle: 'Ajustes del perfil y del sistema' },
        soporte: { title: 'Soporte', subtitle: 'Ayuda y documentación' },
        links: { title: 'Links Emergencia', subtitle: 'Enlaces rápidos para clases' }
    }

    const { title, subtitle } = tabTitles[activeTab]

    return (
        <div className="h-screen flex bg-[#F8FAFC] text-[#1E293B] antialiased font-sans overflow-hidden">
            <aside
                className={`bg-[#0F0F12] text-white flex flex-col justify-between transition-all duration-300 relative border-r border-slate-900 shrink-0 select-none ${
                    isSidebarCollapsed ? 'w-20' : 'w-64'
                }`}
            >
                <div className="flex flex-col min-h-0 flex-1">
                    <div className="h-20 flex items-center gap-3 px-6 border-b border-slate-900 overflow-hidden shrink-0">
                        <div className="w-9 h-9 rounded-xl bg-[#8568C0] flex items-center justify-center text-white shrink-0 shadow-md shadow-[#8568c0]/20">
                            <span className="font-black text-xl italic">m</span>
                        </div>
                        {!isSidebarCollapsed && (
                            <div className="flex flex-col leading-none">
                                <span className="font-extrabold text-base tracking-tight text-white">
                                    more
                                </span>
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                    ACADEMY
                                </span>
                            </div>
                        )}
                    </div>

                    {!isSidebarCollapsed && (
                        <div className="px-6 py-4 shrink-0">
                            <div className="flex items-center gap-3 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                                <div className="w-8 h-8 rounded-lg bg-[#8568C0]/10 flex items-center justify-center text-[#8568C0]">
                                    <ShieldCheck size={18} />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-xs font-black text-white truncate">Panel Admin</span>
                                    <span className="text-[10px] font-bold text-slate-400">Administrador</span>
                                </div>
                            </div>
                        </div>
                    )}

                    <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-1.5 custom-scrollbar">
                        {navigationItems.map((item) => {
                            const Icon = item.icon
                            const isActive = activeTab === item.id

                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-200 text-xs font-extrabold ${
                                        isActive
                                            ? 'bg-[#8568C0] text-white shadow-md shadow-[#8568c0]/15'
                                            : 'text-slate-400 hover:text-white hover:bg-slate-900/40'
                                    }`}
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <Icon size={16} className="shrink-0" />
                                        {!isSidebarCollapsed && <span className="truncate">{item.label}</span>}
                                    </div>
                                    {!isSidebarCollapsed && 'badge' in item && (
                                        <span className="w-5 h-5 rounded-full bg-[#8568C0] flex items-center justify-center text-[10px] font-black text-white">
                                            {item.badge}
                                        </span>
                                    )}
                                </button>
                            )
                        })}
                    </nav>
                </div>

                <div className="shrink-0">
                    {!isSidebarCollapsed && (
                        <div className="mx-4 my-2 p-4 bg-slate-950/60 rounded-2xl border border-slate-800/60 flex flex-col items-center text-center">
                            <img
                                src={PuppyMascot}
                                alt="Mascota More Academy"
                                className="w-20 h-20 object-contain mb-1.5 transform hover:scale-105 transition-all duration-300"
                            />
                            <span className="text-[10px] font-extrabold text-slate-300">¿Necesitas ayuda?</span>
                            <span className="text-[9px] text-slate-400 mb-2">Escríbenos por WhatsApp</span>
                            <a 
                                href="https://wa.me/51999999999" 
                                target="_blank" 
                                rel="noreferrer" 
                                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-[#25D366] hover:bg-[#20ba56] text-white rounded-xl text-[10px] font-black transition-all hover:shadow-lg hover:shadow-green-500/10"
                            >
                                <MessageCircle size={12} className="shrink-0" />
                                WhatsApp
                            </a>
                        </div>
                    )}

                    <div className="p-4 border-t border-slate-900">
                        <button
                            type="button"
                            onClick={handleSignOut}
                            className="w-full flex items-center gap-3.5 px-4 py-2.5 text-slate-400 hover:text-red-400 hover:bg-red-500/5 rounded-xl transition-all text-xs font-extrabold"
                        >
                            <LogOut size={16} className="shrink-0" />
                            {!isSidebarCollapsed && <span>Cerrar Sesión</span>}
                        </button>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    className="absolute -right-3.5 top-24 w-7 h-7 bg-[#8568C0] hover:bg-[#7456b3] text-white rounded-full flex items-center justify-center z-30 shadow-md cursor-pointer transition-all hover:scale-105"
                >
                    {isSidebarCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
                </button>
            </aside>

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="h-20 bg-white border-b border-slate-100 px-6 sm:px-10 flex justify-between items-center shrink-0">
                    <div className="flex flex-col leading-none">
                        <h1 className="text-lg font-black text-slate-800">{title}</h1>
                        <p className="text-xs text-slate-400 mt-1 font-medium">{subtitle}</p>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative w-64 hidden md:block">
                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                                <Search size={16} />
                            </span>
                            <input
                                type="text"
                                placeholder="Buscar en la plataforma..."
                                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8568C0]/15 focus:border-[#8568C0] focus:bg-white transition-all text-xs"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <button 
                                type="button" 
                                className="relative p-2 text-slate-400 hover:text-slate-600 transition-all rounded-xl hover:bg-slate-50"
                            >
                                <Bell size={18} />
                                <span className="absolute top-1 right-1 w-4 h-4 bg-[#8568C0] rounded-full flex items-center justify-center text-[9px] font-black text-white ring-2 ring-white">5</span>
                            </button>
                            <button 
                                type="button" 
                                className="relative p-2 text-slate-400 hover:text-slate-600 transition-all rounded-xl hover:bg-slate-50"
                            >
                                <MessageSquare size={18} />
                                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[9px] font-black text-white ring-2 ring-white">3</span>
                            </button>
                        </div>

                        <div className="h-8 border-l border-slate-100" />

                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <div className="text-xs font-black text-slate-800">Admin More Academy</div>
                                <div className="text-[10px] font-bold text-slate-400 mt-0.5">Administrador</div>
                            </div>
                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-slate-100">
                                <img
                                    src={PuppyMascot}
                                    alt="User avatar"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-6 sm:p-8 bg-[#F8FAFC]">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
