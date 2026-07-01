import http from './http'



export const addCommentById = async (id:string,d:{text:string,stars:number}) => {
    const {data}= await http.post(`/comment/${id}`,d);
    return data
}
export const setAnswerForComment = async (id:string,d:{text:string}) => {
    const {data}= await http.post(`/comment/${id}/answer`,d);
    return data
}

export const likeComment = async (id:string) => {
    const {data}= await http.post<{likesCount:number,liked:boolean}>(`/comment/${id}/like`);
    return data
}
