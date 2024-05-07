import React from 'react';
import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {getTemplateDetails} from "../api";
import MainSpinner from "../componants/MainSpinner";
import { FaHouse } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { BiFolderPlus, BiHeart, BiSolidFolderPlus, BiSolidHeart} from "react-icons/bi"
import useUser from '../hooks/useUser';
import {saveToCollection, saveToFavourites} from "../api"
import useTemplates from '../hooks/useTemplates';
import {TemplateDesignPin} from "../componants";
import {motion,AnimatePresence} from "framer-motion";

 const TemplateDesignPinD = () => {
  const {templateID} = useParams();

  const {data , isError , isLoading , refetch}=useQuery(
    ["template" ,templateID],
    () => getTemplateDetails(templateID)
  )

 

  const {data:user ,refetch:userRefetch} = useUser();

  const {data:templates,refetch:temp_refetch,isLoading:Temp_isLoading}=useTemplates();
  
  if(isLoading) return <MainSpinner/>

  const addToCollection = async(e)=>{
    e.stopPropagation();
    await saveToCollection(user,data);
    userRefetch();
    refetch();
 }


 const addToFvrt = async(e)=>{
  e.stopPropagation();
  await saveToFavourites(user,data);
  temp_refetch();
}

  if(isError){
    return (
      <div  className='w-full h-[60vh] flex flex-col items-center justify-center'>
        <p className='text-lg text-textPrimary'>Error While fetching the data</p>
      </div>
    )
  }
  return (
    
    <div className='w-full flex flex-col items-center justify-start px-4 py-12'>

   <div className='w-full flex items-center pb-8 gap-2'>

   <Link 
   to={"/"}
   className="flex items-center justify-center gap-2 text-textPrimary">
    <FaHouse/>Home
   </Link>

   <p>/</p>
   <p>{data?.name}</p>

   </div>
     
     <div className='w-full grid grid-cols-1 lg:grid-cols-12'>
      
      
      <div className='col-span-1 lg:col-span-8 flex flex-col items-start justify-start gap-4'>
    <img src={data?.imageURL} alt="" className='w-full h-auto object-contain rounded-md'/>


       <div className='w-full flex items-start justify-start gap-2'>

            <div className='w-full flex items-center justify-between'>
              <p className='text-base text-textPrimary'>{data?.title}</p>
            
            {data?.favourites?.length > 0 && (
              <div className='flex items-center justify-center gap-1'>

              <BiSolidHeart className="text-base text-red-500"/>

              <p className='text-base text-textPrimary font-semibold'>{data?.favourites?.length} Likes</p>
            </div>
            )};
            
            </div>
            {user && (
  <div className='flex items-center justify-center gap-3'>
    {user?.collections?.includes(data?._id) ? (
      <React.Fragment>
        <div 
        onClick={addToCollection}
        className='flex items-center justify-center px-4 py-2 rounded-md border-gray-300 gap-2 hover:bg-gray-300 cursor-pointer'>
          <BiFolderPlus className='text-base text-textPrimary'/>
          <p className='text-sm text-textPrimary whitespace-nowrap'>
            Remove From Collections
          </p>
        </div>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <div 
        onClick={addToCollection}
        className='flex items-center justify-center px-4 py-2 rounded-md border-gray-300 gap-2 hover:bg-gray-300 cursor-pointer'>
          <BiSolidFolderPlus className='text-base text-textPrimary'/>
          <p className='text-sm text-textPrimary whitespace-nowrap'>
            ADD to Collections
          </p>
        </div>
      </React.Fragment>
    )}


{data?.favourites?.includes(user?.uid) ? (
      <React.Fragment>
        <div 
        onClick={addToFvrt}
        className='flex items-center justify-center px-4 py-2 rounded-md border-gray-300 gap-2 hover:bg-gray-300 cursor-pointer'>
          <BiHeart className='text-base text-textPrimary'/>
          <p className='text-sm text-textPrimary whitespace-nowrap'>
            Remove From Favourites
          </p>
        </div>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <div 
        onClick={addToFvrt}
        className='flex items-center justify-center px-4 py-2 rounded-md border-gray-300 gap-2 hover:bg-gray-300 cursor-pointer'>
          <BiSolidHeart className='text-base text-textPrimary'/>
          <p className='text-sm text-textPrimary whitespace-nowrap'>
            ADD to Favourites
          </p>
        </div>
      </React.Fragment>
    )}

  </div>
)}

       </div>
      </div>

      <div className='col-span-1 lg:col-span-4 w-full flex flex-col items-center justify-start px-3 gap-6'>
  
     
  
      <div 
      className='w-full h-72 bg-blue-300 rounded-md overflow-hidden relative' style={{ background: "url(https://img.lovepik.com/photo/48011/2264.jpg_wh300.jpg)", backgroundPosition: "center", backgroundSize: "cover" }}>


  <div className='absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.4)]'>

    <Link to={"/"} className='px-4 py-2 rounded-md border-2 border-gray-200'>
    <p className='text-lg text-teal-50'>Discover More</p>  
    </Link>
  </div>
    </div>

    {/* edit option */}
     
    {user && (
      <Link 
      className='w-full px-4 py-3 rounded-md flex items-center justify-center bg-emerald-500 cursor-pointer'
      to={`/resume/${data?.name}?templateId = ${templateID}`}>
        <p className='text-white font-semibold text-lg'>Edit thid Template</p>

      </Link>
    )}

<div className='w-full flex items-center justify-start flex-wrap gap-2'>
  {data?.tags?.map((tag, index) => (
    <p
      key={index} // Move key to the correct location inside the JSX element
      className='text-xs border bg-gray-300 px-2 py-1 rounded-md whitespace-nowrap'>
      {tag}
    </p>
  ))}
</div>

      </div>
     </div>
         
      { templates?.filter((temp)=>temp._id !==data?._id).length > 0 &&(
          <div className='w-full py-8 flex-col items-start justify-start gap-4'>

            <p className='text-lg font-semibold text-txtDark'>
              You might also like
            </p>
            <div className='w-full grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2'>
            <React.Fragment>
                  <AnimatePresence>
                    {  
                    templates?.filter((temp)=>temp._id !==data?._id).map((template , index)=>(
                        <TemplateDesignPin 
                        key={template?._id} 
                        data={template}
                        index={index}
                        />
                    ))}
                  </AnimatePresence>
                </React.Fragment>
              </div>
          </div>
      )} 
    </div>
  )
}

export default TemplateDesignPinD;