import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { UseStateContext } from "../contexts/ContextProvider";

export default function Profile() {

    const {user, notification, setUser} = UseStateContext()
    
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axiosClient.get('/user')
        .then(({data}) => {
            setUser(data)
            setLoading(false)
        })
    }, [])


    return (
        <div>
            {loading && <div className="loading">Loading...</div>}
            {!loading &&
            <>
            {user.name}
            {user.created_at}
            <Link className="btn-edit" to={'/profile/' + user.id}>Edit</Link>
            {notification && 
                <div className="notification">
                    {notification}
                </div>
            }
            </>
            }
        </div>
    )
}