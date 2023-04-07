"use client"

import React, { Fragment, useState, useEffect } from 'react';
import Nav from '@/components/Nav';
import { useSearchParams } from 'next/navigation'
import { useToken } from '@/lib/SessionManagement';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import AddItem from '@/components/AddItem2';
import DisplayMenuItems from '@/components/DisplayMenuItems';
import DisplaySections from '@/components/DisplaySections';

const ListItems = () => {

    const jwtToken = useToken();

    const searchParams = useSearchParams();
    const menu_id = searchParams?.get('menu_id');
    const [menuName, setMenuName] = useState("");

    // Get all items in a menu //
    const [items, setItems] = useState<any[]>([]);
    const getItems = async (menu_id) => {
        try {
            const response = await fetch(`http://localhost:5000/dashboard/menus/${menu_id}`, {
                method: "GET",
                headers: { token: jwtToken }
            });

            const jsonData = await response.json();
            console.log(response);
            // Sort the array by the 'name' field in ascending order
            const sortedData = jsonData.sort((a, b) => a.name.localeCompare(b.name));

            setItems(sortedData);
        } catch (err: any) {
            console.error(err.message);
        };
    }
    useEffect(() => {
        getItems(menu_id);
    }, []);

    return (
        <Fragment>
            <Nav />
            <section>
                <h1>Items</h1>
                <h2>{menuName}</h2>
            </section>
            <section>
                <AddItem menu_id={menu_id} />
            </section>
            <section>
                {/* For each Section */}
                {/* Display Section Name */}
                <DisplaySections menu_id={menu_id} />
            </section>
            <section>
                <DisplayMenuItems items={items} />
            </section>
        </Fragment>
    );
};


export default ListItems;
