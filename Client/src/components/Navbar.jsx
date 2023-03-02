import React from "react";
import { useState } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import roomCreation from "../utilities/randomCodeGenerator";
import { io } from "socket.io-client";
import { UseStateContext } from "../contexts/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../axios-client";


let createCode = roomCreation(5);

export default function Navbar() {
    const [roomCode, setRoomCode] = useState("");
    const {user, token, setUser, setToken} = UseStateContext()
    const [loading, setLoading] = useState(true)

    const joinRoom = () => {
        document.getElementById("gameCode").style.display = "none";
    };

    const createRoom = () => {
        document.getElementById("gameCode").style.display = "none";
    };

    const hide = () => {
        let code = document.getElementById("gameCode");
        if (code.style.display === "flex") {
            code.style.display = "none";
        } else {
            code.style.display = "flex";
        }
    };

    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        axiosClient.get('/user')
        .then(({data}) => {
            setCurrentUser(data)
        })
    }, [])

    const onLogout = (ev) => {
        ev.preventDefault()
        axiosClient.post('/logout')
        .then(() => {
            setUser({})
            setToken(null)
            Navigate('/login')
        })
    }

    return (
        <section className="flex absolute left-0">
            <div className="w-fit min-h-screen px-[10px] py-8 bg-[#202020] text-white flex flex-col gap-[120px] ">
                <Link to={"/dashboard"}>
                    <img
                        src="\bilder\mas online.png"
                        alt="img not found"
                        className="w-[100px] rounded-[20px]"
                    />
                </Link>
                <div className="flex flex-col justify-center items-center">
                    <ul className="flex flex-col gap-[30px] text-[26px]">
                        <li>
                            <button onClick={hide}>Play</button>
                        </li>
                        <li>
                            <Link to={"/profile/" + currentUser.id}>
                                <button>Profile</button>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/guide"}>
                                <button>Guide</button>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/store"}>
                                <button>Store</button>
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className=" flex flex-col justify-center items-center text-[22px] gap-[10px]">

                    <Link onClick={onLogout} className="w-full ">
                        <input
                            type="button"
                            value="Logout"
                            className="rounded-[15px] bg-[#a9a9a9] py-[3px] w-full cursor-pointer hover:bg-[#838383]"
                        />
                    </Link>
                    {user.permission_id === 1 && 
                    <>
                    <Link to={"users"} className="w-full ">
                        <input
                            type="button"
                            value="Admin"
                            className="rounded-[15px] bg-[#a81515] py-[3px] w-full cursor-pointer hover:bg-[#911212]"
                        />
                    </Link>
                    </>
                    }

                </div>
            </div>
            <div
                id="gameCode"
                className="flex-col justify-center items-center bg-[#1C1C1C] text-white  gap-16 text-[40px] w-fit min-h-screen hidden"
            >
                <div className="flex flex-col justify-center items-center gap-6">
                    <h1 className=""> Enter lobby code</h1>
                    <input
                        type="text"
                        placeholder="Game Code..."
                        className="text-center w-[50%] rounded-xl text-[26px] text-black"
                        onChange={(event) => {
                            setRoomCode(event.target.value);
                            onClick = { createRoom };
                        }}
                    />
                    <Link to={`/play?roomCode=${roomCode}`}>
                        <button
                            className="text-[26px] font-bold rounded-[20px] bg-[#90EE90] p-[10px]"
                            onClick={joinRoom}
                        >
                            JOIN GAME
                        </button>
                    </Link>
                </div>

                <Link to={`/play?roomCode=${createCode}`}>
                    <button
                        className="bg-[blue] rounded-[20px] p-[10px] text-[30px]"
                        onClick={createRoom}
                    >
                        CREATE GAME
                    </button>
                </Link>
            </div>
        </section>
    );
}
