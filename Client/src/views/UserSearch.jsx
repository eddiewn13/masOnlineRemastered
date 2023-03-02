import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";

export default function UserSearch() {

    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState({})
    const [searchResult, setSearchResult] = useState('')

    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = () => {
        setLoading(true);
        axiosClient.get('/users')
        .then(({data}) => {
            setLoading(false);
            setUsers(data.data);
            setSearchResult(data.data)
        })
        .catch(() => {
            setLoading(false); 
        })
    }

    const handleSubmit = (e) => {
    e.preventDefault();
    }

    const handleSearchChange = (e) => {
        if (!e) {
            setSearchResult(users)
        } else {
            let resultArray = users.filter(user => user.name.toLowerCase().includes(e.toLowerCase()))
            setSearchResult(resultArray)
        }
        

    }
    
    return (
        <div>
            {loading && <div className="loading">Loading...</div>}
            <div className="flex flex-col items-center  h-screen bg-[#312E2B] text-white">

            <section className="w-fit h-fit p-[20px] bg-[#202020] flex flex-col gap-3 mt-[40px]">
                <form className="text-center" onSubmit={handleSubmit}>
                    <input key={loading} 
                        className="text-black" 
                        placeholder='Search'
                        type="text"
                        id="search"
                        onChange={e => handleSearchChange(e.target.value)}
                    />
                </form>
            {!loading && 
            <>
                {searchResult.map((user) => (
                    <div key={user.id} className="border-white border-4 rounded-xl m-2">
                        <Link className="flex" to={'/profile/' + user.id}>
                        <div>
                            <img src={'../pfp/' + user.image_id.path} alt="image not found" className="w-[250px] h-[250px]" />
                        </div>
                        <div>
                            <div className="flex flex-col h-full justify-between p-10 text-[30px]">
                                <h1>Username: {user.name}</h1>
                                <h1>Account created: {user.created_at}</h1>
                            </div>
                        </div>
                        </Link>
                    </div>
                ))}
            </>
            }
            </section>
        </div>
        </div>
    )
}