import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axios-client";
import { UseStateContext } from "../contexts/ContextProvider";
import Navbar from "./Navbar";

export default function DefaultLayout() {

  const {user, token, setUser, setToken} = UseStateContext()
    const [loading, setLoading] = useState(true)

    const onLogout = (ev) => {
        ev.preventDefault()
        axiosClient.post('/logout')
        .then(() => {
            setUser({})
            setToken(null)
            Navigate('/login')
        })
    }
    useEffect(() => {
        axiosClient.get('/user')
        .then(({data}) => {
            setUser(data)
            setLoading(false)
        })
    }, [])

    if (!token) {
        return <Navigate to="/login" />
    }

  return (
        <div className="content">

            <main className="flex flex-row bg-[#312E2B] text-white w-screen h-screen">

                <Navbar />
                <Outlet />

            </main>
        </div>
  );
}