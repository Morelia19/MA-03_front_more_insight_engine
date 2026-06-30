export interface UserInterface {
    id: string;
    name: string;
    email: string;
    role: 'Estudiante' | 'Profesor' | 'Administrador';
    detail: string;
    status: 'Activo' | 'Inactivo';
}