import { useToken } from "@/lib/SessionManagement";

const AddSection = ({ menu_id, sectionsDispatch }) => {
    const jwtToken = useToken();

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
        e.preventDefault(); // not working :[
        const formData = new FormData(e.target);
        handleAddSection(formData);
        e.target.reset(); // clear form inputs
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
                                    <Field name="name" />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-primary">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
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
}

export default AddSection;
