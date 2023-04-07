import React, { Fragment, useState } from "react";
import { useToken } from "@/lib/SessionManagement";
import 'bootstrap/dist/js/bootstrap.bundle.min';

const AddItem = () => {

    const jwtToken = useToken();

    const [inputs, setInputs] = useState({
        name: '',
        description: '',
        price: ''
    });

    const { name, description, price } = inputs;

    const onChange = e => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            console.log("onSubmit");
            const body = { name, description, price };

            /* fetch() makes a GET request by default. */
            console.log(JSON.stringify(body));
            const response = await fetch("http://localhost:5000/dashboard/item", {
                method: "POST",
                headers: { "Content-Type": "application/json", token: jwtToken },
                body: JSON.stringify(body)
            });
            console.log(response);
            window.location.reload();
        } catch (err: any) {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <form className="mt-2" onSubmit={onSubmitForm}>
                <div className="row">

                    <div className="col">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter item name."
                            required
                            className="form-control"
                            value={name}
                            onChange={e => onChange(e)}
                        />
                    </div>

                    <div className="col">
                        <label>Price</label>
                        <input
                            type="text"
                            name="price"
                            placeholder="Enter item price."
                            className="form-control"
                            value={price}
                            onChange={e => onChange(e)}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label>Description</label>
                        <input
                            type="text"
                            name="description"
                            placeholder="Optional: Add an item description."
                            className="form-control"
                            value={description}
                            onChange={e => onChange(e)}
                        />
                    </div>
                </div>
                <div>
                    <button className="btn btn-primary">Add</button>
                </div>
            </form>
        </Fragment>
    )
}

export default AddItem;
