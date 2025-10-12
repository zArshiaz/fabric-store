'use client'
import PrintStarts from "@/Utilities/PrintStarts";
import {useForm} from "react-hook-form";
import {useAuthContext} from "@/Contexts/AuthContext";

interface IFormValues {
    text: string;
    stars: number;
}

function AddCommentModal({productId,show,setShow}:{productId:string,show:boolean,setShow: (show: boolean) => void;}) {
    const {register,watch, formState: {errors}, handleSubmit} = useForm<IFormValues>({
        mode: "onChange"
    })
    const {isLoggedIn,userInfo}=useAuthContext()
    const stars = Math.max(0,Math.min(watch('stars'),5)) ;

    const submit = async (d: IFormValues) => {
        if(!isLoggedIn)return;
      await fetch(`http://localhost:4000/api/comment/${productId}`, {
          method: "POST",
          body: JSON.stringify(d),
          credentials:'include',
          headers: {'content-type': 'application/json'}
      }).then((response: Response) => {if(response.ok) setShow(false)})
    }


    return (
        <div className={'fixed z-[100] inset-0 h-screen w-screen flex items-center justify-center bg-black/30'}>
            <div className={'w-80 p-3 bg-white rounded-xl'}>
                <div>
                    <h3 className={'text-lg mb-3'}>افزودن نظر</h3>
                    <form onSubmit={handleSubmit(submit)} noValidate={true}>
                        <div className={'relative flex justify-between items-center mb-4'}>
                            <div>
                                <label className={'me-2'} htmlFor="star">امتیاز :</label>
                                <input
                                    id="star"
                                    type="number"
                                    dir="ltr"
                                    placeholder="3.6"
                                    min={0}
                                    max={5}
                                    className="text-left w-20 px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-200 focus:border-transparent outline-none transition-all duration-300"
                                    {...register('stars', {
                                        required: 'لطفا امتیاز خود را وارد کنید',
                                        min: { value: 0, message: 'امتیاز باید مثبت باشد' },
                                        max: { value: 5, message: 'امتیاز باید بیشتر از 5 نباشد' }
                                    })}
                                />
                                {errors.stars &&
                                    <p className={'absolute top-full text-[12px] ms-2 text-red-500 '}>{errors.stars.message}</p>}
                            </div>
                            <PrintStarts count={stars } />
                        </div>
                        <div className={'relative mb-4'}>
                            <textarea
                                {...register('text', {
                                    required: 'متن نظر را بنویس',
                                    minLength: {value: 5, message: 'حداقل 6کاراکتر بنویس'}
                                })}
                                rows={4}
                                placeholder={'متن نظر خود را بنویسد'}
                                className="text-base resize-none w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-200 focus:border-transparent outline-none transition-all duration-300"></textarea>
                            {errors.text &&
                                <p className={'absolute top-full text-[12px] ms-2 text-red-500 '}>{errors.text.message}</p>}
                        </div>
                        <div className={'mt-3 pt-3 border-t border-gray-300 space-x-3'}>
                            <button type={'submit'}
                                    className={'m-0 py-1 px-2.5 cursor-pointer shadow rounded-lg bg-red-500 text-white transition-all hover:scale-105 hover:bg-red-600 hover:shadow-xl'}>ارسال
                            </button>
                            <button
                                onClick={()=>setShow(false)}
                                className={'py-1 px-2.5 cursor-pointer shadow rounded-lg bg-gray-400 text-white transition-all hover:scale-105 hover:bg-gray-500 hover:shadow-xl'}>لفو
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default AddCommentModal
