"use client"

import React, { Fragment, useState, useEffect } from 'react';
import Nav from '@/components/Nav';
import { useSearchParams } from 'next/navigation'
import { useToken } from '@/lib/SessionManagement';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import AddItem from '@/components/AddItem2';

const ListItems = () => {

    const jwtToken = useToken();

    const searchParams = useSearchParams();
    const menu_id = searchParams?.get('menu_id');
    const [menuName, setMenuName] = useState("");

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
        </Fragment>
    );
};


export default ListItems;
