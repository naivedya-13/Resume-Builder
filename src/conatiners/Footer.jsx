import React from "react";
import {Logo } from "../assets"
import { Link } from "react-router-dom";

const Footer = ()=>{
    return (
        <div className="w-full flex items-center justify-between border-t border-gray-300">
        
        <div className="flex items-center justify-center gap-3 py-3">
        <img src={Logo} className="w-8 h-auto object-contain" alt="logo" />
        <p>Express Resume</p>
        </div>
        <div className="flex items-center justify-center gap-3 py-3">
         <Link to ={"/"} className="text-bllue-700 text-sm">Home</Link>

         <Link to ={"/"} className="text-bllue-700 text-sm">Contact</Link>


         <Link to ={"/"} className="text-bllue-700 text-sm whitespace-nowrap">Privacy Policy</Link>
        </div>
        
        
        
        
        
        </div>
    );
}

export default Footer;