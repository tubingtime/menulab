"use client"

import React, { Fragment, useState, useEffect } from 'react';
import Nav from '@/components/Nav';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import EditMenuName from '@/components/EditMenuName';

const Menus = () => {
    const [menus, setMenus] = useState<any[]>([]);
    // const [searchParams, setSearchParams] = useSearchParams();

    // searchParams.get("menu_id");
    // console.log(searchParams);
    const session = useSession();
    // If the token doesn't exist for some reason give it a default value of "null"
    const jwtToken = session.data?.user.accessToken || "null";

    const deleteMenu = async id => {
        try {
            const deleteItem = await fetch(`http://localhost:5000/dashboard/menus/${id}`, {
                method: "DELETE",
                headers: { token: jwtToken }
            });

            setMenus(menus.filter(menu => menu.menu_id !== id));

        } catch (err: any) {
            console.error(err.message);
        }
    };


    const [name, setName] = useState("");

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            console.log("onSubmit");
            const body = { name };

            /* fetch() makes a GET request by default. */
            console.log(JSON.stringify(body));
            const response = await fetch("http://localhost:5000/dashboard/menus", {
                method: "POST",
                headers: { "Content-Type": "application/json", token: localStorage.token },
                body: JSON.stringify(body)
            });
            console.log(response);

            window.location.reload();
        } catch (err: any) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        const getMenus = async () => {
            try {
                if (jwtToken === "null") {
                    return;
                }
                const response = await fetch("http://localhost:5000/dashboard/menus", {
                    method: "GET",
                    headers: { token: jwtToken }
                });

                const jsonData = await response.json();
                console.log(jsonData);

                // Sort the array by the 'name' field in ascending order
                const sortedData = jsonData.sort((a, b) => a.name.localeCompare(b.name));
                setMenus(sortedData);
            } catch (err: any) {
                console.error(err.message);
            };
        }
        getMenus();
    }, [jwtToken]);

    // Buttons do not have any functionality yet.
    return (
        <Fragment>
            <Nav />
            <section>
                <h1>Menus</h1>
            </section>

            <section>
                <h2>Add a Menu</h2>
                <form className="mt-2" onSubmit={onSubmitForm}>
                    <div className="row">
                        <div className="col">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter a menu name."
                                required
                                className="form-control"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <button className="btn btn-primary">Add</button>
                        </div>
                    </div>
                </form>
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
                                        {/* <button a href="/listitems" className="btn btn-primary" onClick={() => <ListItems id={menu.menu_id} /> }> */}
                                        <Link href={{
                                            pathname: "../dashboard/menus/listitems",
                                            query: {
                                                menu_id: menu.menu_id
                                            }
                                        }} className="btn btn-outline-primary btn-sm">...</Link>
                                        {/*<Link href={`/items?menu_id="${menu.menu_id}"`} className="btn btn-outline-info btn-sm">Edit</Link>*/}
                                        <EditMenuName menu={menu} />
                                        <button className="btn btn-outline-danger btn-sm" onClick={() => deleteMenu(menu.menu_id)}>Delete</button>
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
