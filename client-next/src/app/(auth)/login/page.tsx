"use client"

import Link from "next/link";
import React, { Fragment, useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react";



const Login = ({ setAuth }) => {


    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const { email, password } = inputs;

    const onChange = e => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();
        const signInResult = await signIn("email", {
            email: inputs.email.toLowerCase(),
            redirect: false,
            callbackUrl: searchParams?.get("from") || "/dashboard",
        })
    }

    return (
        <Fragment>
            <h1 className="text-center my-5">Login</h1>
            <form onSubmit={onSubmitForm}>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="form-control my-3"
                    value={email}
                    onChange={e => onChange(e)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="form-control my-3"
                    value={password}
                    onChange={e => onChange(e)}
                />
                <button className="btn btn-success btn-block">Submit</button>
            </form>
        </Fragment>
    );
};

export default Login;