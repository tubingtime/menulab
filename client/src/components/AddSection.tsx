import { useToken } from "@/lib/SessionManagement";
import { useState } from "react";

const AddSection = ({ menu_id, sectionsDispatch }) => {
    const jwtToken = useToken();
    const [formValid, setFormValid] = useState(false);

    async function handleAddSection(formData: FormData) {
        const sectionName = formData.get("name")?.toString() || "null";
        const jsonBody = { name: sectionName }
        try {
            const addSectionResponse = await fetch(`http://localhost:5000/dashboard/section/${menu_id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json", token: jwtToken },
                body: JSON.stringify(jsonBody)
            })
            const jsonData = await addSectionResponse.json();
            const section_id = jsonData.section_id;
            sectionsDispatch({
                type: "added",
                section: { name: sectionName, section_id: section_id }
            })
        } catch (err: any) {
            console.error(err.message);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        handleAddSection(formData);
        e.target.reset();
        setFormValid(false);
    };

    const handleChange = (e) => {
        const form = e.target.form;
        setFormValid(form.checkValidity());
    };

    return (
        <>
            <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#addMenuModal"
            >
                Add Section
            </button>

            <div
                className="modal fade"
                id="addMenuModal"
                tabIndex={-1}
                aria-labelledby="addItemModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="addMenuLabel">Add Section</h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <form onSubmit={onSubmit}>
                            <div className="modal-body">
                                <div className="row">
                                    <Field name="name" onChange={handleChange} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-primary" disabled={!formValid}>Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

const Field = (props: { name: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
    return (
        <>
            <div className="col">
                <input
                    type="text"
                    name={props.name}
                    placeholder={`Enter section ${props.name}.`}
                    className="form-control"
                    required
                    onChange={props.onChange}
                />
            </div>
        </>
    );
}

export default AddSection;
