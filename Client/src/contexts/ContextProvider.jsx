import { createContext } from "react";
import { useContext } from "react";
import { useState } from "react";

const StateContext = createContext(
    {
        user: null,
        token: null,
        notification: null,
        currentUser: null,
        setUser: () => {},
        setToken: () => {},
        setNotification: () => {},
        currentUser: () => {},
    }
);

export const ContextProvider = ({children}) => {

    const [user, setUser] = useState({});
    const [notification, _setNotification] = useState('');
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [currentUser, setCurrentUser] = useState({});

    const setNotification = (message) => {
        _setNotification(message);
        setTimeout(() => {
            _setNotification('');
        }, 5000);
    };

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    };

    return(
        <StateContext.Provider value={{ 
            user,
            token,
            setUser,
            setToken,
            notification,
            setNotification,
            currentUser,
            setCurrentUser,
         }}>
            {children}

        </StateContext.Provider>
    )
}

export const UseStateContext = () => useContext(StateContext);