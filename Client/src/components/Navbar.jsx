import React from "react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import roomCreation from "../utilities/randomCodeGenerator";
import { UseStateContext } from "../contexts/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../axios-client";

let createCode = roomCreation(5);

export default function Navbar() {
    const [roomCode, setRoomCode] = useState("");
    const { user, setUser, setToken, setShowMenu, showMenu } =
        UseStateContext();

    onload = () => {
        if (window.innerWidth < 865) {
            setShowMenu(false);
        }
    };

    addEventListener("resize", () => {
        if (window.innerWidth < 865) {
            setShowMenu(false);
        } else {
            setShowMenu(true);
        }
    });

    const hamburger = () => {
        if (window.innerWidth < 865) {
        if (showMenu) {
            setShowMenu(false);
        } else {
            setShowMenu(true);
        }
        }
    };

    const joinRoom = () => {
        document.getElementById("gameCode").style.display = "none";
        hamburger();
    };

    const createRoom = () => {
        document.getElementById("gameCode").style.display = "none";
        hamburger();
    };

    const hide = () => {
        let code = document.getElementById("gameCode");
        if (code.style.display === "flex") {
            code.style.display = "none";
        } else {
            code.style.display = "flex";
        }
    };

    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setCurrentUser(data);
        });
    }, []);

    const onLogout = (ev) => {
        ev.preventDefault();
        axiosClient.post("/logout").then(() => {
            setUser({});
            setToken(null);
            Navigate("/login");
        });
    };

    return (
        <>
            {!showMenu && (
                <div
                    className="flex flex-col gap-2 p-8 fixed"
                    onClick={hamburger}
                >
                    <hr className="w-8" />
                    <hr className="w-8" />
                    <hr className="w-8" />
                </div>
            )}
            {showMenu && (
                <section className="flex max-[768px]:fixed">
                    <div className="w-fit min-h-screen px-[10px] py-8 bg-[#202020] text-white flex flex-col gap-[120px] min-w-[120px] z-auto">
                        <Link to={"/dashboard"} onClick={hamburger}>
                            <img
                                src="\bilder\mas online.png"
                                alt="img not found"
                                className="w-[100px] rounded-[20px] hover:scale-[105%] transition"
                            />
                        </Link>
                        <div className="flex flex-col justify-center items-center">
                            <ul className="flex flex-col gap-[30px] text-[26px]">
                                <li>
                                    <button
                                        className="hover:text-slate-200 transition hover:scale-[105%]"
                                        onClick={hide}
                                    >
                                        Play
                                    </button>
                                </li>
                                <li>
                                    <Link
                                        to={"/profile/" + currentUser.id}
                                        onClick={hamburger}
                                    >
                                        <button className="hover:text-slate-200 transition hover:scale-[105%]">
                                            Profile
                                        </button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/guide"} onClick={hamburger}>
                                        <button className="hover:text-slate-200 transition hover:scale-[105%]">
                                            Guide
                                        </button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/store"} onClick={hamburger}>
                                        <button className="hover:text-slate-200 transition hover:scale-[105%]">
                                            Store
                                        </button>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="flex flex-col justify-center items-center text-[22px] gap-5">
                            <Link onClick={onLogout} className="w-full ">
                                <input
                                    type="button"
                                    value="Logout"
                                    className="rounded-[15px] bg-[#a9a9a9] py-[3px] w-full cursor-pointer hover:bg-[#838383] transition-all"
                                />
                            </Link>
                            {user.permission_id === 1 && (
                                <>
                                    <Link to={"users"} className="w-full ">
                                        <input
                                            type="button"
                                            value="Admin"
                                            className="rounded-[15px] bg-[#a81515] py-[3px] w-full cursor-pointer hover:bg-[#911212] transition-all"
                                        />
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                    <div
                        id="gameCode"
                        className="flex-col pt-[250px] items-center bg-[#1C1C1C] text-white  gap-16 text-[40px] w-fit min-h-screen hidden fixed left-[120px] z-50"
                    >
                        <div className="flex flex-col justify-center items-center gap-6">
                            <label for="id" className="text-3xl text-center">
                                Enter Lobby Code
                            </label>
                            <input
                                id="id"
                                type="text"
                                placeholder="Game Code..."
                                className="text-center w-[80%] rounded-xl text-[26px] text-black p-[10px] focus:outline-none"
                                onChange={(event) => {
                                    setRoomCode(event.target.value);
                                    onClick = { createRoom };
                                }}
                            />
                        </div>
                        <div className="flex flex-col gap-8">
                            <Link to={`/play?roomCode=${roomCode}`}>
                                <button
                                    className="text-[26px] font-semibold rounded-[20px] bg-green-500 p-[10px] hover:scale-105 hover:bg-green-400 w-[170px] transition-all"
                                    onClick={joinRoom}
                                >
                                    Join Game
                                </button>
                            </Link>

                            <Link to={`/play?roomCode=${createCode}`}>
                                <button
                                    className="bg-blue-700 rounded-[20px] p-[10px] text-[26px] hover:scale-105 hover:bg-blue-600 w-[170px] transition-all"
                                    onClick={createRoom}
                                >
                                    Create Game
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
