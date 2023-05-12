import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { UseStateContext } from "../contexts/ContextProvider";

export default function UserForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const { setNotification } = UseStateContext();
    const [user, setUser] = useState({
        id: null,
        name: "",
        email: "",
        permission_id: "",
        all_permissions: [],
        image_id: "",
        all_images: [],
        password: "",
        password_confirmation: "",
    });

    if (id) {
        useEffect(() => {
            setLoading(true);
            axiosClient
                .get(`/users/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setUser(data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }, []);
    }

    useEffect(() => {
        if (
            typeof user.permission_id === "object" ||
            typeof user.image_id === "object"
        ) {
            setUser({
                ...user,
                permission_id: user.permission_id.id,
                image_id: user.image_id.id,
            });
        }
    }, [user]);

    const onSubmit = (ev) => {
        ev.preventDefault();
        if (user.id) {
            axiosClient
                .put(`/users/${user.id}`, user)
                .then(() => {
                    setNotification("User updated successfully");
                    navigate("/users");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            axiosClient
                .post(`/users`, user)
                .then(() => {
                    setNotification("User created successfully");
                    navigate("/users");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
    };

    return (
        <>
            {!user.id && <h1>New User</h1>}
            <div className="h-screen w-screen flex flex-col justify-center items-center">
                {loading && <div className="text-center">Loading...</div>}

                {!loading && (
                    <form
                        onSubmit={onSubmit}
                        className="text-white flex flex-col  w-[40vw] bg-[#202020] py-5 px-5 gap-6"
                    >
                        <Link to={"/users"} className="w-fit">
                            <img
                                src="\bilder\arrow.png"
                                alt="<-"
                                className="text-[50px] text-white w-[50] h-[50px]"
                            />
                        </Link>

                        <div className="w-full flex flex-col gap-[5px]">
                            <h1>Change username</h1>
                            <input
                                value={user.name}
                                onChange={(ev) =>
                                    setUser({ ...user, name: ev.target.value })
                                }
                                placeholder="Name"
                                className="bg-[#333333] p-[5px] rounded-sm shadow-inner"
                            />
                        </div>
                        <div className="w-full flex flex-col gap-[5px]">
                            <h1>Description</h1>
                            <input
                                value={user.description}
                                onChange={(ev) =>
                                    setUser({ ...user, description: ev.target.value })
                                }
                                placeholder="Description"
                                className="bg-[#333333] p-[5px] rounded-sm shadow-inner"
                            />
                        </div>
                        <div className="w-full flex flex-col gap-[5px]">
                            <h1>Change profile picture</h1>
                            <select
                                onChange={(ev) =>
                                    setUser({
                                        ...user,
                                        image_id: ev.target.value,
                                    })
                                }
                                className="bg-[#333333] p-[5px] rounded-sm shadow-inner"
                            >
                                <option value="">Select Image</option>
                                {user.all_images.map((image) => (
                                    <option key={image.id} value={image.id}>
                                        {image.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="w-full flex flex-col gap-[5px]">
                            <h1>Change permission</h1>

                            <select
                                onChange={(ev) =>
                                    setUser({
                                        ...user,
                                        permission_id: ev.target.value,
                                    })
                                }
                                className="bg-[#333333] p-[5px] rounded-sm shadow-inner"
                            >
                                <option key={id} value="">
                                    Select Permission
                                </option>
                                {user.all_permissions.map((permission) => (
                                    <option
                                        key={permission.id}
                                        value={permission.id}
                                    >
                                        {permission.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="w-full flex flex-col gap-[5px]">
                            <h1>Change email</h1>
                            <input
                                type="email"
                                value={user.email}
                                onChange={(ev) =>
                                    setUser({ ...user, email: ev.target.value })
                                }
                                placeholder="Email"
                                className="bg-[#333333] p-[5px] rounded-sm shadow-inner"
                            />
                        </div>
                        <button className="w-1/12 bg-[#90EE90] p-[5px] rounded-md font-semibold hover:bg-[#73c073]">
                            Save
                        </button>
                        {errors && (
                            <div className="text-center text-red-500">
                                {Object.keys(errors).map((key) => (
                                    <p key={key}>{errors[key][0]}</p>
                                ))}
                            </div>
                        )}
                    </form>
                )}
            </div>
        </>
    );
}
