import { UserItem } from '../interface'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://ma-02-ms-more-academy.vercel.app'

export const getUsers = async (): Promise<UserItem[]> => {
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

export const createUser = async (name: string, email: string, role: string): Promise<UserItem> => {
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
