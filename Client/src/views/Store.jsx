import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { UseStateContext } from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";

export default function Store() {
    const navigate = useNavigate();
    const { id } = useParams(); // assuming the id of the page where the pricing table is displayed is passed as a URL parameter

    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setCurrentUser(data);
        });
    }, []);

    const handleSubscriptionSuccess = (event) => {
        // event.detail contains the subscription object
        // you can redirect to a success page or display a thank you message here
        navigate("/dashboard");
    };

    const handleSubscriptionCancelled = (event) => {
        // event.detail contains the subscription object
        // you can redirect to a cancellation page or display a cancellation message here
        navigate("/dashboard");
    };




    return (
        <div className="w-max h-screen m-auto">
            <div className="mt-[20vh] scale-150 bg-[#202020] rounded-3xl max-[1010px]:scale-100 p-2 w-[588px] z-0">
                <stripe-pricing-table 
                    customer-id={currentUser.id}
                    subscription-id={currentUser.subscription_id}
                    pricing-table-id="prctbl_1N41U1KoQAupgAky4D5ygCHe"
                    publishable-key="pk_test_51N0MasKoQAupgAkyGgYunNKdcqYsX5MeFoYv4cPhgFcwxsJKD3eRNeH7eXlkKsM6RfoT8KDIPYEdk8LCtBfYPFok00intkS0dr">
                </stripe-pricing-table>
            </div>
        </div>
    );
}
