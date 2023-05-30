import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { UseStateContext } from "../contexts/ContextProvider";
import Navbar from "../components/Navbar";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState(null);
    const { setUser, setToken } = UseStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        setErrors(null);
        axiosClient
            .post("/login", payload)
            .then(({ data }) => {
                setToken(data.token);
                setUser(data.user);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    if (response.data.errors) {
                        setErrors(response.data.errors);
                    } else {
                        setErrors({
                            email: [response.data.message],
                        });
                    }
                }
            });
    };

    return (
        <div className="bg-[#312E2B] min-h-screen flex justify-center items-center">
            <div className="bg-[#F2F1E4] py-[20px] px-[30px] rounded-[15px]">
                <form
                    onSubmit={onSubmit}
                    className="flex flex-col justify-center items-center gap-[30px] text-[22px]"
                >
                    {errors && (
                        <div className="alert">
                            {Object.keys(errors).map((key) => (
                                <p className="text-red-500" key={key}>
                                    {errors[key][0]}
                                </p>
                            ))}
                        </div>
                    )}

                    <img
                        src="../bilder/mas online.png"
                        alt="img not found"
                        className="rounded-[20px] "
                    />
                    <div className="flex flex-col gap-[4px] w-[400px]">
                        <label for="email">Email</label>
                        <input
                            id="email"
                            ref={emailRef}
                            type="email"
                            placeholder="Email"
                            className="w-full p-[5px]  border-[#474747] border-[1px] rounded-md focus:border-blue-500"
                        />
                        <label for="password">Password</label>
                        <input
                            id="password"
                            ref={passwordRef}
                            type="password"
                            placeholder="Password"
                            className="w-full p-[5px] border-[#474747] border-[1px] rounded-md focus:border-blue-500"
                        />
                    </div>
                    <button className="bg-[#20B2F0] hover:bg-blue-300 w-[50%] text-center py-[4px] rounded-[20px] text-white text-[28px] font-semibold transition-all">
                        Login
                    </button>
                    <span className="message">
                        Not registered?{" "}
                        <Link
                            to="/signup"
                            className="text-black hover:text-blue-600 transition-all"
                        >
                            Create an account
                        </Link>
                    </span>
                    <span className="message">
                        Forgot Password?{" "}
                        <Link
                            to="/reset"
                            className="text-black hover:text-blue-600 transition-all"
                        >
                            Reset Password
                        </Link>
                    </span>
                </form>
            </div>
        </div>
    );
}
