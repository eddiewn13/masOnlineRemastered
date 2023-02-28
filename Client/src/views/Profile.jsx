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
        
            <div className="flex flex-col items-center  h-screen bg-[#312E2B] text-white">
            {loading && <div className="loading">Loading...</div>}
            {!loading &&
            <>
            <section className="w-fit h-fit p-[20px] bg-[#202020] flex flex-col gap-3 mt-[40px]">
                <div className="flex gap-5">
                    <img src="../bilder/NoIcon.png" alt="image not found" className="w-[250px] h-[250px] border-white border-4 rounded-xl" />
                    <div className="flex flex-col justify-between border-white border-4 rounded-xl p-5 text-[30px]">
                        <h1>Username: {user.name}</h1>
                        <h1>Account created: {user.created_at}</h1>
                        <h1>Description:</h1>
                    </div>
                </div>
                <Link className="text-[24px] font-bold bg-[#90EE90] p-3 rounded-3xl cursor-pointer hover:bg-[#73c073] w-[250px] text-center " to={'/profile/edit/' + user.id}>Change profile</Link>
                {notification && 
                    <div className="notification">
                        {notification}
                    </div>
                }
            </section>
            </>
            }
        </div>
    )
}