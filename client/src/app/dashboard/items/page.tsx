"use client"
import React, { Fragment, useState, useEffect, useReducer } from 'react';
import Nav from '@/components/Nav';
import { useToken } from '@/lib/SessionManagement';
import DisplayItems from '@/components/DisplayItems';
import AddItem from '@/components/AddItem';
import "bootstrap/js/dist/dropdown"
import itemsReducer from '@/lib/itemsReducer';

const Items = () => {
    const jwtToken = useToken();

    const [items, itemsDispatch] = useReducer(itemsReducer, []);

    const getItems = async () => {
        try {
            const response = await fetch("http://localhost:5000/dashboard/items", {
                method: "GET",
                headers: { token: jwtToken }
            });

            const jsonData = await response.json();
            const sortedData = jsonData.sort((a, b) => a.name.localeCompare(b.name));
            itemsDispatch({
                type: 'set',
                items: sortedData
            });
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
                <h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Items</span>
                    <AddItem itemsDispatch={itemsDispatch}/>
                </h1>
            </section>
            <section>
                <DisplayItems items={items} menus={menus} itemsDispatch={itemsDispatch} />
            </section>
        </Fragment >
    );
};

export default Items;
