import { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

interface userDetails {
    fullName: string,
    email: string,
    mobileNumber: string
}

const HomePage = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState<userDetails | null>(null);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setCurrentUser(null);
        navigate("/login");
    }

    //delete a user
    const handleDelete = async(id: string) => {
        try{
            await axiosInstance.delete(`user/delete/${id}`, {
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
            });

            setUsers((prevUsers) => prevUsers.filter((user:any) => (user?._id !== id)));
        } catch (error) {
            console.log(error);
        }
        

    } 

    //home  protection
    useEffect(() => {
        const fetchHome = async() => {
            const token = localStorage.getItem("token");
            if(!token){
                navigate("/login");
                return;
            }

            try{
                const response = await axiosInstance.get("/user/profile", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}`},
                });

                setCurrentUser(response.data);
            } catch (error) {
                navigate("/login");
            }
        }
        fetchHome();
    },[])

    useEffect(() => {
        //Request to fetch all users
        const fetchUsers = async() => {
            try{
                const response = await axiosInstance.get("/user/allUsers",{
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}`},
                });
                setUsers(response.data);
            } catch(error) {
                console.log(error);
            }
        }
        fetchUsers();   
    },[]);

    // useEffect(() => {
    //     console.log(users);
    // },[users]);

    return (
        // whole white box
        <div className="m-4 flex flex-col bg-white p-10 rounded-3xl md:w-[500px] md:min-w-[300px] md:h-[600px] w-full">
            <div className="flex flex-col h-full">
                {/* welcome and name */}
                <div className="flex flex-col w-full mb-4">
                    <p className="font-bold text-4xl">WELCOME</p>
                    <p className="font-bold text-xl text-red-400">{currentUser?.fullName}</p>
                </div>

                <div className="flex flex-col w-full mb-4 overflow-auto">   
                    {users.map((user: any) => (
                        <div key={user._id} className="flex  w-full bg-zinc-100 rounded-md p-2 mb-1">
                            <div className="flex  justify-start items-center text-lg w-full ml-2 font-semibold"><p>{user.fullName}</p></div>
                            <div className="flex flex-1 justify-end w-full "><Trash2 size={30} onClick={()=>handleDelete(user._id)} className="size-10 bg-red-500 p-2 rounded-lg hover:bg-red-600"/></div>
                        </div> 
                    ))}
                </div>
            </div>
   
            
            <button className=" p-2 bg-red-500  rounded-full font-bold" onClick={handleLogout}>Logout</button>
            
        </div>
    )
}

export default HomePage;