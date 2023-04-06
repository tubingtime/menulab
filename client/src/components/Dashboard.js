import React, { Fragment, useState, useEffect } from 'react';
import './nav.css';
import Nav from './Nav';

const Dashboard = () => {

    const [name, setName] = useState("");

    async function getName() {
        try {
            const response = await fetch("http://localhost:5000/dashboard/", {
                method: "GET",
                headers: { token: localStorage.token }
            });

            const parseRes = await response.json();
            setName(parseRes.user_name);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getName()
    }, [])

    return (
        <Fragment>
            <Nav />
            <h1>Welcome {name}!</h1>
        </Fragment>
    );
};

export default Dashboard;
