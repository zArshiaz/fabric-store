'use client'
import React, { useEffect, useState } from "react";
import {FaArrowDown} from "react-icons/fa";

export default function ScrollToBottomButton({className}: {className?: string}) {
    const [showButton, setShowButton] = useState(true);

    // بررسی اینکه کاربر چقدر پایین اومده
    const handleScroll = () => {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        if (scrollTop + windowHeight >= documentHeight - 50) {
            setShowButton(false); // پنهان کن
        } else {
            setShowButton(true); // نشون بده
        }
    };

    useEffect(() => {
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    },[]);

    const scrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
        });
    };

    return (
        <>
            {showButton && (
                <button className={`${className} fixed bottom-5 right-5 bg-red-800 rounded-full p-3 text-white`} onClick={scrollToBottom}>
                    <FaArrowDown/>
                </button>
            )}
        </>
    );
}




