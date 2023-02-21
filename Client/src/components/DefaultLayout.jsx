import { useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axios-client";
import { UseStateContext } from "../contexts/ContextProvider";
import Navbar from "./Navbar";

export default function DefaultLayout() {

    const {user, token, setUser, setToken} = UseStateContext()

    if (!token) {
        return <Navigate to="/login" />
    }

    const onLogout = (ev) => {
        ev.preventDefault()
        axiosClient.post('/logout')
        .then(() => {
            setUser({})
            setToken(null)
        })
    }

    useEffect(() => {
        axiosClient.get('/user')
        .then(({data}) => {
            setUser(data)
        })
    }, [])

    return (
      <div id="defaultLayout">
        {/* <aside>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/users">Users</Link>
        </aside> */}
        <div className="content">


            <main className="flex bg-[#312E2B] text-white">

            <a href="#" onClick={onLogout} className=" absolute right-3">Logout</a>
                <Navbar />
                <Outlet />

            </main>
        </div>
      </div>
    );
  }
