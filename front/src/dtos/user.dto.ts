export type TUserInfo = {
    id: string
    name: string
    email: string
    phone: string
    createdAt?: string
    updatedAt?: string
}

export interface IUserDto {
    _id: string
    name: string
    email: string
    createdAt: string
    updatedAt: string
    __v: number
    phone: string
    role: string
}