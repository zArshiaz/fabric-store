import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value

    // اگه یوزر لاگین نکرده بود → بفرستش صفحه لاگین
    if (!token && request.nextUrl.pathname.startsWith('/profile')) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    if (token && (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register'))) {
        return NextResponse.redirect(new URL('/profile', request.url))
    }

    // در غیر این صورت ادامه بده
    return NextResponse.next()
}

export const config = {
    matcher: ['/profile/:path*', '/login', '/register'],
}
