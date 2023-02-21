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




    const joinRoom = () => {
        document.getElementById("gameCode").style.display ="none"
    };

    const createRoom = () => {
        document.getElementById("gameCode").style.display ="none"

    };


    const hide = () => {
        let code = document.getElementById("gameCode");
            if (code.style.display === "flex") {
            code.style.display = "none";
            } else {
            code.style.display = "flex";
            }
    };

    return (
        <section className="flex  ">
            <div className="w-fit min-h-screen px-[10px] py-8 bg-[#202020] text-white flex flex-col gap-[120px]">
                <img
                    src="../bilder/mas online.png"
                    alt="img not found"
                    className="w-[100px] rounded-[20px]"
                />
                <div className="flex flex-col justify-center items-center">
                    <ul className="flex flex-col gap-[30px] text-[26px]">
                        <li>
                              <button
                              onClick={hide}
                              >
                              Play
                              </button>
                        </li>
                        <li>Profil</li>
                        <li>Guide</li>
                        <li>Store</li>
                    </ul>
                </div>

                <div className=" flex flex-col justify-center items-center text-[22px] gap-[10px]">
                    <Link to={'/login'} className="w-full">
                    <input
                        type="button"
                        value="Login"
                        className="rounded-[15px] bg-[blue] py-[3px] w-full"
                    />
                    </Link>

                    <Link to={'/Signup'} className="w-full">
                    <input
                        type="button"
                        value="Sign up"
                        className="rounded-[15px] bg-[#90EE90] py-[3px] w-full"
                    />
                    </Link>
                </div>



            </div>
            <div
                id="gameCode"
                className="flex flex-col justify-center items-center bg-[#1C1C1C] text-white  gap-16 text-[40px] w-fit min-h-screen hidden"
            >
                <div className="flex flex-col justify-center items-center gap-6">
                    <h1 className=""> Enter lobby code</h1>
                    <input
                        type="text"
                        placeholder="Game Code..."
                        className="text-center w-[50%] rounded-xl text-[26px] text-black"
                        onChange={(event) => {
                            setRoomCode(event.target.value);
                            onClick={createRoom}
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