import React from 'react'
import Header from "@/Components/Header/Header";
import ShoppingProgressBar from '@/Components/ShoppingProgressBar/ShoppingProgressBar';
import ScrollToBottomButton from "@/Components/ScrollToBottomButton/ScrollToBottomButton";

function Layout({children}: {children: React.ReactNode}) {
    return (
        <div>
            <Header />
<ScrollToBottomButton></ScrollToBottomButton>
            <div className={'mt-2 sm:mt-20'}>
                <ShoppingProgressBar/>
                {children}
            </div>
        </div>
    )
}

export default Layout
