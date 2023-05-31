import { useRef, useState } from "react";
import axiosClient from "../axios-client";
import { UseStateContext } from "../contexts/ContextProvider";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Reset() {
    const emailRef = useRef();
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();

    const onSubmit = (ev) => {
        const payload = {
            email: emailRef.current.value,
        };
        ev.preventDefault();
        axiosClient.post('/reset', payload)
            .then(() => {
                navigate("/resetcode");
            })
            .catch((err) => {
                setErrors(err.response.data);
            });
    };

    return (
        <div className="bg-[#312E2B] h-screen flex items-center justify-center">
            <form
                className="bg-[#F2F1E4] rounded-lg p-8"
                onSubmit={onSubmit}
            >
                <div className="mb-4">
                    <label
                        className="block text-black text-sm font-bold mb-2"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border-2 border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        ref={emailRef}
                        type="text"
                    />
                </div>
                <div className="flex justify-end">
                    <input
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        value="Submit"
                    />
                </div>
            </form>
        </div>
    );
}
