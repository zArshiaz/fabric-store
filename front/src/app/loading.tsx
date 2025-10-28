import {AiOutlineLoading3Quarters} from "react-icons/ai";

export default function Loading() {
    return (
        <div className="p-4 h-screen w-screen text-center bg-gray-200 flex flex-col items-center justify-center">
            <AiOutlineLoading3Quarters  className={'text-6xl text-gray-400 animate-spin'} />

        </div>
    )

}


