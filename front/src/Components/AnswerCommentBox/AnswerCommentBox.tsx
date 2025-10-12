import React from 'react'
import Day from "@/Utilities/day";
import PrintStarts from "@/Utilities/PrintStarts";
import {AnswerComment} from "@/types/comment";

function AnswerCommentBox({comment}: {comment: AnswerComment}) {
    console.log(comment);

    const profile = comment.user.name.split(/\s/)
    return (
        <div className={'p-3 text-sm bg-red-50 border border-red-200 border-r-2 border-r-red-500 rounded-xl'}>
            <div className={'flex items-center gap-2'}>
                <div className={'bg-red-100 h-[35px] aspect-square rounded-full flex items-center justify-center'}>
                    <span className={'text-[12px] text-red-500'}>
                      س.ی
                    </span>
                </div>
                <div className={'flex w-full justify-between sm:justify-start items-start gap-3'}>
                    <div>
                        <p className={'leading-3'}>{comment.user.name} </p>
                        <Day className={'text-gray-600 text-sm'} date={comment.createdAt}/>
                    </div>
                    <span className={'bg-rose-100 text-red-500 py-0.5 px-2 rounded-xl text-[12px]'}>پاسخ</span>
                </div>
            </div>
            <p className={'mt-3'}>
                {comment.text}
            </p>
        </div>
    )
}

export default AnswerCommentBox
