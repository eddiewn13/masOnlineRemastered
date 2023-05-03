import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { UseStateContext } from "../contexts/ContextProvider";

export default function Profile() {
    const { notification } = UseStateContext();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});

    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setCurrentUser(data);
        });
    }, []);

    useEffect(() => {
        setLoading(true);
        axiosClient
            .get(`/users/${id}`)
            .then(({ data }) => {
                setLoading(false);
                setUser(data);
            })
            .catch(() => {
                setLoading(false);
            });
    }, [id]);

    return (
        <div className="flex flex-col items-center h-screen w-full bg-[#312E2B] text-white">
            {loading && <div className="loading mt-8">Loading...</div>}
            {!loading && user.id === undefined && (
                <>
                    <section className="w-fit h-fit p-[20px] bg-[#202020] flex flex-col gap-3 mt-[40px]">
                        <div className="flex gap-5">
                            <h1>The current user dosen't exist</h1>
                        </div>
                    </section>
                </>
            )}
            {!loading && user.id !== undefined && (
                <>
                    <section className="w-fit h-fit p-[20px] bg-[#202020] flex flex-col gap-8 mt-[10vh] rounded-md">
                        <div className="flex flex-row max-md:flex-col gap-5 w-full">
                            <img
                                src={user.image_id.path}
                                alt="image not found"
                                className="w-[250px] h-[250px] max-md:m-auto"
                            />
                            <div className="flex flex-col justify-between border-gray-400 border-[3px] rounded-xl p-5 text-[30px]">
                                <span>Username: {user.name}</span>
                                <span>Account created: {user.created_at}</span>
                                <span>Description: {user.description}</span>
                                <span>User id: {user.id}</span>
                            </div>
                        </div>
                        {currentUser.id === user.id && (
                            <Link
                                className="text-[24px] font-bold bg-[#90EE90] p-3 rounded-3xl cursor-pointer hover:bg-[#73c073] hover:scale-105 transition-all w-[250px] text-center max-md:m-auto"
                                to={"/profile/edit/" + user.id}
                            >
                                Edit profile
                            </Link>
                        )}
                        <Link
                            className="text-[24px] font-bold bg-[#90EE90] p-3 rounded-3xl cursor-pointer hover:bg-[#73c073] hover:scale-105 transition-all w-[250px] text-center max-md:m-auto"
                            to={"/search"}
                        >
                            Search User
                        </Link>
                        {notification && (
                            <div className="notification">{notification}</div>
                        )}
                    </section>
                </>
            )}
        </div>
    );
}
