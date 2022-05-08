export interface User {
    _id?: string
    first_name: string
    last_name: string
    email: string
    password?: string
    address?: string
    type: string
    birthdate?: Date
    matriculation?: string
    profile_picture?: string
}