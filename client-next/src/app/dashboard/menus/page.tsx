
 

"use client"
import React, { Fragment, useState, useEffect } from 'react';
import Nav from '@/components/Nav';
import Link from 'next/link';
import { useToken } from '@/lib/SessionManagement';
import EditMenuName from '@/components/EditMenuName';
import AddMenu from '@/components/AddMenu';
import DeleteMenu from '@/components/DeleteMenu';

const Menus = () => {
    const jwtToken = useToken();
    const [menus, setMenus] = useState<any[]>([]);

    const [name, setName] = useState("");

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { name };
            const response = await fetch("http://localhost:5000/dashboard/menus", {
                method: "POST",
                headers: { "Content-Type": "application/json", token: jwtToken },
                body: JSON.stringify(body)
            });

            getMenus();
        } catch (err: any) {
            console.error(err.message);
        }
    };
    const getMenus = async () => {
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
    }, [])

    return (
        <Fragment>
            <Nav />
            <section>
                <h1 className="display">Menus</h1>
            </section>

            <section>
                <AddMenu/>
            </section>

            <section>
                <h2>Menus</h2>
                <div className="row row-cols-1 row-cols-md-2 g-4">
                    {menus && menus.map((menu, i) => (
                        <div className="column" key={i}>
                            <div className="card" >
                                <div className="card-header" style={{ textAlign: 'center' }}>
                                    {menu.name}
                                </div>
                                <div className="card-body">
                                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                        <Link href={{
                                            pathname: "../dashboard/menus/editor",
                                            query: {
                                                menu_id: menu.menu_id
                                            }
                                        }} className="btn btn-outline-primary btn-sm">...</Link>
                                        <EditMenuName menu={menu} />
                                        <DeleteMenu menu={menu} menus={menus} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </Fragment >
    );
}

export default Menus;