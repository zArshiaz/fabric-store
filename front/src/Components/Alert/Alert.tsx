import React from 'react'
import {IoWarningOutline} from "react-icons/io5";
import {PiSealWarningDuotone} from "react-icons/pi";

export default function Alert({children, type, className}: {
    children: React.ReactNode,
    type: ('success' | 'info' | 'warning' | 'danger'),
    className?: string
}) {
    return (
        <h4 className={`${type === "warning" && 'text-yellow-500 bg-yellow-50 '} ${type === "danger" && 'text-red-500 bg-red-100'} rounded-xl p-3`}>
            <div className={`flex items-center`}>
                {type === "warning" && <PiSealWarningDuotone className={'font-hamishe-bold text-2xl me-1'}/>}

                <div className={className}>

                    {children}
                </div>
            </div>
        </h4>
    )
}
