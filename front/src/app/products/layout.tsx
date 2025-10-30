import React, {ReactNode} from 'react'
import Header from "@/Components/Header/Header";

function Layout({children}: {children: ReactNode}) {
    return (
        <div>
            <Header></Header>
            {children}

        </div>
    )
}

export default Layout
