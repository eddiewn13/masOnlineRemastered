import { Navigate, Outlet } from "react-router-dom";
import { UseStateContext } from "../contexts/ContextProvider";
import Navbar from "../components/Navbar"

export default function GuestLayout() {

  const {token} = UseStateContext()
  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
        <Navbar />
        <Outlet />
    </div>
  );
}