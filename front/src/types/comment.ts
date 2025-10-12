
export interface IComment {
    _id: string
    user: User
    productId: string
    text: string
    stars: number
    answer: AnswerComment[]
    createdAt: string
    updatedAt: string
    __v: number
    likesCount:number
    likedByCurrentUser:boolean
}

 interface User {
    _id: string
    name: string
}

export interface AnswerComment {
    user: User
    text: string
    _id: string
    createdAt: string
    updatedAt: string
}