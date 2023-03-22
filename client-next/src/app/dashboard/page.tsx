"use client"
import React, { Fragment, useState, useEffect } from 'react';
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function Dashboard() {

  const [name, setName] = useState("default");

  // //TODO update type def

  const session = useSession();
  
  // If the token doesn't exist for some reason give it a default value of "null"
  console.log(session);
  const jwtToken = session.data?.user.accessToken || "null";

async function getName() {
    try {
      console.log(jwtToken)
      const response = await fetch("http://localhost:5001/dashboard/", {
        method: "GET",
        headers: { token: jwtToken }
      });

      const parseRes = await response.json();

      setName(parseRes.user_name);

    } catch (err) {
      console.error(err);
    }
  }


  useEffect(() => {
    getName()
  }, [])


  return (
    <Fragment>
      <h1>Dashboard - Welcome {name}</h1>
      <a href="api/auth/signout">Logout</a>
      
    </Fragment>
  );
};
