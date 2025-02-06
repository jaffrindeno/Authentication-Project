import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
        <div className="flex flex-col h-screen w-full  bg-zinc-400 overflow-auto">
            <div>
                <img src="/images/background.png" alt="image" className="h-screen w-full object-cover"/>
            </div>
            
            <div className="absolute top-0 left-0 h-full w-full">
                <div className="flex flex-col h-full w-full">
                    <div className="flex w-full bg-none ">
                        <img 
                        src="/images/start.png" 
                        alt="start" 
                        height={50} 
                        width={100} 
                        className="md:ml-4 md:m-2 ml-2 m-1 md:w-24 w-36"/>
                    </div>
                    <div className="flex flex-1 w-full justify-center items-center bg-none ">
                        <div className="flex w-full items-center justify-center md:justify-centre m-0 md:m-10">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>          
        </div>   
  )
}

export default MainLayout;