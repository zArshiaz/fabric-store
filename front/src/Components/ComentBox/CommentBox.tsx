import React from 'react'
import {FaReply} from "react-icons/fa";
import {AiFillLike} from "react-icons/ai";
import {IComment} from "@/types/comment";
import PrintStarts from "@/Utilities/PrintStarts";
import Day from "@/Utilities/day";
import {useAuthContext} from "@/Contexts/AuthContext";
import Swal from "sweetalert2";
import {useRouter} from "next/navigation";
import AnswerCommentBox from "@/Components/AnswerCommentBox/AnswerCommentBox";
import AnswerCommentForm from "@/Components/AnswerCommentForm/AnswerCommentForm";

function CommentBox({comment}: { comment: IComment}) {
    const router = useRouter();
    const {isLoggedIn} = useAuthContext()
    const [commentLike, setCommentLike] = React.useState<{ count: number, liked: boolean }>({
        count: comment.likesCount,
        liked: comment.likedByCurrentUser
    });
    const [showCommentAnswer, setShowCommentAnswer] = React.useState(false);
    const profile = comment.user.name.split(/\s/)

    const likeCommentHandler = async () => {
        if (!isLoggedIn) {
            const resM = await Swal.fire({
                icon: "warning",
                text: "برای لایک این محصول ابتدا وارد سایت شوید.",
                width: 'auto',
                confirmButtonText: 'باشه',
                showCancelButton: true,
                cancelButtonText: "نه فعلا"
            })
            if (resM.isConfirmed) router.push('/login')
            return null
        }
        await fetch(`http://localhost:4000/api/comment/${comment._id}/like`, {
            method: "POST",
            credentials: 'include',
        }).then((res: Response) => res.json()).then((d) => {
            setCommentLike({count: d.likesCount, liked: d.liked});
            console.log(d)
        })
    }

    const showCommentAnswerHandler = async () => {
        if (!isLoggedIn) {
            const resM = await Swal.fire({
                icon: "warning",
                text: "برای پاسخ به این نظر ابتدا وارد سایت شوید.",
                width: 'auto',
                confirmButtonText: 'باشه',
                showCancelButton: true,
                cancelButtonText: "نه فعلا"
            })
            if (resM.isConfirmed) router.push('/login')
            return null
        }
        setShowCommentAnswer(p => !p)
    }

    if (comment) return (
        <div className={'border border-gray-200 border-r-3 border-r-red-500 rounded-lg p-4 '}>
            <div className={'flex items-center gap-2'}>
                <div className={'bg-red-100 h-[40px] aspect-square rounded-full flex items-center justify-center'}>
                    <span className={'text-sm text-red-500'}>
                        {profile[0][0] + ' . ' + profile[1][0]}
                    </span>
                </div>
                <div className={'flex w-full justify-between sm:justify-start items-center gap-1'}>
                    <div className={''}>
                        <p className={'leading-3'}>{comment.user.name} </p>
                        <Day className={'text-gray-600 text-sm'} date={comment.createdAt}/>
                    </div>
                    <PrintStarts className={'!text-gray-700 !text-base me-2'} count={comment.stars}/>
                </div>
            </div>
            <div className={'my-3'}>
                <p>{comment.text}</p>
            </div>

            <div className={'flex gap-4'}>
                <button onClick={likeCommentHandler}
                        className={`${commentLike.liked ? "bg-red-400 text-white" : ""} flex items-center px-2  border-1 rounded text-red-400 border-red-400 cursor-pointer transition-all hover:bg-red-400 hover:text-white hover:scale-105`}>
                    <AiFillLike className={'me-1'}/>
                    <span className={'mt-1'}>({commentLike.count})</span>
                </button>
                <button
                    onClick={showCommentAnswerHandler}
                    className={`flex items-center px-2  border-1 rounded text-gray-600 border-gray-600 cursor-pointer transition-all hover:bg-gray-600 hover:text-white hover:scale-105`}>
                    <FaReply className={'me-1'}/>
                    <span>{showCommentAnswer ? 'بستن' : 'پاسخ'}</span>
                </button>
            </div>
            <AnswerCommentForm id={comment._id} setShow={setShowCommentAnswer}
                               show={showCommentAnswer}></AnswerCommentForm>
            {comment.answer.length > 0 && (
                <div className={'ms-5 md:ms-14 mt-4 space-y-2'}>
                    {comment.answer.map((item, i) => (
                        <AnswerCommentBox comment={item} key={item._id}></AnswerCommentBox>
                    ))}
                </div>
            )}
        </div>
    )
}

export default CommentBox
