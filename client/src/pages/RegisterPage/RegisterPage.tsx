import { useState } from "react";
import { axiosInstance } from "../../lib/axios";
import { Link, useNavigate } from "react-router-dom";

interface userDetails {
    fullName: string,
    email: string,
    password: string,
    mobileNumber: string
};

const RegisterPage = () => {

    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const [userData, setUserData] = useState<userDetails>({
        fullName: "",
        email: "",
        password: "",
        mobileNumber: ""
    });

    const [confirmPassword, setConfirmPassword] = useState("");

    // checks whether password contain atleast one uppercase, one lowercase, one special character and one number 
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    const validatePassword = (password: string) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*?])[A-Za-z\d!@#$%&*?]{8,}$/;
        return passwordRegex.test(password);
    }

    const validateNumberFormat = (mobileNumber: string) => {
        const numberRegex = /^[0-9]+$/;
        return numberRegex.test(mobileNumber);
    }

    const handleSubmit = async(e: any) => {
        
        e.preventDefault();
        try{
            if (!userData.fullName || !userData.email || !userData.mobileNumber || !userData.password || !confirmPassword) {
                // if one of the fields is empty, then shows an error message
                return setErrorMessage("All fields required!")    
            } else if(userData.password !== confirmPassword) {
                //if password and confirm password doesn't match
                return setErrorMessage("Password doesn't match!");
            } else if(userData.password.length < 8){
                //if password is less than eigth characters
                return setErrorMessage("Password too short!");
            } else if(!validateEmail(userData.email)){
                //checks whether you are entering a valid email password
                return setErrorMessage("Enter valid email!");
            } else if(!validatePassword(userData.password)){
                //if password is not in the required format 
                return setErrorMessage("Password must include atleast one uppercase, one lowercase, one special character and one number");
            } else if(!validateNumberFormat(userData.mobileNumber)){
                return setErrorMessage("Enter valid mobile Number");
            } else if(userData.password === confirmPassword) {
                //if ok, the sends request
                const response = await axiosInstance.post("user/register", userData, {
                    headers: {
                        "Content-Type" : "application/json"
                    }
                });
                // if user already exists, shows error message.
                if(response.data.message == "User already exists"){
                    return setErrorMessage("User already exists!");
                }
                //if all set, then navigates to login page.
                navigate("/login");
            }
        } catch (error: any) {
            console.log(error);
        }
        
    }

    return (
        <>
            <form className="m-4 flex flex-col bg-white p-10 rounded-3xl md:w-[500px] w-full" onSubmit={handleSubmit}>
                <p className="font-bold text-7xl mb-10">Sign up</p>

                <div className="relative w-full mb-8">
                    <input className="peer relative outline-none pb-4 text-xl" 
                    placeholder="Full Name" 
                    onChange={(e) => setUserData({...userData, fullName: e.target.value})} 
                    value={userData.fullName} />
                    <div className="absolute left-0 bottom-0 h-0.5 w-full bg-red-500 transition-all duration-300 ease-in peer-focus:w-0"></div>
                    <div className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-500 transition-all duration-1000 ease-in-out peer-focus:w-full"></div>
                </div>                

                <div className="relative w-full mb-8">
                    <input className="peer relative outline-none pb-4  text-xl " 
                    placeholder="Email" 
                    onChange={(e) => setUserData({...userData, email: e.target.value})} 
                    value={userData.email} />
                    <div className="absolute left-0 bottom-0 h-0.5 w-full bg-red-500 transition-all duration-300 ease-in peer-focus:w-0"></div>
                    <div className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-500 transition-all duration-1000 ease-in-out peer-focus:w-full"></div>
                </div>
                
                <div className="relative w-full mb-8">
                    <input className="peer relative w-full outline-none pb-4  text-xl " 
                    placeholder="Password"
                    type="password"
                    onChange={(e) => setUserData({...userData, password: e.target.value})}
                    value={userData.password}  maxLength={8}/>
                    <div className="absolute left-0 bottom-0 h-0.5 w-full bg-red-500 transition-all duration-300 ease-in peer-focus:w-0"></div>
                    <div className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-500 transition-all duration-1000 ease-in-out peer-focus:w-full"></div>
                </div>
                
                <div className="relative w-full mb-8">
                    <input className="peer relative w-full outline-none pb-4  text-xl " 
                    placeholder="Confirm Password"
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}  maxLength={8}/>
                    <div className="absolute left-0 bottom-0 h-0.5 w-full bg-red-500 transition-all duration-300 ease-in peer-focus:w-0"></div>
                    <div className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-500 transition-all duration-1000 ease-in-out peer-focus:w-full"></div>
                </div>
                
                <div className="relative w-full mb-8">
                    <input className="peer relative w-full outline-none pb-4  text-xl" 
                    placeholder="Mobile Number" 
                    onChange={(e) => setUserData({...userData, mobileNumber: e.target.value})} 
                    value={userData.mobileNumber}  maxLength={10}/>
                    <div className="absolute left-0 bottom-0 h-0.5 w-full bg-red-500 transition-all duration-300 ease-in peer-focus:w-0"></div>
                    <div className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-500 transition-all duration-1000 ease-in-out peer-focus:w-full"></div>
                </div>
                
                <button type="submit" className="bg-yellow-600  p-2 text-xl font-bold rounded-full hover:bg-yellow-500 transition-colors duration-300 ease-in-out" >Register</button>
                {errorMessage? (<p className="text-red-500 mb-4">{errorMessage}</p>):(<p className="bg-none h-6 mb-4"></p>) }
                <p className="flex gap-2">Already registered with us?<Link to={"/login"}><p className="font-bold">Sign in!</p></Link></p>
                
            </form>
        </>
    );
}

export default RegisterPage;