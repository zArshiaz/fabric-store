'use client'
import {useForm} from "react-hook-form";
import {useAuthContext} from "@/Contexts/AuthContext";
import answerCommentBox from "@/Components/AnswerCommentBox/AnswerCommentBox";

function AnswerCommentForm({id,show,setShow}: {id:string,show: boolean,setShow: (b: boolean) => void}) {
    const {isLoggedIn}=useAuthContext()
    const {register,handleSubmit ,formState:{errors}}=useForm<{text:string}>({
        mode:'onChange'
    })
    const submit=async (d:{text:string})=>{
        if(!isLoggedIn)return;

        await fetch(`http://localhost:4000/api/comment/${id}/answer`,{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(d),
            credentials:'include'
        }).then((res:Response)=>{res.ok?setShow(false):null})
    }
    return (
        <form onSubmit={handleSubmit(submit)} className={`sm:ms-5 transition-[max-height opacity] 
      duration-300 ${show?'visible opacity-100 max-h-30 mt-3':'invisible opacity-0 max-h-0'}`}>
            <div className={'relative'}>
                            <textarea
                                {...register('text', {
                                    required: 'متن پاسخ را بنویس',
                                    minLength: {value: 5, message: 'حداقل 6کاراکتر بنویس'}
                                })}
                                rows={2}
                                placeholder={'متن پاسخ خود را بنویسد'}
                                className="text-base resize-none w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-200 focus:border-transparent outline-none transition-all duration-300"></textarea>
                {errors.text &&
                    <p className={'absolute bottom-1.5 text-[12px] ms-2 text-red-500 '}>{errors.text.message}</p>}
            </div>
            <button type={'submit'}
                    className={'text-sm py-1 px-2.5 cursor-pointer shadow rounded-lg bg-red-500 text-white transition-all hover:scale-105 hover:bg-red-600 hover:shadow-xl'}>ارسال
            </button>
        </form>
    )
}

export default AnswerCommentForm
