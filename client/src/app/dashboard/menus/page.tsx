"use client"
import React, { Fragment, useEffect, useReducer } from 'react';
import Nav from '@/components/Nav';
import { useToken } from '@/lib/SessionManagement';
import AddMenu from '@/components/AddMenu';
import DisplayMenus from '@/components/DisplayMenus';
import menusReducer, { Menu } from '@/lib/menusReducer';
import { MenusContext, MenusDispatchContext } from '@/lib/menusContext';

const Menus = () => {
    const jwtToken = useToken();
    const initialMenus: Menu[] = [];
    const [menus, menusDispatch] = useReducer(menusReducer, initialMenus);

    const getMenus = async () => {
        try {
            const response = await fetch("http://localhost:5000/dashboard/menus", {
                method: "GET",
                headers: { token: jwtToken }
            });

            const jsonData = await response.json();
            const sortedData = jsonData.sort((a, b) => a.name.localeCompare(b.name));
            menusDispatch({
                type: 'set',
                menus: sortedData
            });
        } catch (err: any) {
            console.error(err.message);
        };
    }
    useEffect(() => {
        getMenus();
    }, [])

    return (
        <Fragment>
            <Nav />
            <MenusContext.Provider value={menus}>
                <MenusDispatchContext.Provider value={menusDispatch}>
                    <section>
                        <h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>Menus</span>
                            <AddMenu />
                        </h1>
                    </section>
                    <section>
                        <DisplayMenus />
                    </section>
                </MenusDispatchContext.Provider>
            </MenusContext.Provider>
        </Fragment >
    );
}

export default Menus;
