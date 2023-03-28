"use client"

import React, { Fragment, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react";
import HomeNav from "@/components/HomeNav"


const Login = () => {
    
    const searchParams = useSearchParams()

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
        const signInResult = await signIn("credentials", {
            email: inputs.email.toLowerCase(),
            password: inputs.password,
            redirect: false,
            callbackUrl: searchParams?.get("from") || "/dashboard",
        })
        console.log("RESULT:")
        console.log(signInResult);
        if (!signInResult?.ok) {
            toast.error("Sign in request failed.");
        }
    }

    return (
        <Fragment>
            <HomeNav />
            <h1 className="text-center my-5">Login</h1>
            <ToastContainer />
            <div className="w-25 mx-auto">
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
            </div>
        </Fragment>
    );
};

export default Login;