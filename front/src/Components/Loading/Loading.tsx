import React from 'react'
import {LuLoaderCircle} from "react-icons/lu";

function Loading({ className }: { className?: string }) {
    return (
        <div className={`flex justify-center items-center w-full ${className}`} >
            <LuLoaderCircle  className={'text-5xl animate-spin'}/>

        </div>
    )
}

export default Loading
