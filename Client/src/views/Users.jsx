import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { UseStateContext } from "../contexts/ContextProvider";

export default function Users() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const {setNotification} = UseStateContext()

    useEffect(() => {
        getUsers();
    }, [])

    const onDelete = (u) => {
        if (!window.confirm('Are you sure you want to delete ' + u.name + '?')) {
            return;
        }

        axiosClient.delete(`/users/${u.id}`)
        .then(() => {
            setNotification('User deleted successfully');
            getUsers();
        })
    }

    const getUsers = () => {
        setLoading(true);
        axiosClient.get('/users')
        .then(({data}) => {
            setLoading(false);
            setUsers(data.data);
        })
        .catch(() => {
            setLoading(false); 
        })
    }

    return (
        <section className="h-screen w-screen flex justify-center items-center">

        <div className=" w-fit h-fit  ">
            <div  className="flex justify-between items-center">
                <h1 className="">Users</h1>
                <Link to={'/users/new'} className="font-bold border-2 border-white p-[2px] rounded-lg">Add new</Link>
            </div>
            <div >
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Permission</th>
                            <th>Create Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {loading && <tbody>
                        <tr>
                            <td colSpan="5" className="text-center">
                                Loading...
                            </td>
                        </tr>
                    </tbody>
                    }
                    {!loading && <tbody>
                        {users.map(u => (
                            <tr key={users}>
                                <td>{u.id}</td>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.permission_id.name}</td>
                                <td>{u.created_at}</td>
                                <td>
                                    <Link className="btn-edit" to={'/users/' + u.id}>Edit</Link>
                                    &nbsp;
                                    <button onClick={ev => onDelete(u)} className='btn-delete'>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                }
                </table>
            </div>
        </div>
        </section>

    )
}