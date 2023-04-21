import React, { Fragment, useContext, useReducer } from "react";
import { useToken } from "@/lib/SessionManagement";
import Link from 'next/link';
import EditMenuName from '@/components/EditMenuName';
import DeleteMenu from '@/components/DeleteMenu';
import { MenusContext } from "@/lib/menusContext";

const DisplayMenus = () => {
    const jwtToken = useToken();

    const menus = useContext(MenusContext).sort((a, b) => a.name.localeCompare(b.name));

    return (
        <Fragment>
            <div className="row row-cols-1 row-cols-md-2 g-4">
                {menus.map((menu) => (
                    <div className="column" key={menu.menu_id}>
                        <div className="card" >
                            <div className="card-header" style={{ textAlign: 'center' }}>
                                <EditMenuName menu={menu} />
                            </div>
                            <div className="card-body">
                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <Link href={{
                                        pathname: "../dashboard/menus/preview",
                                        query: {
                                            menu_id: menu.menu_id
                                        }
                                    }} className="btn btn-outline-primary btn-sm">Preview</Link>
                                    <Link href={{
                                        pathname: "../dashboard/menus/editor",
                                        query: {
                                            menu_id: menu.menu_id
                                        }
                                    }} className="btn btn-outline-info btn-sm">Edit</Link>
                                    <DeleteMenu menu={menu} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Fragment >
    );
};

export default DisplayMenus;
