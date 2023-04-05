import Link from "next/link";
import { Fragment } from "react";

export default function HomeNav() {
    return(
        <Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ boxShadow: "0px 0px 8px #888888" }}>
        <div className="container">
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link href="/login" className="btn btn-primary">Login</Link>
                    </li>
                </ul>
                <div className="nav-item ms-auto">
                    <Link href="/register" className="btn btn-primary">Register</Link>
                </div>
            </div>
        </div>
    </nav>
    </Fragment>
    )
}