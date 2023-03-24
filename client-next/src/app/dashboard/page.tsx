"use client"
import React, { Fragment, useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import Nav from "@/components/Nav";

export default function Dashboard() {

  const [name, setName] = useState("");

  
  // TODO need to await session response OR use server sesh?
  const session = useSession();
  
  // If the token doesn't exist for some reason give it a default value of "null"
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
      <Nav />
      <h1>Dashboard - Welcome {name}</h1>      
    </Fragment>
  );
};
