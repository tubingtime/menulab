import { useToken } from "@/lib/SessionManagement";

// Either do <AddItem /> OR
// <AddItem menuId={menuId} />
const AddItem = (props?: { menu_id?: any }) => {
    const jwtToken = useToken();

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        try {
            // Do POST Request
            const addItem = await fetch("http://localhost:5000/dashboard/item", {
                method: "POST",
                headers: { "Content-Type": "application/json", token: jwtToken },
                body: JSON.stringify(Object.fromEntries(formData.entries()))
            });
            const results: { item_id: number }[] = await addItem.json();
            const item_id = results[0].item_id;

            if (props?.menu_id) {
                // Assign (do second POST request).
                const assignItem = await fetch(`http://localhost:5000/dashboard/menus/item/${item_id}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json", token: jwtToken },
                    body: JSON.stringify({ menu_id: props.menu_id })
                });
            }

        } catch (err: any) {
            console.error(err.message);
        }
        window.location.reload();
    };

    return (
        <>
            <form className="mt-2" onSubmit={onSubmit}>
                <div className="row">
                    <Field name="name" />
                    <Field name="price" />
                </div>
                <div className="row">
                    <Field name="description" />
                </div>
                <div>
                    <button className="btn btn-primary">Add</button>
                </div>
            </form>
        </>
    );
};

const Field = <T extends string | number>(props: { name: string }) => {
    return (
        <>
            <div className="col">
                <input
                    type="text"
                    name={props.name}
                    placeholder={`Enter item ${props.name}.`}
                    className="form-control"
                />
            </div>
        </>
    );
};

export default AddItem;
