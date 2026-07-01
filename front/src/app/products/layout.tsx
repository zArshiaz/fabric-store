import React, {ReactNode} from 'react'
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";

function Layout({children}: {children: ReactNode}) {
    return (
        <div>
            <Header></Header>
            {children}
            <Footer></Footer>
        </div>
    )
}

export default Layout
