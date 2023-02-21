import { Navigate, Outlet } from "react-router-dom";
import { UseStateContext } from "../contexts/ContextProvider";

export default function GuestLayout() {

  const {token} = UseStateContext()
  if (token) {
    return <Navigate to="/users" />;
  }

  return (
    <div>
        <Outlet />
    </div>
  );
}