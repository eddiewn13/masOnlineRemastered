import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { UseStateContext } from "../contexts/ContextProvider";

export default function Reset() {
    const emailRef = useRef();
    const [errors, setErrors] = useState(null);
    const { setUser, setToken } = UseStateContext();

    const onSubmit = (ev) => {
        const payload = {
            email: emailRef.current.value,
        };
        ev.preventDefault()
        axiosClient.post('/reset', payload)
        .then(() => {
            setUser({})
            setToken(null)
            Navigate('/login')
        })
        .catch((err) => {
            setErrors(err.response.data)
        }
        )
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <span>Email</span>
                <input id="email" ref={emailRef} type="text" />
                <input type="submit" />
            </form>
        </div>
    );
}
