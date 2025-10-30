import type {Metadata} from "next";
import "./globals.css";
import React from "react";
import AuthProvider from "@/Contexts/AuthContext";
import CartProvider from "@/Contexts/CartContext";
import Header from "@/Components/Header/Header";



export const metadata: Metadata = {
    title: {
        default: 'ّFabric ُStore',
        template: 'ّFabric ُStore | %s'
    }

};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {



    return (
        <html lang="fa" dir="rtl">
        <body className={'font-hamishe text-zinc-900'}>
       <CartProvider>
           <AuthProvider>
               {children}
           </AuthProvider>
       </CartProvider>
        </body>
        </html>
    );
}
