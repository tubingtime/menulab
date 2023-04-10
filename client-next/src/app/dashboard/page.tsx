"use client"
import React, { Fragment, useState, useEffect } from 'react';
import Nav from "@/components/Nav";
import { useToken } from '@/lib/SessionManagement';

export default function Dashboard() {
    const jwtToken = useToken();
    const [name, setName] = useState("");

    async function getName() {
        try {
            const API_PORT = process.env.NEXT_PUBLIC_API_PORT;
            const response = await fetch(`http://localhost:${API_PORT}/dashboard/`, {
                method: "GET",
                headers: { token: jwtToken }
            });

            const parseRes = await response.json();

            setName(parseRes.user_name);

        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getName();
    }, [])


    return (
        <Fragment>
            <Nav />
            <section>
                <h1>Dashboard</h1>
            </section>
            <section>
                <h2>Welcome, {name}!</h2>
            </section>
            <section>
                <div className="card-deck">
                    <div className="card border-primary mb-3 w-25">
                        <div className="card-header">Menus</div>
                        <div className="card-body">
                            <h2 className="card-text">25</h2>
                        </div>
                    </div>
                    <div className="card border-primary mb-3 w-25">
                        <div className="card-header">Items</div>
                        <div className="card-body">
                            <h2 className="card-text">25</h2>
                        </div>
                    </div>
                </div>

            </section >
        </Fragment >
    );
};

Dashboard.session = "asd"
