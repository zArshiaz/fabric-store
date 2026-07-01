"use client";

import {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {forgotPassword} from "@/api/auth";
import {toast} from "@/Utilities/toast";

type Props = {
    seconds: number;
    message?: string;
    className?:string
};

export default function OtpTimer({seconds,message='تا ارسال مجدد کد',className}: Props) {
    const [timeLeft, setTimeLeft] = useState(seconds);
    const searchParams = useSearchParams()
    const router = useRouter();
    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const minutes = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;

    const resentCode = () => {
        const email = searchParams.get("email");
        if (!email) {
            router.replace('/forgot-password/email');

        } else {
            forgotPassword(email).then(res => {
                toast.fire({
                    icon: "success",
                    text: res.message,
                })
                setTimeLeft(seconds);
            }).catch(err => {
                toast.fire({
                    icon: "error",
                    text: err.response.data.message,
                })
            })
        }

    }
    return (
        <div className={'m-3 '+className}>
            {timeLeft > 0 ? (
                <div className="text-gray-600 text-sm sm:text-base">
                    <span dir="ltr" className="ml-2">{minutes.toLocaleString("fa")} : {secs.toLocaleString("fa").padStart(2, "۰")}</span>
                    <span className={'me-1 '}>{message}</span>
                </div>
            ) : (
                <button onClick={resentCode} className={'px-2 py-0.5 text-sm rounded-lg border-2 border-red-500 text-red-500 transition-colors ease-linear hover:bg-red-500 hover:text-white hover:scale-110 hover:shadow'}>ارسال مجدد</button>
            )}
        </div>
    );
}
