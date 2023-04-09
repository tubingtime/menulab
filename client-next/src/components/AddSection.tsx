import { useToken } from "@/lib/SessionManagement";
import { useState } from "react";

const AddSection = ({handleAddSection}) => {
    const jwtToken = useToken();

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        handleAddSection(formData);
        e.target.reset(); // clear form inputs
    };

    return (
        <>
            <form className="mt-2" onSubmit={onSubmit}>
                <div className="row">
                    <Field name="name" />
                </div>
                <div>
                    <button className="btn btn-primary">Add Section</button>
                </div>
            </form>
        </>
    );
};

const Field = (props: { name: string }) => {
    return (
        <>
            <div className="col">
                <input
                    type="text"
                    name={props.name}
                    placeholder={`Enter section ${props.name}.`}
                    className="form-control"
                />
            </div>
        </>
    );
};

export default AddSection;
