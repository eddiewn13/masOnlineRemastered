import { createContext } from "react";
import { useContext } from "react";
import { useState } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    notification: null,
    currentUser: null,
    showMenu: null,
    setUser: () => {},
    setToken: () => {},
    setNotification: () => {},
    currentUser: () => {},
    setShowMenu: () => {},
});

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [notification, _setNotification] = useState("");
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
    const [currentUser, setCurrentUser] = useState({});
    const [showMenu, setShowMenu] = useState(true);

    const setNotification = (message) => {
        _setNotification(message);
        setTimeout(() => {
            _setNotification("");
        }, 5000);
    };

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };

    return (
        <StateContext.Provider
            value={{
                user,
                token,
                setUser,
                setToken,
                notification,
                setNotification,
                currentUser,
                setCurrentUser,
                showMenu,
                setShowMenu,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const UseStateContext = () => useContext(StateContext);
