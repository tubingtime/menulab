"use client"
import React, { Fragment, useState, useEffect, useReducer, createContext } from 'react';
import Nav from '@/components/Nav';
import { useSearchParams } from 'next/navigation'
import { useToken } from '@/lib/SessionManagement';
import PreviewSectionItems from '@/components/PreviewSectionItems';
import "bootstrap/js/dist/dropdown"
import itemsReducer from '@/lib/itemsReducer';


const ListItems = () => {
    const jwtToken = useToken();
    const searchParams = useSearchParams();
    const menu_id = searchParams?.get('menu_id');
    const [menuName, setMenuName] = useState("");

    const [items, itemsDispatch] = useReducer(itemsReducer, []);

    createContext(items);

    const getItems = async (menu_id) => {
        try {
            const response = await fetch(`http://localhost:5000/dashboard/menus/${menu_id}`, {
                method: "GET",
                headers: { token: jwtToken }
            });

            const jsonData = await response.json();
            const sortedData = jsonData.sort((a, b) => a.name.localeCompare(b.name));
            itemsDispatch({
                type: 'set',
                items: sortedData
            })
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

    const [sections, setSections] = useState<any[]>([]);
    const getSections = async () => {
        try {
            const response = await fetch(`http://localhost:5000/dashboard/sections/${menu_id}`, {
                method: "GET",
                headers: { token: jwtToken }
            });

            const jsonData = await response.json();
            const sortedData = jsonData.sort((a, b) => a.name.localeCompare(b.name));
            setSections(sortedData);
        } catch (err: any) {
            console.error(err.message);
        };
    }

    useEffect(() => {
        getItems(menu_id);
        getMenuName(menu_id);
        getSections()
    }, []);

    return (
        <Fragment>
            <Nav />
            <section>
                <h1 className='display' style={{ textAlign: 'center' }}>{menuName}</h1>
            </section>
            {sections.map((section) => (
                <section key={section.section_id}>
                    <div>
                        <h2>{section.name}</h2>
                        <PreviewSectionItems section_id={section.section_id} sections={sections} itemsDispatch={itemsDispatch} items={items} />
                    </div>
                </section>
            ))}
        </Fragment >
    );
};

export default ListItems;
