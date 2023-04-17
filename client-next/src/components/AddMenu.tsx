import { useToken } from "@/lib/SessionManagement";
import React, { Fragment, useState, useEffect } from 'react';

// Either do <AddMenu /> OR
// <AddMenu menuId={menuId} />
const AddMenu = (props?: { menu_id?: any }) => {
  window.bootstrap = require('bootstrap/js/dist/modal');
  const jwtToken = useToken();
  const [menus, setMenus] = useState<any[]>([]);
  const [name, setName] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(JSON.stringify(Object.fromEntries(formData.entries())));

    try {
      const body = { name };

      /* fetch() makes a GET request by default. */
      console.log(JSON.stringify(body));
      const response = await fetch("http://localhost:5000/dashboard/menus", {
        method: "POST",
        headers: { "Content-Type": "application/json", token: jwtToken },
        body: JSON.stringify(body)
      });
      console.log(response);

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
        data-bs-target="#addMenuModal"
      >
        Add Menu
      </button>

      <div
        className="modal fade"
        id="addMenuModal"
        aria-labelledby="addItemModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h4 className="modal-title" id="addMenuLabel">Add Menu</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <form className="mt-2" onSubmit={onSubmitForm}>

              <div className="modal-body">
                <div className="row">
                  <div className="col">
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter a menu name."
                      required
                      className="form-control"
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn btn-primary">Add</button>
              </div>
            </form>
          </div >
        </div >
      </div >
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

export default AddMenu;
