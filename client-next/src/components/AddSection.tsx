import { useToken } from "@/lib/SessionManagement";

const AddSection = ({ handleAddSection }) => {
    const jwtToken = useToken();

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
                        <div className="modal-body">
                            <form className="mt-2" onSubmit={onSubmit}>
                                <div className="row">
                                    <Field name="name" />
                                </div>
                                <div>
                                    <button className="btn btn-primary">Add</button>
                                </div>
                            </form>
                        </div>
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
