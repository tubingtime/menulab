import { useToken } from "@/lib/SessionManagement";

// Either do <AddItem /> OR
// <AddItem menuId={menuId} />
const AddItem = (props?: { menu_id?: any }) => {
  window.bootstrap = require('bootstrap/js/dist/modal');
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
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addItemModal"
      >
        Add Item
      </button>

      <div
        className="modal fade"
        id="addItemModal"
        tabIndex={-1}
        aria-labelledby="addItemModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="addItemModalLabel">Add Item</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form className="mt-2" onSubmit={onSubmit}>
              <div className="modal-body">

                <div className="row">
                  <Field name="name" />
                  <Field name="price" />
                </div>
                <div className="row">
                  <Field name="description" />
                </div>
                <div className="col">
                  <input type="file" className="form-control mt-3" id="customFile" />
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
