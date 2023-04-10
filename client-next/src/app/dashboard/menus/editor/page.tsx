"use client"
import React, { Fragment, useState, useEffect } from 'react';
import Nav from '@/components/Nav';
import { useSearchParams } from 'next/navigation'
import { useToken } from '@/lib/SessionManagement';
import AddItem from '@/components/AddItem';
import DisplayMenuItems from '@/components/DisplayMenuItems';
import DisplaySections from '@/components/DisplaySections';
import "bootstrap/js/dist/dropdown"

const ListItems = () => {
    const jwtToken = useToken();
    const searchParams = useSearchParams();
    const menu_id = searchParams?.get('menu_id');
    const [menuName, setMenuName] = useState("");

    const [items, setItems] = useState<any[]>([]);

    const getItems = async (menu_id) => {
        try {
            const response = await fetch(`http://localhost:5000/dashboard/menus/${menu_id}`, {
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

    async function getMenuName(menu_id) {
        try {
            const response = await fetch(`http://localhost:5000/dashboard/menus/name/${menu_id}`, {
                method: "GET",
                headers: { token: jwtToken }
            });

            const jsonData = await response.json();
            setMenuName(jsonData);
        } catch (err: any) {
            console.error(err.message);
        };
    }

    useEffect(() => {
        getItems(menu_id);
        getMenuName(menu_id);
    }, []);

    return (
        <Fragment>
            <Nav />
            <section>
                <h1>{menuName}</h1>
            </section>
            <section>
                <h2>Add Item</h2>
                <AddItem menu_id={menu_id} />
            </section>
            <section>
                <DisplaySections menu_id={menu_id} />
            </section>
            <section>
                <h2>Items</h2>
                <DisplayMenuItems items={items} />
            </section>
        </Fragment>
    );
};

export default ListItems;
