import Link from "next/link";
import { Fragment } from "react";
import '@/app/globals.css';

import { Silkscreen } from 'next/font/google'
const silkscreen = Silkscreen({
    weight: ['400'],
    subsets: ['latin'],
    display: "auto"
})
export default function HomeNav() {
    return (
        <Fragment>
            <nav className="navbar navbar-light bg-light" >
                <div className="nav-item" >
                    <Link href="/register" className="btn btn-primary">Register</Link>
                </div>
                <div className="mx-auto order-0">
                    <Link className="navbar-brand" href="/dashboard">
                        <div className={silkscreen.className}>
                            MenuLab
                        </div>
                    </Link>
                </div>
                <div className="nav-item" >
                    <Link href="/login" className="btn btn-primary">Login</Link>
                </div>
            </nav>
        </Fragment >
    )
}
