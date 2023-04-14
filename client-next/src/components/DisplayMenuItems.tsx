import { Fragment, useState } from "react";
import { useToken } from "@/lib/SessionManagement";
import EditItem from "@/components/EditItem";
import AssignToSection from "./AssignToSection";
import DeleteItem from "./DeleteItem";
import Image from 'next/image'

const DisplayMenuItems = ({ items, sections }) => {
    const jwtToken = useToken();
    const [updatedItems, setItems] = useState(items);

    return (
        <Fragment>
            <div className="row row-cols-1 row-cols-md-2 g-4">
                {items.map((item, i) => (
                    <div key={i} className="col">
                        <div className="card" style={{ width: 'auto', height: '20rem' }}>
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <small className="text-muted">{item.price}</small>
                                <p className="card-text">{item.description}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="btn-group">
                                        <EditItem item={item} />
                                        <AssignToSection item={item} sections={sections} />
                                        <DeleteItem item={item} items={items}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Fragment>
    );
};

export default DisplayMenuItems;
