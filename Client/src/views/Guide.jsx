import React from "react";
import { Link } from "react-router-dom";


export default function Guide() {
    return (
       <section className="w-screen h-screen bg-[#312E2B] flex justify-center items-center">
            <div className="flex gap-24 items-center max-sm:flex-col">
                <Link to={'/phaseOne'}>
                    <input type="button" value="Phase One" className="font-semibold text-5xl text-white bg-[#939393] p-4 rounded-lg hover:bg-[#7a7a7a] cursor-pointer hover:opacity-90 transition-all hover:scale-105"/>
                </Link>
                <Link to={'/phaseTwo'}>
                    <input type="button" value="Phase Two" className="font-semibold text-5xl text-white bg-[#939393] p-4 rounded-lg hover:bg-[#7a7a7a] cursor-pointer hover:opacity-90 transition-all hover:scale-105"/>
                </Link>
            </div>
       </section>
    )
}