import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { UseStateContext } from "../contexts/ContextProvider";
import Navbar from "../components/Navbar";

export default function Login() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors , setErrors] = useState(null);
    const {setUser, setToken} = UseStateContext()

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        setErrors(null);
        axiosClient.post ('/login', payload)
        .then(({data}) => {
            setToken(data.token)
            setUser(data.user)
        })
        .catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
                if (response.data.errors) {
                    setErrors(response.data.errors);
                } else {
                    setErrors({
                        email: [response.data.message]
                    });
                }
            }
        })
    }

    return (

        <div className=" min-h-screen flex justify-center items-center">
            <div className="bg-[#F2F1E4] py-[20px] px-[30px] rounded-[15px]">
                <form onSubmit={onSubmit} className="flex flex-col justify-center items-center gap-[30px] text-[22px]">

                    {errors && <div className="alert">
                    {Object.keys(errors).map(key =>(
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                    </div>
                    }


                        <img src="../bilder/mas online.png" alt="img not found" className="rounded-[20px] " />
                    <div className="flex flex-col gap-[4px] w-[400px]">
                    <h1>Your email:</h1>
                    <input ref={emailRef} type="email" placeholder="Email" className="w-full p-[5px]  border-[#474747] border-2"/>
                    <h1>Your password:</h1>
                    <input ref={passwordRef} type="password" placeholder="Password" className="w-full p-[5px] border-[#474747] border-2"/>

                    </div>
                    <button className="bg-[#20B2F0] w-[50%] text-center py-[4px] rounded-[20px] text-white text-[28px] font-semibold" >
                        Login
                    </button>
                    <p className="message">
                        Not registered? <Link to ="/signup" className="text-black hover:text-[blue]">Create an account</Link>
                    </p>
                </form>
            </div>
        </div>

    )
}
