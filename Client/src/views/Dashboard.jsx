import React from "react";
import { UseStateContext } from "../contexts/ContextProvider";

export default function Dashboard() {
    const { setShowMenu, showMenu } = UseStateContext();

    const hide = () => {
        setShowMenu(true);
        let code = document.getElementById("gameCode");
        if (code.style.display === "flex") {
            code.style.display = "none";
        } else {
            code.style.display = "flex";
        }
    };
    return (
        <div className="flex flex-col justify-center items-center gap-14 w-screen h-screen">
            <h1 className="text-[80px] font-bold text-center max-sm:text-5xl max-sm:font-semibold">
                {" "}
                Welcome to Mas Online!
            </h1>
            <input
                type="button"
                onClick={hide}
                className="text-[60px] font-semibold  bg-[#90EE90] px-14 py-8 rounded-3xl cursor-pointer hover:bg-[#73c073] max-sm:text-3xl max-sm:p-4 transition-colors"
                value="Play Online"
            />
        </div>
    );
}
