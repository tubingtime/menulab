"use client"
import React, { Fragment, useState, useEffect } from 'react';
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function Dashboard() {

  const [name, setName] = useState("");

  //TODO update type def

  const session = useSession();
  if (session.status === "unauthenticated"){
    redirect("/api/auth/signin")
  }
  console.log("sesh:");
  console.log(session);

async function getName() {
    try {
      const response = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { token: jwtToken.session }
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
