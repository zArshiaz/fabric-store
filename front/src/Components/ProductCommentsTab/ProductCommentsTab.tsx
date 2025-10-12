'use client'
import CommentBox from "@/Components/ComentBox/CommentBox";
import {useCallback, useEffect, useMemo, useState} from "react";
import {IComment} from "@/types/comment";
import Alert from "@/Components/Alert/Alert";
import PrintStarts from "@/Utilities/PrintStarts";
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import AddCommentModal from "@/Components/AddCommentModal/AddCommentModal";
import {useAuthContext} from "@/Contexts/AuthContext";
import {useRouter} from "next/navigation";
import Swal from "sweetalert2";

function ProductCommentsTab({productId}: { productId: string, }) {
    const {isLoggedIn}=useAuthContext()
    const router = useRouter();
    const [comments, setComments] = useState<IComment[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddComment, setShowAddComment] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:4000/api/comment/${productId}`, {
            credentials: 'include'
        }).then(res => res.ok ? res.json() : []).then(data => setComments(data)).finally(() => setLoading(false));
    }, [productId])

    const averageStars = useMemo(() => {
        if (comments.length === 0) return 0;
        const sum = comments.reduce((s, c) => s + (Number(c?.stars) || 0), 0);
        return Math.round((sum / comments.length) * 10) / 10;
    }, [comments]);
    const showAddCommentHandler = async ()=>{
        if (!isLoggedIn) {
            const resM = await Swal.fire({
                icon: "warning",
                text: "برای نظر دادن یه این محصول ابتدا وارد سایت شوید.",
                width: 'auto',
                confirmButtonText: 'باشه',
                showCancelButton: true,
                cancelButtonText: "نه فعلا"
            })
            if (resM.isConfirmed) router.push('/login')
            return null
        }
        setShowAddComment(true);
    }

    if (loading) return (
        <div className={'flex items-center justify-center h-20'}>
            <AiOutlineLoading3Quarters className={'animate-spin text-4xl'}/>
        </div>
    );
    return (
        <div>
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-2xl sm:text-3xl">نظرات این محصول</h2>
                <button
                    onClick={showAddCommentHandler}
                    className="py-2 px-3.5 bg-red-500 text-white rounded-xl cursor-pointer shadow transition-all hover:bg-red-600 hover:scale-110 hover:shadow-lg">
                    افزودن نظر +
                </button>
                {showAddComment && (<AddCommentModal show={showAddComment} setShow={setShowAddComment} productId={productId}/>)}
            </div>

            {comments.length > 0 ? (
                <>
                    <div className="h-[150px] rounded-lg bg-rose-50 flex justify-center items-center">
                        <div className="text-center">
                            <h2 className="text-blue-700 mb-1 text-3xl">
                                {averageStars.toLocaleString('fa-IR')}
                            </h2>
                            <PrintStarts className="!text-2xl" count={averageStars}/>
                            <p className="text-gray-600">
                                از {comments.length.toLocaleString('fa-IR')} نظر
                            </p>
                        </div>
                    </div>

                    <div className="mt-3 space-y-3">
                        {comments.map((comment) => (
                            <CommentBox key={comment._id} comment={comment}/>
                        ))}
                    </div>
                </>
            ) : (
                <Alert className="text-lg mt-2" type="warning">
                    هیچ نظری برای این محصول یافت نشد
                </Alert>
            )}
        </div>
    );
}

export default ProductCommentsTab;
