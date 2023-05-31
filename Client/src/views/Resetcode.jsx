import { useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { UseStateContext } from "../contexts/ContextProvider";

export default function Resetcode() {
    const codeRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState(null);
    const [status, setSatus] = useState(false);
    const { user, setUser, setToken } = UseStateContext();
    const navigate = useNavigate();

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            code: codeRef.current.value,
        };

        axiosClient
            .post("/code", payload)
            .then((response) => {
                const { user } = response.data;
                setErrors(null);
                setUser(user);
                setSatus(true);
            })
            .catch((err) => {
                setErrors(err.response.data.error);
            });
    };

    const newPassword = (ev) => {
        ev.preventDefault();
        const payloadPassword = {
            userid: user.id,
            password: passwordRef.current.value,
        };

        axiosClient
            .post("/newpassword", payloadPassword)
            .then(() => {
                setErrors(null);
                setUser(user);
                console.log(user);
                setSatus(true);
                navigate("/login");
            })
            .catch((err) => {
                setErrors(err.response.data.error);
            });
    };

    return (
        <div className="bg-[#312E2B] h-screen flex items-center justify-center">
            {!status && (
                <form className="bg-[#F2F1E4] rounded-lg p-8" onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="code">
                            Enter Reset Code
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="code"
                            ref={codeRef}
                            type="text"
                            maxLength={6}
                            minLength={6}
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
            )}
            {status && (
                <div className="bg-[#F2F1E4] rounded-lg p-8">
                    <form onSubmit={newPassword}>
                        <div className="mb-4">
                            <label className="block text-black text-sm font-bold mb-2" htmlFor="password">
                                New Password
                            </label>
                            <input
                                className="shadow appearance-none border-2 border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                ref={passwordRef}
                                type="password"
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
            )}
        </div>
    );
}
