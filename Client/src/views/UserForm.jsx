import { parse } from "postcss";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { UseStateContext } from "../contexts/ContextProvider";

export default function UserForm() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const {setNotification} = UseStateContext()
    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        permission_id: '',
        all_permissions: [],
        password: '',
        password_confirmation: '',
    })

    let Permission = [1, 2, 3];

    if (id) {
        useEffect(() => {
            setLoading(true);
            axiosClient.get(`/users/${id}`)
            .then(({data}) => {
                setLoading(false)
                setUser(data)
            })
            .catch(() => {
                setLoading(false);
            })
        }, [])
    }
    
    const onSubmit = (ev) => {
        ev.preventDefault();
        if (user.id) {
            axiosClient.put(`/users/${user.id}`, user)
            .then(() => {
                setNotification('User updated successfully')
                navigate('/users');
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            })
        } else {
            axiosClient.post(`/users`, user)
            .then(() => {
                setNotification('User created successfully')
                navigate('/users');
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            })
        }
    }
    
    return (
        
        <>
        {user.id && <h1>Update User: {user.name}</h1>}
        {!user.id && <h1>New User</h1>}
        <div className="card animated fadeInDown">
            {loading && (
                <div className="text-center">Loading...</div>
            )}
            {errors && <div className="alert"> 
                {Object.keys(errors).map(key =>(
                    <p key={key}>{errors[key][0]}</p>
                ))}
            </div>
            }
            {!loading && 
            
            <form onSubmit={onSubmit}>

                <input value={user.name} onChange={ev => setUser({...user, name: ev.target.value})} placeholder="Name" />
                <input type="email" value={user.email} onChange={ev => setUser({...user, email: ev.target.value})} placeholder="Email" />
                <select onChange={ev => setUser({...user, permission_id: ev.target.value})} placeholder="Permission">
                    {user.all_permissions.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                </select>
                <input type="password" onChange={ev => setUser({...user, password: ev.target.value})} placeholder="Password" />
                <input type="password" onChange={ev => setUser({...user, password_confirmation: ev.target.value})} placeholder="Password Comfirmation" />
                <button className="btn">Save</button>

            </form>}
        </div>
    </>
    
    )
    
}