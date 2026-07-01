'use client'
import CommentBox from "@/Components/ComentBox/CommentBox";
import {useCallback, useEffect, useMemo, useState} from "react";
import {IComment} from "@/dtos/comment";
import Alert from "@/Components/Alert/Alert";
import PrintStarts from "@/Utilities/PrintStarts";
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import AddCommentModal from "@/Components/AddCommentModal/AddCommentModal";
import {useAuthContext} from "@/Contexts/AuthContext";
import {useRouter} from "next/navigation";
import Swal from "sweetalert2";
import {IProduct} from "@/dtos/product";

function ProductCommentsTab({product}: { product:IProduct }) {
    const {isLoggedIn}=useAuthContext()
    const router = useRouter();

    const [showAddComment, setShowAddComment] = useState(false);

    const comments=product.comments;
    const showAddCommentHandler = async ()=>{
        if (!isLoggedIn) {
            const resM = await Swal.fire({
                icon: "warning",
                text: "برای ثبت نظر ابتدا وارد سایت شوید.",
                width: 'auto',
                confirmButtonText: 'باشه',
                showCancelButton: true,
                cancelButtonText: "نه فعلا"
            })
            if (resM.isConfirmed) router.push(`/login?redirect=products/${product.slug}`)
            return null
        }
        setShowAddComment(true);
    }


    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl sm:text-3xl">نظرات این محصول</h2>
                <button
                    onClick={showAddCommentHandler}
                    className="py-1 px-3.5 bg-red-500 text-white rounded-xl cursor-pointer shadow transition-all hover:bg-red-600 hover:scale-110 hover:shadow-lg">
                    افزودن نظر +
                </button>
                {showAddComment && (<AddCommentModal show={showAddComment} setShow={setShowAddComment} productId={product._id}/>)}
            </div>

            {comments.length > 0 ? (
                <>
                    <div className="h-[150px] rounded-lg bg-rose-50 flex justify-center items-center">
                        <div className="text-center">
                            <h2 className="text-blue-700 mb-1 text-3xl">
                                {product.ratingAvg.toLocaleString('fa-IR')}
                            </h2>
                            <PrintStarts className="!text-2xl" count={product.ratingAvg}/>
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
