"use client"

import React, { Fragment, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react";
import HomeNav from "@/components/HomeNav"


const Login = () => {
    const [authError, setAuthError] = useState("");
    const searchParams = useSearchParams();
    const router = useRouter();

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });
    const { email, password } = inputs;

    const onChange = e => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    const onSubmitLoginForm = async (e) => {
        e.preventDefault();
        setAuthError("");
        const signInResult = await signIn("credentials", {
            redirect: false,
            email: inputs.email.toLowerCase(),
            password: inputs.password,
        })
        if (!signInResult?.ok) {
            setAuthError("An error ocurred while signing in. Please try again.");
        }
        else {
            const callbackUrl = (searchParams?.get("from") || "/dashboard");
            router.push(callbackUrl);
        }
    }

    return (
        <Fragment>
            <HomeNav />
            <h1 className="display text-center my-5">Login</h1>
            <h3 className="text-center my-2 text-danger">{authError}</h3>
            <div className="w-50 mx-auto">
                <form onSubmit={onSubmitLoginForm}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="form-control my-2"
                        value={email}
                        onChange={e => onChange(e)}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        className="form-control my-2"
                        value={password}
                        onChange={e => onChange(e)}
                    />
                    <button className="btn btn-success btn-block my-2">Submit</button>
                </form>
            </div>
        </Fragment>
    );
};

export default Login;
