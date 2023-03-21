import React, { Fragment, useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import $ from 'jquery';
import './styles.css';

const MenuItems = ({ setAuth }) => {

  const [name, setName] = useState("");
  // const [menus, setMenus] = useState("");

  // const getMenus = async () => {
  //   try {
  //     const response = await fetch("http://localhost:5000/dashboard/menus", {
  //       method: "GET",
  //       headers: { token: localStorage.token }
  //     });

  //     const jsonData = await response.json();
  //     console.log(jsonData);
  //     // setMenus(jsonData.getMenus);
  //   } catch (err) {
  //       console.error(err.message);
  //   };
  // }

  // useEffect(() => {
  //   getMenus();
  // }, []);

  async function getName() {
    try {
      const response = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseRes = await response.json();

      setName(parseRes.user_name);

    } catch (err) {
      console.error(err.message);
    }
  }

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    setAuth(false);
    toast.success("Logged out successfully!");
  }

  useEffect(() => {
    getName()
  }, [])

  const [isOpen, setIsOpen] = useState(false);
  const [sidenavWidth, setSidenavWidth] = useState(200);

  const toggleNav = () => {
    setIsOpen(!isOpen);
    
  };
  
  useEffect(() => {
    setSidenavWidth(isOpen ? sidenavRef.current.offsetWidth : 200);
  }, []);

  useEffect(() => {
    sidenavRef.current.style.width = isOpen ? `${sidenavWidth}px` : '0';
  }, [isOpen, sidenavWidth]);

  const sidenavRef = useRef(null);

  return (
    <Fragment>
      {/* 
      Converted NavBar Below to React
      https://www.codeply.com/p/RXiaRJEqWj */}
      <div>
          <div id="mySidenav" ref={sidenavRef} className="sidenav" style={{width: `${sidenavWidth}px`}}>
            <h1>Manage</h1>
            <a href="menus">Menus</a>
            <a href="menu-items">Menu Items</a>
          </div>
      </div>

      <nav className="navbar navbar-light bg-light" style= {{ boxShadow: "0px 0px 8px #888888" }} >
        <button className="navbar-toggler hamburger-button" type="button" aria-expanded="false" aria-label="Toggle navigation" onClick={toggleNav} style={{ zIndex: 2 }}>
          <div className={`animated-icon ${isOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
        <div className="mx-auto order-0">
          <a className="navbar-brand" href="dashboard">MenuLab</a>
        </div>
        <form className="form-inline">
          <button className="btn btn-primary" onClick={e => logout(e)}>Logout</button>
        </form>
      </nav>

      <br></br>
      <br></br>
      <h1>Menu Items:</h1>

    </Fragment>
  );
};

export default MenuItems;