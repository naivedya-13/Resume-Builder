import React, { useEffect, useState } from 'react'
import useUser from '../hooks/useUser';
import useTemplates from '../hooks/useTemplates';
import {useNavigate} from"react-router-dom";
import {AnimatePresence} from "framer-motion";
import { TemplateDesignPin } from '../componants';
import {useQuery} from "react-query";
import { getSavedResume } from '../api';
import MainSpinner from '../componants/MainSpinner';


const UserProfile = () => {

  const {data:user}=useUser();
const navigate = useNavigate();
  const [activeTab , setActiveTab] = useState("collections");

  const {data:savedResumes} = useQuery(["savedResumes"],()=> getSavedResume(user?.uid))
  
  
  const { data:templates , isLoading:temp_isLoading , isError:temp_iserror} = useTemplates();
   
  
  
//   useEffect (()=>{
//   if(!user){
//     navigate("/auth",{replace:true});
//   }
    
// },[])


if(temp_isLoading){
  return <MainSpinner/>
}
  return (
    <div className='w-full flex flex-col items-center justify-start py-12'>
      
      <div className='w-full h-72 bg-blue-50'>
        <img src="https://media.istockphoto.com/id/664267384/photo/workplace-in-modern-style-with-laptop-diary-white-candles-roses-and-wooden-desk-flat-lay.jpg?s=612x612&w=0&k=20&c=UswkMzeUC17tLsx_bahnKWjk7sjGcHt4sOHGcdqpRj8=" alt="" className='w-full h-full object-cover'/>

        <div className='flex items-center justify-center flex-col gap-4'>
        {user?.photoURL ? (
          <React.Fragment>
         <img src={user?.photoURL}
                className="w-24 h-24 rounded-full border-2 object-cover border-white shadow-md"
                referrerPolicy="no-referrer"
                alt="img"
                loading='Lazy'/>
          </React.Fragment>
        ):(<React.Fragment>
                 <img src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                className="w-24 h-24 rounded-full border-2 object-cover border-white shadow-md"
                referrerPolicy="no-referrer"
                alt="img"
                loading='Lazy'/>
        </React.Fragment>)}

        <p className='text-2xl text-txtDark'>{user?.displayName}</p>
        </div>

        <div className='flex items-center justify-center mt-12'>
  <div className={`px-4 py-2 rounded-md flex items-center justify-center gap-4 group cursor-pointer `}
  onClick={()=>setActiveTab("collections")}
  
  >
    <p className={`text-base text-textPrimary group-hover:text-blue-600 px-4  py-1 rounded-full ${activeTab === "collections" &&  "bg-white shadow-md text-blue-600"}`}>
      Collections
    </p>
  </div>

  <div className={`px-4 py-2 rounded-md flex items-center justify-center gap-2 group cursor-pointer `}
  onClick={()=>setActiveTab("resumes")}
  >
    
    <p className={`text-base text-textPrimary group-hover:text-blue-600 px-4  py-1 rounded-full ${activeTab === "resumes" &&  "bg-white shadow-md text-blue-600"}`}>
     Resumes
    </p>
  </div>
</div>

<div className='w-full grid grid-cols-1 md-grid-cols-2 lg-grid-cols-3 2xl:grid-cols-4 px-4 py-6'>
  <AnimatePresence>
    {activeTab === "collections" && (
      <React.Fragment>
       
{user?.collections?.length > 0 && user?.collections?(
  <RenderATemplate templates={templates?.filter((temp)=> user?.collections?.includes(temp?._id))}
/>
)
:(  

          <div className='col-span-12 w-full flex flex-col items-center justify-center gap-3'>
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/no-data-found-8867280-7265556.png?f=webp"
            className='w-32 h-auto object-cover'/>
            <p>No Data</p>
          </div>
        
      )}
      
      </React.Fragment>
    )}


{activeTab === "resumes" && (
      <React.Fragment>
       
{savedResumes?.length > 0 && savedResumes?(
  <RenderATemplate templates={savedResumes}
/>
)
:(  

          <div className='col-span-12 w-full flex flex-col items-center justify-center gap-3'>
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/no-data-found-8867280-7265556.png?f=webp"
            className='w-32 h-auto object-cover'/>
            <p>No Data</p> 
          </div>
        
      )}
      
      </React.Fragment>
    )}
  </AnimatePresence>
</div>

        </div>
      </div>
  
  )
}

const RenderATemplate = ({ templates }) => {
  return (
    <React.Fragment>
      {templates && templates.length > 0 && (
        <React.Fragment>
          <AnimatePresence>
            {templates && 
              templates.map((template, index) => (
                <TemplateDesignPin
                  key={template?._id}
                  data={template}
                  index={index}
                />
              ))}
          </AnimatePresence>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};


export default UserProfile;