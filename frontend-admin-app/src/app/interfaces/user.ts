export interface User {
    _id?: string
    first_name: string
    last_name: string
    email: string
    password?: string
    confirmPassword?: string
    address?: string
    type: string
    birthdate?: string
    matriculation?: string
    profile_picture?: string,
    socket_ids?: any
}