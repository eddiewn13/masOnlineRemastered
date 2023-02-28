import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
        image_id: '',
        all_images: [],
        password: '',
        password_confirmation: '',
    })
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        axiosClient.get('/user')
        .then(({data}) => {
            setCurrentUser(data)
            console.log(data);
        })
    }, [])

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
    
    console.log(user);
    if(user.id !== currentUser.id && user.id !== null){
        navigate('/dashboard');
    }

    useEffect(() => {
        if (typeof user.permission_id === 'object' || typeof user.image_id === 'object') {
            setUser({...user, permission_id: user.permission_id.id, image_id: user.image_id.id})
        }
    }, [user])
    
    const onSubmit = (ev) => {

        ev.preventDefault();
        if (user.id) {
            axiosClient.put(`/users/${user.id}`, user)
            .then(() => {
                setNotification('User updated successfully')
                navigate('/profile/' + user.id);
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
                navigate('/profile/' + user.id);
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


                <Link className="btn-edit" to={'/profile'}>Back</Link>
                <input value={user.name} onChange={ev => setUser({...user, name: ev.target.value})} placeholder="Name" />
                <input type="email" value={user.email} onChange={ev => setUser({...user, email: ev.target.value})} placeholder="Email" />
                <select onChange={ev => setUser({...user, image_id: ev.target.value})}>
                    <option value="">Select Image</option>
                    {user.all_images.map(image => (
                    <option key={image.id} value={image.id}>{image.name}</option>
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