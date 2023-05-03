import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { UseStateContext } from "../contexts/ContextProvider";

export default function Signup() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [errors, setErrors] = useState(null);
    const { setUser, setToken } = UseStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            permission_id: 2,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmRef.current.value,
        };
        axiosClient
            .post("/signup", payload)
            .then(({ data }) => {
                setToken(data.token);
                setUser(data.user);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
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
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    )}
                    <img
                        src="../bilder/mas online.png"
                        alt="img not found"
                        className="rounded-[20px] "
                    />

                    <div className="flex flex-col gap-[4px] w-[400px]">
                        <label for="name">Full Name</label>
                        <input
                            id="name"
                            ref={nameRef}
                            placeholder="Full Name"
                            className="w-full p-[5px]  border-[#474747] border-[1px] rounded-md focus:border-blue-500"
                        />
                        <label for="email">Email</label>
                        <input
                            id="email"
                            ref={emailRef}
                            type="email"
                            placeholder="Email Address"
                            className="w-full p-[5px]  border-[#474747] border-[1px] rounded-md focus:border-blue-500"
                        />
                        <label for="password">Password</label>
                        <input
                            id="password"
                            ref={passwordRef}
                            type="password"
                            placeholder="Password"
                            className="w-full p-[5px]  border-[#474747] border-[1px] rounded-md focus:border-blue-500"
                        />
                        <label for="Cpassword">Confirm Password:</label>
                        <input
                            id="Cpassword"
                            ref={passwordConfirmRef}
                            type="password"
                            placeholder="Password Confirmation"
                            className="w-full p-[5px]  border-[#474747] border-[1px] rounded-md focus:border-blue-500"
                        />
                    </div>
                    <button className="bg-[#20B2F0] w-[50%] text-center py-[4px] rounded-[20px] text-white text-[28px] font-semibold hover:bg-blue-300 transition-all">
                        Signup
                    </button>
                    <p className="message">
                        Already Registered?{" "}
                        <Link
                            to="/login"
                            className="text-black hover:text-blue-600 transition-all"
                        >
                            Sign in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
