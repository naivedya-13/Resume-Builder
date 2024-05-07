import React, { useState } from 'react'
import {motion,AnimatePresence} from "framer-motion";
import {FadeinOutOpacity, scaleInOut} from "../animations"
import { BiFolder, BiFolderPlus, BiHeart, BiSolidFolder, BiSolidFolderPlus, BiSolidHeart } from 'react-icons/bi';
import useUser from "../hooks/useUser"
import {saveToCollection,saveToFavourites} from "../api"
import useTemplates from '../hooks/useTemplates';
import {useNavigate } from "react-router-dom";

const TemplateDesignPin = ({data,index}) => {



    const {data:user , refetch:userRefetch} = useUser()

    const {refetch:temp_refetch} =useTemplates();

const [isHovered , setIsHovered] = useState(false);
const navigate = useNavigate()

const addToCollection = async(e)=>{
   e.stopPropagation();
   await saveToCollection(user,data);
   userRefetch();
}

const addToFvrt = async(e)=>{
    e.stopPropagation();
    await saveToFavourites(user,data);
    temp_refetch();
}


const handleRouteNavigate =()=>{
    navigate (`/resumeDetail/${data?._id}`,{replace :true});
}



  return (

    <motion.div 
    key ={data?._id}
     {...scaleInOut(index)}
    
    >
    <div className="w-full h-[500px] 2xl:h-[740px] rounded-md overflow-hidden relative"
    onMouseEnter={()=>setIsHovered(true)}
    onMouseLeave={()=>setIsHovered(false)}
    
    >
        <img src={data?.imageURL} 
        className='w-full h-full object-cover'
        alt =""/>
        

        <AnimatePresence>
           {isHovered && (
             <motion.div 
             onClick ={handleRouteNavigate}
             {...FadeinOutOpacity} className='absolute inset-0 bg-[rgba(0,0,0,0.4)] flex flex-col items-center justify-start px-4 py-3 cursor-pointer z-50'>
 
                 <div className='flex flex-col items-end justify-start w-full gap-8'>
                 <InnerBoxCard label={user?.collections?.includes(data?._id)?"Added to collection" : "Add to collection"} 
                 
                 Icon={user?.collections?.includes(data?._id)?BiSolidFolderPlus:BiFolderPlus} onHandle={addToCollection}/>
 
 
 
 
                 <InnerBoxCard 
                 
                 label={data?.favourites?.includes(user?.uid)?"Added to favoutites" : "add to favourites"} Icon={data?.favourites?.includes(user?.uid)?BiSolidHeart:BiHeart} onHandle={addToFvrt}/>
 
 
                 </div>
 
             </motion.div>
           )}
        </AnimatePresence>
    </div>

    </motion.div>
  )
}

const InnerBoxCard = ({label , Icon , onHandle}) =>{

    const [isHover , setIsHover] =useState(false)
    return(

        <div onClick={onHandle} className='w-10 h-10 rounded-md flex items-center justify-center hover:shadow-md relative  bg-gray-200' 
        
        onMouseEnter={()=>setIsHover(true)}
        onMouseLeave={()=>setIsHover(false)}
        
        >
             
             
             <Icon className='text-txtPrimary text-base'/> 
           <AnimatePresence>
            {isHover && (
                <motion.div 
                initial ={{opacity : 0 ,scale :0.6 , x:50}}
                animate ={{opacity :1, scale:1,x:0}}
                exit ={{opacity:0,scale:0.6,x:50}}
                
                
                className="px-3 py-2 rounded-md bg-gray-200 absolute -left-44 after:w-2 after:h-2 after:bg-gray-200 after:absolute after:-right-1 after:top-[14px] after:rotate-45">
            <p className='text-sm text-textPrimary whitespace-nowrap'>{label}</p>
                </motion.div>
            )}
           </AnimatePresence>
           
        </div>
       
    )
}

export default TemplateDesignPin