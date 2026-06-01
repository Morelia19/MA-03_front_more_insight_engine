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
    BookOpen as AdminLogoIcon
} from 'lucide-react'

type TabType = 'usuarios' | 'cursos' | 'calendario' | 'pagos' | 'links'

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
        { id: 'usuarios', label: 'Usuarios', icon: Users },
        { id: 'cursos', label: 'Cursos', icon: BookOpen },
        { id: 'calendario', label: 'Calendario', icon: CalendarIcon },
        { id: 'pagos', label: 'Pagos', icon: CreditCard },
        { id: 'links', label: 'Links Emergencia', icon: Link2 }
    ] as const

    return (
        <div className="h-screen flex bg-slate-50 text-slate-800 antialiased font-sans overflow-hidden">
            <aside
                className={`bg-[#0F0F12] text-white flex flex-col justify-between transition-all duration-300 relative border-r border-slate-900 shrink-0 ${
                    isSidebarCollapsed ? 'w-20' : 'w-64'
                }`}
            >
                <div className="flex flex-col">
                    <div className="h-20 flex items-center gap-3 px-6 border-b border-slate-900 overflow-hidden">
                        <div className="w-9 h-9 rounded-xl bg-[#8568C0] flex items-center justify-center text-white shrink-0 shadow-md shadow-[#8568c0]/20">
                            <AdminLogoIcon size={18} />
                        </div>
                        {!isSidebarCollapsed && (
                            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                                Admin
                            </span>
                        )}
                    </div>

                    <nav className="p-4 space-y-2 mt-4">
                        {navigationItems.map((item) => {
                            const Icon = item.icon
                            const isActive = activeTab === item.id

                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl transition-all duration-200 text-sm font-bold ${
                                        isActive
                                            ? 'bg-[#8568C0] text-white shadow-md shadow-[#8568c0]/20'
                                             : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                                    }`}
                                >
                                    <Icon size={18} className="shrink-0" />
                                    {!isSidebarCollapsed && <span>{item.label}</span>}
                                </button>
                            )
                        })}
                    </nav>
                </div>

                <div className="p-4 border-t border-slate-900">
                    <button
                        type="button"
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3.5 px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-red-500/5 rounded-2xl transition-all text-sm font-bold"
                    >
                        <LogOut size={18} className="shrink-0" />
                        {!isSidebarCollapsed && <span>Cerrar Sesión</span>}
                    </button>
                </div>

                <button
                    type="button"
                    onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    className="absolute -right-3.5 top-24 w-7 h-7 bg-[#8568C0] border border-[#8568C0] hover:bg-[#7456b3] text-white rounded-full flex items-center justify-center z-30 shadow-md cursor-pointer transition-all hover:scale-105"
                >
                    {isSidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                </button>
            </aside>

            <div className="flex-1 flex flex-col min-w-0">
                <header className="h-20 bg-white border-b border-slate-100 px-6 sm:px-10 flex justify-between items-center shrink-0">
                    <div className="relative w-full max-w-md hidden sm:block">
                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                            <Search size={18} />
                        </span>
                        <input
                            type="text"
                            placeholder="Buscar cursos, tareas, foros..."
                            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8568C0]/20 focus:border-[#8568C0] focus:bg-white transition-all text-sm"
                        />
                    </div>
                    <div className="sm:hidden" />

                    <div className="flex items-center gap-6">
                        <button 
                            type="button" 
                            className="relative p-2 text-slate-400 hover:text-slate-600 transition-all rounded-xl hover:bg-slate-50"
                        >
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#8568C0] rounded-full ring-2 ring-white" />
                        </button>

                        <div className="h-8 border-l border-slate-100" />

                        <div className="flex items-center gap-3">
                            <div className="text-right">
                                <div className="text-sm font-bold text-slate-800">q </div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Estudiante</div>
                            </div>
                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-slate-100">
                                <img
                                    src="https://avatar.vercel.sh/maria-garcia.png"
                                    alt="User avatar"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-6 sm:p-10">
                    <div className="max-w-6xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
