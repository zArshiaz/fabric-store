import Header from '@/Components/Header/Header'
import React from 'react'
import Hero from "@/Components/Hero/Hero";
import LastProducts from "@/Components/LastProducts/LastProducts";
import Footer from "@/Components/Footer/Footer";

export default function Home() {
    return (
        <div>
            <Header></Header>
            <Hero></Hero>
            <LastProducts></LastProducts>
            {/*<Footer></Footer>*/}
        </div>
    )
}
