import React, { useState } from 'react'
import { Search, Plus, Mail, MoreVertical, GraduationCap, Users, Shield, Trash2, Edit2, X } from 'lucide-react'
import { UserItem } from '../interface'

interface UsersTabProps {
    users: UserItem[]
    setUsers: React.Dispatch<React.SetStateAction<UserItem[]>>
}

export const UsersTab: React.FC<UsersTabProps> = ({ users, setUsers }) => {
    const [activeTab, setActiveTab] = useState<'Estudiante' | 'Profesor' | 'Administrador'>('Estudiante')
    const [searchQuery, setSearchQuery] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingUser, setEditingUser] = useState<UserItem | null>(null)
    const [menuOpenId, setMenuOpenId] = useState<string | null>(null)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState<'Estudiante' | 'Profesor' | 'Administrador'>('Estudiante')
    const [detail, setDetail] = useState('')
    const [status, setStatus] = useState<'Activo' | 'Inactivo'>('Activo')

    const avatarStyles = {
        Estudiante: 'bg-indigo-50 text-indigo-600',
        Profesor: 'bg-purple-50 text-purple-600',
        Administrador: 'bg-orange-50 text-orange-600'
    }

    const detailsPlaceholders = {
        Estudiante: 'More English • Dr. Carlos Mendoza',
        Profesor: '12 clases',
        Administrador: 'Admin Principal'
    }

    const teacherCount = users.filter(u => u.role === 'Profesor').length
    const studentCount = users.filter(u => u.role === 'Estudiante').length
    const adminCount = users.filter(u => u.role === 'Administrador').length

    const filteredUsers = users.filter(user => {
        const matchesTab = user.role === activeTab
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.detail.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesTab && matchesSearch
    })

    const openCreateModal = () => {
        setEditingUser(null)
        setName('')
        setEmail('')
        setRole(activeTab)
        setDetail('')
        setStatus('Activo')
        setIsModalOpen(true)
    }

    const openEditModal = (user: UserItem) => {
        setEditingUser(user)
        setName(user.name)
        setEmail(user.email)
        setRole(user.role)
        setDetail(user.detail)
        setStatus(user.status)
        setIsModalOpen(true)
        setMenuOpenId(null)
    }

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault()
        if (editingUser) {
            setUsers(prev => prev.map(u => u.id === editingUser.id ? { ...u, name, email, role, detail, status } : u))
        } else {
            const newUser: UserItem = {
                id: Math.random().toString(36).substring(2, 11),
                name,
                email,
                role,
                detail,
                status
            }
            setUsers(prev => [...prev, newUser])
        }
        setIsModalOpen(false)
    }

    const handleDelete = (id: string) => {
        if (globalThis.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
            setUsers(prev => prev.filter(u => u.id !== id))
            setMenuOpenId(null)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Gestión de Usuarios</h1>
                    <p className="text-slate-500 text-sm mt-1">Administra profesores, estudiantes y administradores</p>
                </div>
                <button
                    type="button"
                    onClick={openCreateModal}
                    className="flex items-center gap-2 bg-[#8568C0] text-white px-5 py-2.5 rounded-2xl hover:bg-[#7456b3] transition-all duration-300 font-semibold shadow-md hover:shadow-lg shadow-[#8568c0]/20"
                >
                    <Plus size={18} />
                    Nuevo Usuario
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600">
                        <GraduationCap size={24} />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-900">{teacherCount}</div>
                        <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Profesores</div>
                    </div>
                </div>
                
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                        <Users size={24} />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-900">{studentCount}</div>
                        <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Estudiantes</div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600">
                        <Shield size={24} />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-900">{adminCount}</div>
                        <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Administradores</div>
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
                        placeholder="Buscar usuarios..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8568C0]/20 focus:border-[#8568C0] focus:bg-white transition-all text-sm"
                    />
                </div>

                <div className="flex gap-2 border-b border-slate-100 pb-1">
                    {(['Estudiante', 'Profesor', 'Administrador'] as const).map((tab) => {
                        const count = users.filter(u => u.role === tab).length
                        const labelPlurals = {
                            Estudiante: 'Estudiantes',
                            Profesor: 'Profesores',
                            Administrador: 'Administradores'
                        }
                        const labelPlural = labelPlurals[tab]
                        const isActive = activeTab === tab
                        return (
                            <button
                                key={tab}
                                type="button"
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300 ${
                                    isActive
                                        ? 'bg-slate-100 text-slate-900 shadow-sm'
                                        : 'text-slate-400 hover:text-slate-600'
                                }`}
                            >
                                {labelPlural} ({count})
                            </button>
                        )
                    })}
                </div>

                <div className="space-y-4">
                    {filteredUsers.length === 0 ? (
                        <div className="text-center py-12 text-slate-400">
                            No se encontraron usuarios en esta sección.
                        </div>
                    ) : (
                        filteredUsers.map((user) => (
                            <div
                                key={user.id}
                                className="border border-slate-100 rounded-3xl p-5 hover:shadow-md transition-all duration-300 bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold uppercase ${avatarStyles[user.role]}`}>
                                        {user.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-slate-800 text-base leading-snug">{user.name}</h3>
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                user.status === 'Activo' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-500'
                                            }`}>
                                                {user.status}
                                            </span>
                                        </div>
                                        <p className="text-slate-400 text-xs mt-0.5">{user.email}</p>
                                        <p className="text-slate-500 text-xs font-semibold mt-1">{user.detail}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                                    <a
                                        href={`mailto:${user.email}`}
                                        className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-[#8568C0]/5 hover:border-[#8568C0]/30 hover:text-[#8568C0] transition-all text-xs font-bold"
                                    >
                                        <Mail size={14} />
                                        Contactar
                                    </a>

                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() => setMenuOpenId(menuOpenId === user.id ? null : user.id)}
                                            className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all"
                                        >
                                            <MoreVertical size={16} />
                                        </button>

                                        {menuOpenId === user.id && (
                                            <>
                                                <button 
                                                    type="button"
                                                    className="fixed inset-0 z-10 cursor-default bg-transparent w-full h-full" 
                                                    onClick={() => setMenuOpenId(null)} 
                                                />
                                                <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-100 rounded-2xl shadow-xl z-20 overflow-hidden py-1">
                                                    <button
                                                        type="button"
                                                        onClick={() => openEditModal(user)}
                                                        className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-600 hover:bg-slate-50 flex items-center gap-2"
                                                    >
                                                        <Edit2 size={12} />
                                                        Editar
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete(user.id)}
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
                            {editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}
                        </h2>

                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label htmlFor="fullName" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Nombre Completo</label>
                                <input
                                    id="fullName"
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Nombre completo"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#8568C0]/20 focus:border-[#8568C0] focus:bg-white transition-all text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="emailAddress" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Correo Electrónico</label>
                                <input
                                    id="emailAddress"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="correo@ejemplo.com"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#8568C0]/20 focus:border-[#8568C0] focus:bg-white transition-all text-sm"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="userRole" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Rol</label>
                                    <select
                                        id="userRole"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value as any)}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#8568C0]/20 focus:border-[#8568C0] focus:bg-white transition-all text-sm"
                                    >
                                        <option value="Estudiante">Estudiante</option>
                                        <option value="Profesor">Profesor</option>
                                        <option value="Administrador">Administrador</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="userStatus" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Estado</label>
                                    <select
                                        id="userStatus"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value as any)}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#8568C0]/20 focus:border-[#8568C0] focus:bg-white transition-all text-sm"
                                    >
                                        <option value="Activo">Activo</option>
                                        <option value="Inactivo">Inactivo</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="userDetail" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                    Detalle / Asignación
                                </label>
                                <input
                                    id="userDetail"
                                    type="text"
                                    required
                                    value={detail}
                                    onChange={(e) => setDetail(e.target.value)}
                                    placeholder={detailsPlaceholders[role]}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#8568C0]/20 focus:border-[#8568C0] focus:bg-white transition-all text-sm"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#8568C0] text-white py-3 rounded-xl hover:bg-[#7456b3] transition-all duration-300 font-semibold shadow-md hover:shadow-lg shadow-[#8568c0]/20 mt-4 text-sm"
                            >
                                {editingUser ? 'Guardar Cambios' : 'Crear Usuario'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
