"use client"
import React, { Fragment, useState, useEffect } from 'react';
import Nav from "@/components/Nav";
import Link from 'next/link';
import { useToken } from '@/lib/SessionManagement';
import LineGraph from '@/components/LineGraph';

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
                <div className="row row-cols-1 row-cols-md-2 g-4">
                    <div className="column">
                        <div className="card border-primary">
                            <div className="card-header">Menus</div>
                            <div className="card-body">
                                <div className="card-text">
                                    <Link href={{ pathname: "../dashboard/menus/", }} className="stretched-link" style={{ textDecoration: 'none', color: 'black' }}>
                                        <h2 >{menuCount}</h2>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div className="card border-primary">
                            <div className="card-header">Items</div>
                            <div className="card-body">
                                <div className="card-text">
                                    <Link href={{ pathname: "../dashboard/items/", }} className="stretched-link" style={{ textDecoration: 'none', color: 'black' }}>
                                        <h2 >{itemCount}</h2>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row row-cols-1 row-cols-md-2 g-4 mt-2">
                    <div className="column">
                        <div className="card border-primary">
                            <div className="card-header">Menu Stats</div>
                            <div className="card-body">
                                <div className="card-text h-100">
                                <LineGraph />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div className="card border-primary">
                            <div className="card-header">Item Stats</div>
                            <div className="card-body">
                                <div className="card-text">
                                    <Link href={{ pathname: "../dashboard/items/", }} className="stretched-link" style={{ textDecoration: 'none', color: 'black' }}>
                                        <h2 >{itemCount}</h2>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </Fragment >
    );
};

Dashboard.session = "asd"
