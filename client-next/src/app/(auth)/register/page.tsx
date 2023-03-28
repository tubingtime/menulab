"use client"

import Link from "next/link";
import React, { Fragment, useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation"
import HomeNav from "@/components/HomeNav";


const Register = () => {

    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: ''
    });

    const router = useRouter();

    const { name, email, password } = inputs;

    const onChange = e => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {

            const body = { name, email, password };

            const response = await fetch('http://localhost:5000/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();

            if (parseRes.token) {
                toast.success("Registered successfully!");
                router.push("/login");
            } else {
                toast.error(parseRes);
            }


        } catch (err: any) {
            toast.error("Registration failed.");
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <HomeNav />
            <h1 className="text-center my-5">Register</h1>
            <div className="w-25 mx-auto">
                <form onSubmit={onSubmitForm}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        className="form-control my-3"
                        value={name}
                        onChange={e => onChange(e)}
                    />
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

export default Register;