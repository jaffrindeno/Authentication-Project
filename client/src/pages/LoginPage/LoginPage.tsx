import { useState } from "react";
import { axiosInstance } from "../../lib/axios";
import { Link, useNavigate } from "react-router-dom";

interface loginUser {
  email: string,
  mobileNumber: string,
  password: string,
}

const LoginPage = () => {
    
    const navigate = useNavigate();

    const [user, setUser] = useState<loginUser>({
        email: "",
        mobileNumber: "",
        password: ""
    });
    
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async(e:any) => {
        e.preventDefault();

        try{
            
            if(!user.email && !user.mobileNumber) {
                //either email or mobile Number required else shows error message
                return setErrorMessage("Enter Email or Mobile Number");
            } else if (!user.password) {
                //password required or shows error message
                return setErrorMessage("Enter password");
            } else {
                //if everything ok, then sends request
                const response = await axiosInstance.post("user/login", user, {
                    headers: {
                        "Content-Type" : "application/json"
                    }
                });
    
                //if user not registered
                if(response.data.message === "User not registered"){
                    setUser(
                        {
                            email: "",
                            mobileNumber:"",
                            password: ""
                        }
                    );
                    return setErrorMessage("User not register!");
                } else if (response.data.message === "Invalid Password"){
                    //Invalid password
                    setErrorMessage(response.data.message);
                    return setUser({...user, password: ""});
                }
                // navigates to login page if registration is successful.
                localStorage.setItem("token", response.data.token);
                console.log("token registerd");
                navigate("/");
            }

            
        } catch(error) {
            console.log(error);
        }
            
    }

    return (
        <>
            {/* <div className="bg-green-500 flex justify-end">
                <Link to={"/register"} className="text-2xl">Sign up</Link>
            </div> */}
            
                
                <form className="m-4 flex flex-col bg-white p-10 rounded-3xl md:w-[500px] w-full" onSubmit={handleSubmit}>
                    <p className="font-bold text-7xl mb-10">Sign in</p>
                    <div className="relative w-full mb-8">
                        <input className="peer relative outline-none pb-4 text-xl" 
                        placeholder="Email" 
                        onChange={(e) => setUser({...user, email: e.target.value})} 
                        value={user.email}/>
                        <div className="absolute left-0 bottom-0 h-0.5 w-full bg-red-500 transition-all duration-300 ease-in peer-focus:w-0"></div>
                        <div className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-500 transition-all duration-1000 ease-in-out peer-focus:w-full"></div>
                    </div>

                    <div className="flex justify-center mb-10 text-xs text-gray-400"><p>or</p></div>

                    <div className="relative w-full mb-8">
                        <input className="peer relative outline-none pb-4 text-xl" 
                        placeholder="Mobile Number" 
                        onChange={(e) => setUser({...user, mobileNumber: e.target.value})} 
                        value={user.mobileNumber}/>
                        <div className="absolute left-0 bottom-0 h-0.5 w-full bg-red-500 transition-all duration-300 ease-in peer-focus:w-0"></div>
                        <div className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-500 transition-all duration-1000 ease-in-out peer-focus:w-full"></div>
                    </div>
                    
                    <div className="relative w-full mb-8">
                        <input className="peer relative outline-none pb-4 text-xl"
                        placeholder="Password"
                        type="password"
                        onChange={(e) => setUser({...user, password: e.target.value})}
                        value={user.password}/>
                        <div className="absolute left-0 bottom-0 h-0.5 w-full bg-red-500 transition-all duration-300 ease-in peer-focus:w-0"></div>
                        <div className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-500 transition-all duration-1000 ease-in-out peer-focus:w-full"></div>
                    </div>
                    

                    <button type="submit" className="bg-yellow-600  p-2 text-xl font-bold rounded-full hover:bg-yellow-500 transition-colors duration-300 ease-in-out" >Login</button>
                    {errorMessage? (<p className="text-red-500 ">{errorMessage}</p>):(<p className="bg-none h-6"></p>) }
                    <p>Haven't registered? <Link to={"/register"} className="font-bold">Sign up!</Link></p>
                </form>
            
        </>
    )
}

export default LoginPage;