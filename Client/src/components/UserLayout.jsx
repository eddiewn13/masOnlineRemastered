import { useEffect, useState } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axios-client";
import { UseStateContext } from "../contexts/ContextProvider";
import Navbar from "../components/Navbar"

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
        })
    }, [])

    if (!token) {
        return <Navigate to="/login" />
    }

  return (
    <div>
        <Navbar />
        <Outlet />
    </div>
  );
}