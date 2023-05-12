import { Navigate, Outlet } from "react-router-dom";
import { UseStateContext } from "../contexts/ContextProvider";

export default function GuestLayout() {

  const {token} = UseStateContext()
  if (token) {
    return <Navigate to="/users" />;
  }

  return (
    <div className="bg-gradient-to-r from-[#312E2B] to-emerald-400">
        <Outlet />
    </div>
  );
}