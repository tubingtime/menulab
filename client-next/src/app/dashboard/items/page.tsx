"use client"
import React, { Fragment, useState, useEffect } from 'react';
import Nav from '@/components/Nav';
import { useToken } from '@/lib/SessionManagement';
import DisplayItems from '@/components/DisplayItems';
import AddItem from '@/components/AddItem';
import "bootstrap/js/dist/dropdown"

const Items = () => {
    const jwtToken = useToken();

    const [items, setItems] = useState<any[]>([]);

    const getItems = async () => {
        try {
            const response = await fetch("http://localhost:5000/dashboard/items", {
                method: "GET",
                headers: { token: jwtToken }
            });

            const jsonData = await response.json();
            const sortedData = jsonData.sort((a, b) => a.name.localeCompare(b.name));
            setItems(sortedData);
        } catch (err: any) {
            console.error(err.message);
        };
    }

    const [menus, setMenus] = useState<any[]>([]);

    async function getMenus() {
        try {
            const response = await fetch("http://localhost:5000/dashboard/menus", {
                method: "GET",
                headers: { token: jwtToken }
            });

            const jsonData = await response.json();
            const sortedData = jsonData.sort((a, b) => a.name.localeCompare(b.name));
            setMenus(sortedData);
        } catch (err: any) {
            console.error(err.message);
        };
    }

    useEffect(() => {
        getMenus();
        getItems();
    }, []);


    return (
        <Fragment>
            <Nav />
            <section>
                <h1>Items</h1>
            </section>
            <section>
                <h2>Add an Item</h2>
                <AddItem />
            </section>
            <section>
                <h2>Items</h2>
                <DisplayItems items={items} menus={menus} />
            </section>
        </Fragment >
    );
};

export default Items;
