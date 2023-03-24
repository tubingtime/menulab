"use client"
import React, { Fragment, useState, useEffect } from 'react';
import { useSession } from "next-auth/react"

export default function Dashboard() {

  const [name, setName] = useState("");

  
  // TODO need to await session response OR use server sesh?
  const session = useSession();
  
  // If the token doesn't exist for some reason give it a default value of "null"
  console.log(session);
  const jwtToken = session.data?.user.accessToken || "null";

  
  useEffect(() => {
    async function getName() {
      if (jwtToken === "null"){
        return;
      }
      try {
        const API_PORT = process.env.NEXT_PUBLIC_API_PORT;
        const response = await fetch(`http://localhost:${API_PORT}/dashboard/`, {
          method: "GET",
          headers: { token: jwtToken }
        });
  
        const parseRes = await response.json();
  
        setName(parseRes.user_name);
  
      } catch (err) {
        console.error(err);
      }
    }
    getName();
  }, [jwtToken])


  return (
    <Fragment>
      <h1>Dashboard - Welcome {name}</h1>
      <a href="api/auth/signout">Logout</a>
      
    </Fragment>
  );
};
