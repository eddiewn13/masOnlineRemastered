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
        <div id="defaultLayout">
        {user.permission_id == 2 && <Navigate to="main"/>}
        {user.permission_id == 3 && <Navigate to="main"/>}
        {loading && <div className="loading">Loading...</div>}
        {!loading && user.permission_id == 1 &&
        <>
        <div className="content">

            <main className="flex bg-[#312E2B] text-white">

            <a href="#" onClick={onLogout} className=" absolute right-3 text-white text-xl font-bold">Logout</a>
                <Navbar />
                <Outlet />

            </main>
        </div>
        </>
    }
      </div>
    );
  }
