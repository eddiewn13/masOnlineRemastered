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
            <div className="flex flex-col items-center  h-screen ">

            <section className="w-[40%] h-fit p-[20px] bg-[#202020] flex flex-col gap-6 mt-[40px] max-h-[90vh] items-center rounded-md shadow-xl">
                <form className="text-center w-full" onSubmit={handleSubmit}>
                    <input key={loading} 
                        className="text-white p-2 w-full bg-[#333333]" 
                        placeholder='Search for players'
                        type="text"
                        id="search"
                        onChange={e => handleSearchChange(e.target.value)}
                    />
                </form>
            {!loading && 
            <>
            <div className="overflow-x-hidden overflow-scroll shadow-[inset_0_-10px_4px_rgba(0,0,0,0.9)]">

                {searchResult.map((user) => (
                    <div key={user.id} className="border-white border-4 rounded-xl m-2 p-[10px] items-center justify-center w-fit">
                        <Link className="flex gap-3" to={'/profile/' + user.id}>
                        
                            <img src={'../pfp/' + user.image_id.path} alt="image not found" className="w-[125px] h-[125px] border-2 rounded-full" />
                        <div>
                            <div className="flex flex-col h-full justify-between  text-[20px]">
                                <h1>Username: {user.name}</h1>
                                <h1>Account created: {user.created_at}</h1>
                            </div>
                        </div>
                        </Link>
                    </div>
                ))}
            </div>
            </>
            }
            </section>
        </div>
        </div>
    )
}