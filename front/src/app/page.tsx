import Header from '@/Components/Header/Header'
import React from 'react'
import Hero from "@/Components/Hero/Hero";
import LastProducts from "@/Components/LastProducts/LastProducts";
import Footer from "@/Components/Footer/Footer";
import whyDidYouRender from "@welldone-software/why-did-you-render";
import Head from "next/head";



export default function Home() {
    return (
        <>
        <div className={'relative'}>
            <Header></Header>
            <Hero></Hero>
            <LastProducts></LastProducts>
            <Footer></Footer>
        </div>
        </>
    )
}
