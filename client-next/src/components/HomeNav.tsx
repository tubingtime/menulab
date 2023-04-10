import Link from "next/link";
import { Fragment } from "react";
import { Silkscreen } from 'next/font/google'
import '@/app/globals.css';

const silkscreen = Silkscreen({
    weight: ['400'],
    subsets: ['latin']
})

export default function HomeNav() {
    return (
        <Fragment>
            <nav className="navbar navbar-light bg-light" >
                <div className="nav-item" >
                    <Link href="/login" className="btn btn-primary">Login</Link>
                </div>
                <div className="mx-auto order-0">
                    <div className="navbar-brand" style={{}}>
                        <div className={silkscreen.className}>
                            MenuLab
                        </div>
                    </div>
                </div>
                <div className="nav-item" >
                    <Link href="/register" className="btn btn-primary">Register</Link>
                </div>
            </nav>
        </Fragment >
    )
}
