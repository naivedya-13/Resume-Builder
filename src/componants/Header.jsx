import React, { useState } from "react";
import useUser from "../hooks/useUser";
import {Link} from "react-router-dom";
import {Logo } from "../assets";
import {AnimatePresence,motion} from "framer-motion";
import {PuffLoader} from "react-spinners";
import { HiLogout } from "react-icons/hi";
import { slideupDown,FadeinOutOpacity } from "../animations";
import {auth } from "../config/firebaseconfig"
import {useQueryClient} from "react-query";
import { adminIds } from "../utils/helper";
import useFilters from '../hooks/useFilters';


const Header =()=>{

  const {data , isLoading , isError} = useUser();
  const [isMenu , setIsMenu]= useState(false);
 const queryClient = useQueryClient();

  const {data : filterData }=useFilters();



  const signOutUser = async()=>{
    await auth.signOut().then (()=>{
      queryClient.setQueryData("user",null);
    });
  };

  const handleSearchTerm =(e)=>{
    queryClient.setQueryData("globalFilter" ,
    {...queryClient.getQueryData("globalFilter"),
    searchTerm :e.target.value,
});
  }

  const clearFilter =()=>{
    queryClient.setQueryData("globalFilter" ,
    {...queryClient.getQueryData("globalFilter"),
    searchTerm :""
    });
  }
    return(
       <header className="w-full flex items-center justify-center px-4 py-3 lg:px-8 border-b  border-gray-400 bg-bg-Primary z-50 gap-12 sticky top-6">

        <Link to={"/"}>
            <img src={Logo} className="w-12 h-auto object-contain " alt="img"/>
        </Link>

<div className="flex-1 border border-gray-300 px-4 py-1 rounded-b-md flex items-center justify-between bg-gray-300" >
    <input 
     value={filterData?.searchTerm ? filterData?.searchTerm : ""}
     onChange={handleSearchTerm}
    type ="text" placeholder="Search items......" className="flex-1 h-10 bg-transparent text-base font-semibold outline-none border-none"/>

    <AnimatePresence>
   
    {filterData?.searchTerm.length > 0 && (
      <motion.div 
      onClick={clearFilter}
      {...FadeinOutOpacity} className="w-8 h-8 flext items-center   justify-center bg-gray-400 cursor-pointer active:scale-95 duration-150 rounded-md ">
        <p className="text-2xl text-black">x</p>

        </motion.div>
    )}
    </AnimatePresence>
</div>

<AnimatePresence>
    {isLoading ? (<PuffLoader color="#489FCD" size={80}/>):(<React.Fragment>
        {data ? (
                    <motion.div {...FadeinOutOpacity}
                    
                    className="relative" onClick={()=> setIsMenu(!isMenu)}>
            
            {data?.photoURL ? (
                     <div className="w-12 h-12 rounded-md relative flex items-center justify-center">
                <img src={data?.photoURL} referrerPolicy="no-referrer"alt="img"/>
            </div>):
            (<div className="w-12 h-12 rounded-md relative flex items-center justify-center bg-purple-400 shadow-md">
                <p className="text-lg text-white cursor-pointer">{data?.email[0]}</p>
                
                </div>)
                
                }
<AnimatePresence>
  {isMenu && <motion.div
  {...slideupDown}
  
  className="absolute px-4 py-3 rounded-md bg-white right-0 top-16 flex  flex-col items-center justify-start  gap-3 w-64 pt-12" onMouseLeave={()=> setIsMenu(false)}>
  {data?.photoURL ? (
                     <div className="w-20 h-20 rounded-full relative flex flex-col items-center justify-center">
                <img src={data?.photoURL}
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"alt="img"/>
     



    




            </div>):(
            
            <div className="w-20 h-20 rounded-full relative flex items-center justify-center bg-purple-400 shadow-md">
                <p className="text-lg text-white cursor-pointer">{data?.email[0]}</p>
                
                </div>)}

                {data?.displayName && ( <p className="text-lg text-black ">{data?.displayName}</p>)}

  {/* menus items */}

  <div className="w-full flex flex-col gap-8 items-start pt-6">
    <Link className=" text-txtLight hover:text-txtDark text-base whitespace-nowrap" to={`/profile/${data?.uid}`}>My Account</Link>
   {
    adminIds.includes(data?.uid) && (
      <Link className=" text-txtLight hover:text-txtDark text-base whitespace-nowrap" to={"/template/create"}>Add new Template</Link>
    )
   }


    <div className="w-full px-2 py-2 border-t border-gray-300 flex items-center justify-between group cursor-pointer " onClick={signOutUser}>
        <p>Sign out</p>
        <HiLogout className="group-hover:text-txtDark text-txtLight"/>

       
    </div>
  </div>
   
  </motion.div>}

  </AnimatePresence>



        </motion.div>):
        
        (<Link to={"/auth"}>

        <motion.button className="px-4 py-2 rounded-md border border-gray-200 hover:shadow-md active:scale-95 duration-150" type="button" {...FadeinOutOpacity}
        
        >Login</motion.button>
        </Link>
        )}
        </React.Fragment>)}
</AnimatePresence>

       </header>
    );



}


export default Header;
