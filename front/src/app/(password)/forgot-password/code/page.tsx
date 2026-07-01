"use client";

import React, {useEffect, useRef, useState} from "react";
import OtpTimer from "@/Components/OptTimer/OpiTimer";
import {useRouter, useSearchParams} from "next/navigation";
import {sendVerifyCode} from "@/api/auth";
import {toast} from "@/Utilities/toast";

export default function VerifyCodePage() {
    const inputs = useRef<(HTMLInputElement | null)[]>([]);
    const searchParams = useSearchParams()
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    let email = searchParams.get("email");


    useEffect(() => {
        if (!email) {
            router.replace('/forgot-password/email')
        }
    }, []);
    const handleChange = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) {
            inputs.current[index]!.value = ''
            return;
        }

        if (value && index < 4) {
            inputs.current[index + 1]?.focus();
        }
        const code = inputs.current.map(i => i?.value || "").join("");
        if (code.length === 5) {
            submit()
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {

        if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    const submit = () => {
        const code = inputs.current.map(i => i?.value || "").join("");
        if (email && code.length === 5) {
            sendVerifyCode(email, code)
                .then((data) => {
                    const current = new URLSearchParams(window.location.search);
                    current.set("token", data.token);
                    router.replace(`/reset-password?${current.toString()}`);
                })
                .catch((error) => {
                    toast.fire({
                        icon: 'error',
                        text: error.response.data.message,
                    })
                    inputs.current.map((item) => {
                        item!.value = ''
                    })
                })
        }

    }

    return (

        <div>
            <h3 className="text-lg  text-center  mb-3 text-gray-800">کد تایید ارسال شده را وارد کنید</h3>

            <div dir={"ltr"} className="flex gap-3 justify-center">
                {[...Array(5)].map((_, i) => (
                    <input
                        key={i}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        ref={(el) => {
                            inputs.current[i] = el;
                        }}
                        onChange={(e) => handleChange(e.target.value, i)}
                        onKeyDown={(e) => handleKeyDown(e, i)}
                        className="sm:w-14 w-12 sm:h-14 h-12 text-center font-dorna text-xl  border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition"
                    />
                ))}
            </div>
            <OtpTimer seconds={3 * 60}></OtpTimer>
        </div>

    );
}
