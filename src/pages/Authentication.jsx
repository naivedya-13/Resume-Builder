import React, { useEffect } from "react";
import {Logo} from "../assets";
import {Footer} from "../conatiners"
import { AuthBtnProvider } from "../componants";
import {FaGoogle , FaGithub} from "react-icons/fa6";
import useUser from "../hooks/useUser";
import {useNavigate} from "react-router-dom";
import MainSpinner from "../componants/MainSpinner";


const Authentication =()=>{

  const {data, isLoading, isError} = useUser();

  const navigate = useNavigate();

  useEffect(() => {
  if(!isLoading && data){
    navigate("/",{replace : true});
  }
  },[isLoading,data]);

  if(isLoading){
    return <MainSpinner/>
  }

    return (
        <div className="auth-section">
    {/* top section */}
    <img src={Logo} className="w-12 h-auto object-contain" alt="logo" />

    {/*main section*/}

    <div className="w-full flex flex-1 flex-col items-center justify-center gap-6">
        <h1 className="text-3xl lg:text-4xl text-purple-700">Welcome to Express resume</h1>
        <p className="text-2xl text-gray-300">Create Your Resume !!!!</p>
        <h2 className="text-2xl text-gray-600">Authentication</h2>
        <div className="w-full lg:w-96 rounded-md p-2 flex flex-col justify-start gap-6">
            
            <AuthBtnProvider Icon={FaGoogle} 
            label={"Sign in with Google"} 
            provider={"GoogleAuthProvider"}
            />

           <AuthBtnProvider Icon={FaGithub} 
            label={"Sign in with Github"} 
            provider={"GithubAuthProvider"}
            />
          

   
        </div>
    </div>

    

    {/* footer  sec */}
    <Footer/>
        
        </div>
    )
}

export default Authentication;