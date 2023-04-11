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

    const [itemCount, setItemCount] = useState<number>(0);

    const getItemCount = async () => {
        try {
            const response = await fetch("http://localhost:5000/dashboard/items", {
                method: "GET",
                headers: { token: jwtToken }
            });

            const jsonData = await response.json();
            const count = Object.keys(jsonData).length;
            setItemCount(count);
        } catch (err: any) {
            console.error(err.message);
        };
    }

    const [menuCount, setMenuCount] = useState<number>(0);

    const getMenuCount = async () => {
        try {
            const response = await fetch("http://localhost:5000/dashboard/menus", {
                method: "GET",
                headers: { token: jwtToken }
            });

            const jsonData = await response.json();
            const count = Object.keys(jsonData).length;
            setMenuCount(count);
        } catch (err: any) {
            console.error(err.message);
        };
    }

    useEffect(() => {
        getName();
        getItemCount();
        getMenuCount();
    }, [])


    return (
        <Fragment>
            <Nav />
            <section>
                <h1 className="display">Dashboard</h1>
            </section>
            <section>
                <h2>Welcome, {name}!</h2>
            </section>
            <section>
                <div className="card-deck">
                    <div className="card border-primary mb-3 w-50" >
                        <div className="card-header">Menus</div>
                        <div className="card-body">
                            <h2 className="card-text">{menuCount}</h2>
                        </div>
                    </div>
                    <div className="card border-primary mb-3 w-50">
                        <div className="card-header">Items</div>
                        <div className="card-body">
                            <h2 className="card-text">{itemCount}</h2>
                        </div>
                    </div>
                </div>

            </section >
        </Fragment >
    );
};

Dashboard.session = "asd"
