"use client"

import React, { Fragment, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react";
import HomeNav from "@/components/HomeNav"


const Login = () => {

    const searchParams = useSearchParams();

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const [authResult, setAuthResult] = useState("");

    const router = useRouter();


    const { email, password } = inputs;

    const onChange = e => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();
        setAuthResult("");
        const signInResult = await signIn("credentials", {
            redirect: false,
            email: inputs.email.toLowerCase(),
            password: inputs.password,
        })
        if (!signInResult?.ok) {
            setAuthResult("An error ocurred while signing in. Please try again.");
        }
        else {
            const callbackUrl = (searchParams?.get("from") || "/dashboard");
            router.push(callbackUrl);
        }
    }

    return (
        <Fragment>
            <HomeNav />
            <h1 className="text-center my-5">Login</h1>
            <h3 className="text-center my-2 text-danger">{authResult}</h3>
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