import React, { useEffect } from "react";
import { Logo } from "../assets";
import { Footer } from "../containers";
import { AuthButtonWithProvider } from "../components";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { toast } from "react-toastify";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import MainSpinner from "../components/MainSpinner";

const Authentication = () => {

  const {data,isLoading,isError} = useUser();
  const navigate = useNavigate();
  useEffect(()=>{
    if(!isLoading && data){
      navigate("/",{replace:true});
    }
  },[isLoading,data]);

  if(isLoading){
    return <MainSpinner/>
  }
  return (
    <div className="auth-section">
      {/* top section */}
      <img src={Logo} className="w-12 h-auto object-contain" alt="" />
      {/* main section */}
      <div className="w-full flex flex-1 flex-col items-center justify-center gap-6 ">
        <h1 className="text-3xl lg:text-4xl text-blue-700">
          Welcome to Expressume
        </h1>
        <p className="text-base text-gray-600">epress way to create resume</p>
        <h2 className="text-2xl text-gray-600">Authenticate </h2>
        <div className="w-full lg:w-96 rounded-md  p-2 flex flex-col items-center justify-center gap-6">
          <AuthButtonWithProvider
            Icon={FaGoogle}
            label={"Signin With Google"}
            provider={"GoogleAuthProvider"}
          />
          <AuthButtonWithProvider
            Icon={FaGithub}
            label={"Signin With GitHub"}
            provider={"GithubAuthProvider"}
          />
        </div>
      </div>

    
      {/* footer section */}
      <Footer />
    </div>
  );
};

export default Authentication;
