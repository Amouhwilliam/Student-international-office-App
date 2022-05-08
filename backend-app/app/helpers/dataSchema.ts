export interface TokenData {
    token: string
    expiresIn: number
  }

export interface DataStoredInToken {
    _id: string
  }

export interface User {
    _id: string
    first_name?: string
    last_name?: string
    email?: string
    password?: string
    address?: string
    type?: string
    birthdate?: string
    matriculation?: string
    profile_picture?: string
    created_at?: string
    updated_at?: string
  }

export interface LogInDto {
    email: string
    password: string
  }