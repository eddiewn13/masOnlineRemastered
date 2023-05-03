import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";

export default function UserSearch() {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState({});
    const [searchResult, setSearchResult] = useState("");

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        setLoading(true);
        axiosClient
            .get("/users")
            .then(({ data }) => {
                setLoading(false);
                setUsers(data.data);
                setSearchResult(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleSearchChange = (e) => {
        if (!e) {
            setSearchResult(users);
        } else {
            let resultArray = users.filter((user) =>
                user.name.toLowerCase().includes(e.toLowerCase())
            );
            setSearchResult(resultArray);
        }
    };

    return (
        <div className="flex flex-col items-center w-full bg-[#312E2B] text-white">
            {loading && <div className="loading mt-8">Loading...</div>}
            <div className="w-fit bg-[#202020] flex flex-col gap-8 mt-[10vh] rounded-md">
                <section className="w-fit h-fit p-[20px] bg-[#202020] flex flex-col gap-3 mt-[40px] max-h-[90vh] m-auto">
                    <form className="text-center" onSubmit={handleSubmit}>
                        <input
                            key={loading}
                            className="p-2 rounded-lg focus:outline-none text-black"
                            placeholder="Search"
                            type="text"
                            id="search"
                            onChange={(e) => handleSearchChange(e.target.value)}
                        />
                    </form>
                    {!loading && (
                        <>
                            <div className="overflow-x-hidden overflow-scroll min-w-[874px] max-[1075px]:min-w-full max-h-[50vh]">
                                {searchResult.map((user) => (
                                    <div
                                        key={user.id}
                                        className="border-gray-400 border-[3px] rounded-xl m-2"
                                    >
                                        <Link
                                            className="flex flex-row max-[1075px]:flex-col"
                                            to={"/profile/" + user.id}
                                        >
                                            <div>
                                                <img
                                                    src={user.image_id.path}
                                                    alt="image not found"
                                                    className="w-[250px] h-[250px] m-auto"
                                                />
                                            </div>
                                            <div>
                                                <div className="flex flex-col h-full text-[30px] px-4 max-[1075px]:text-center max-[1075px]:py-4">
                                                    <span className="mt-auto">
                                                        Username: {user.name}
                                                    </span>
                                                    <span className="mb-auto">
                                                        Account created:{" "}
                                                        {user.created_at}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </section>
            </div>
        </div>
    );
}
