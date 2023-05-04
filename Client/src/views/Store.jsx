import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { UseStateContext } from "../contexts/ContextProvider";

export default function Store() {
    const navigate = useNavigate();
    const { id } = useParams(); // assuming the id of the page where the pricing table is displayed is passed as a URL parameter

    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setCurrentUser(data);
        });
    }, []);

    // handle successful payment
    const handlePaymentSuccess = () => {
        console.log("Payment successful");
        navigate(`/page/${id}?paymentStatus=success`);
    };

    // handle failed payment
    const handlePaymentFailure = () => {
        console.log("Payment failed");
        navigate(`/page/${id}?paymentStatus=failure`);
    };

    return (
        <div className="w-max h-screen m-auto">
            <div className="mt-[20vh] scale-150 bg-[#202020] rounded-3xl max-md:scale-100 max-sm:scale-50 p-2 w-[588px]">
                <stripe-pricing-table
                    className="p-4"
                    pricing-table-id="prctbl_1N41U1KoQAupgAky4D5ygCHe"
                    publishable-key="pk_test_51N0MasKoQAupgAkyGgYunNKdcqYsX5MeFoYv4cPhgFcwxsJKD3eRNeH7eXlkKsM6RfoT8KDIPYEdk8LCtBfYPFok00intkS0dr"
                    allow-top-navigation={true}
                    on-payment-success={handlePaymentSuccess}
                    on-payment-failure={handlePaymentFailure}
                ></stripe-pricing-table>
            </div>
        </div>
    );
}
