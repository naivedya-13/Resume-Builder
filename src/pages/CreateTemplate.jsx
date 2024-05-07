import React, { useEffect, useState } from "react";
import{ PuffLoader} from "react-spinners"
import { FaTrash, FaUpload } from "react-icons/fa6";
import {toast} from "react-toastify";
import {deleteObject, getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import { storage } from "../config/firebaseconfig";
import { adminIds, initialTags } from "../utils/helper";
import { serverTimestamp, setDoc,doc, deleteDoc} from "firebase/firestore";
import { db} from "../config/firebaseconfig"
import { useNavigate } from "react-router-dom";
import  useUser  from "../hooks/useUser";
import useTemplates from "../hooks/useTemplates";

const CreateTemplate = ()=>{

const [formData , setFormData]=useState({
  title : "" ,
    imageURL : null,
});

const [imageAsset , setImageAsset] = useState({
    isImageLoading :false,
    uri :null,
    progress :0,
})


const [selectedtags , setSelectedTags ] = useState([]);


const {data:templates,isError:templatesIsError,isLoading:templatesIsLoading,refetch:templatesRefetch}=useTemplates();

const {data:user, isLoading }= useUser();
const navigate = useNavigate();



 const handleInputChange =(e)=>{
    const {name , value} = e.target  
     setFormData((prevRec)=> ({...prevRec ,[name] : value}));
 };


 const handleFileSelect = async (e)=>{
    setImageAsset((prevAsset)=>({...prevAsset , isImageLoading : true}));
    const file = e.target.files[0];

    if(file && isAllowed(file)){
   
        const storageRef = ref(storage,`Templates/${Date.now()}-${file.name}`)


      const uploadTask = uploadBytesResumable(storageRef , file);

      
      uploadTask.on(
        "state_changed",
        (snapshot)=>{
            setImageAsset((prevAsset) =>({...prevAsset , progress :(snapshot.bytesTransferred / snapshot.totalBytes)*100 }));
        },
        (error)=> {
            if(error.message.includes("storage/unauthorized")){
                toast.error(`Error : Authorization Revoked`)
            }
            else{
                toast.error(`Error : ${error.message}`)
            }
        },
        () => {
             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{
                setImageAsset((prevAsset) =>({...prevAsset , 
                uri : downloadURL,
             }));
             });

             toast.success("image uploaded");
             setInterval(()=>{
                setImageAsset((prevAsset)=>({...prevAsset,isImageLoading:false,
                }));
            
             }, 2000);
        }
      );

    }else{
        toast.info("invalid  File Formate");
    }

 };

 const isAllowed = (file)=>{
  const isAllowedTypes = [ "image/jpeg" , "image/jpg" , "image/png"] 
  return isAllowedTypes.includes(file.type)
}


 const deleteAnImagebject = async ()=>{
  setInterval(()=>{
    setImageAsset((prevAsset)=>({...prevAsset,
     progress :0,
     uri : null,
    
    }));

 }, 2000);

 const deleteRef = ref(storage , imageAsset.uri);
    deleteObject(deleteRef).then(()=>{ 
      toast.success("Image removed");
    });
 };


 




const handleSelectedTags = (tag)=>{
 //check if the tag is selected or nor

 if(selectedtags.includes(tag)){
  setSelectedTags(selectedtags.filter(selected => selected !== tag))
 }else{
  setSelectedTags([...selectedtags,tag])
 }
}

const pushtoCloud = async()=>{
  const timestamp = serverTimestamp();
  const id = `${Date.now()}`
  const _doc ={
   _id : id,
   title : formData.title,
   imageURL :imageAsset.uri,
   tags : selectedtags,
   name :templates && templates.length>0 ? 
    `Template${templates.length+1}`:
    "Template1",
   timestamp : timestamp,
  };
  
console.log(_doc)

await setDoc(doc(db,"templates" ,id), _doc).then(()=>{
  setFormData((prevData)=>({...prevData,title:"",imageURL:""}));
  setImageAsset((prevAsset)=>({...prevAsset,uri:null}));
  setSelectedTags([]);
  templatesRefetch();
  toast.success("Data Pushed to the cloud");
}).catch(error =>{
  error.message(`Error : ${error.message}`);
})
};

const removeTamplet=async (template)=>{
 const deleteRef = ref(storage ,template?.imageURL);
 await deleteObject(deleteRef).then(async()=>{
  await deleteDoc(doc(db , "templates" , template?._id)).then(()=>{
    toast.success("Template deleted from the cloud");
    templatesRefetch();
  })
  .catch((err)=>{
    toast.error(`Error : ${err.message}`);
  });
 });

};

useEffect (()=>{
  if(!isLoading && !adminIds.includes(user?.uid)){
  navigate("/",{replace:true});
  }

},[user,isLoading])


    return (

        <div className="w-full px-4 lg:px-10 2xl:px-32 py-4 grid grid-cols-1 lg:grid-cols-12">
            <div className="col-span-12 lg:col-span-4 2xl:col-span-3  py-4 flex items-center justify-start flex-col gap-4 px-2">
                <div className="w-full">
                <p className="text-lg text-txtPrimary">Create a new Template</p>
            </div>

            <div className="w-full flex items-center justify-end py-4 ">
                <p className="text-base text-txtLight uppercase font-semibold">TempID:{""}</p>
                <p className="text-sm text-txtDark capitalize font-bold">{templates && templates.length>0 ? 
                `Template${templates.length+1}`:
                "Template1"}</p>
          </div>
{/* template title section */}
          <input   className="w-full px-4 py-3 rounded-md bg-transparent border border-gray-300 text-lg text-gray-700 focus:text-gray-900 focus:shadow-md outline-none"
          
          type="text" placeholder="Template"
          name="title" value={formData.title} onChange={handleInputChange}/>


<div className="w-full bg-gray-100 backdrop-blur-md h-[420px] lg:h-[620px] 2xl:h-[740px] rounded-md border-2 border-dotted boredr-gray-300 cursor-pointer flex items-center justify-center ">

{imageAsset.isImageLoading ? (
  <React.Fragment>
    <div className="flex flex-col items-center justify-center">
      <PuffLoader color="#498FCD" size={60} />
      <p>{imageAsset?.progress.toFixed(2)}%</p>
    </div>
  </React.Fragment>
) : (
  <React.Fragment>
    {!imageAsset?.uri ? (
      <React.Fragment>
        <label className="w-full cursor-pointer h-full">
            <div className="flex flex-col items-center justify-center h-full w-full">
                <div className="flex items-center justify-center cursor-pointer flex-col gap-4">
                    <FaUpload className="text-2xl"/>
        <p className="text-lg text-txtLight">Click to Upload</p>
                </div>
            </div>
            <input type="file" 
            className="w-0 h-0" 
            accept=".jpeg,.jpg,.png"
            onChange={handleFileSelect}/>
        </label>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <div className="realtive w-full h-full overflow-hidden rounded-md">
            <img src = {imageAsset?.uri} className="w-full h-full object-cover " loading ="lazy" alt=""/>


            {/* delete action */}

            <div className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-red-400 cursor-pointer" onClick={deleteAnImagebject}>
              <FaTrash className="text-sm text-white"/>
            </div>
        </div>
      </React.Fragment>
    )}
  </React.Fragment>
)}



</div>


<div className="w-full flex items-center flex-wrap gap-2">
  {initialTags.map((tag,i)=>(

    <div key={i}  className={`border border-gray-300 px-2 py-1 rounded-md cursor-pointer ${selectedtags.includes(tag)?"bg-blue-400 text-white" : ""}`} onClick={()=>handleSelectedTags(tag)}>
      <p className="text-xs">{tag}</p>

      </div>
  ))}




</div>


<button type="button" className="w-full bg-purple-500 text-white rounded-md py-3" onClick={pushtoCloud}>
  Save 
</button>
          </div>
          

          {/* right container */}
          
          <div className="col-span-12 lg:col-span-8 2xl:col-span-9 py-6 w-full flex-1 px-2">
  {templatesIsLoading ? (
    <div className="w-full h-full flex items-center justify-center">
      <PuffLoader color="#498FCD" size={60}/>
    </div>
  ) : (
    <React.Fragment>
      {templates && templates.length > 0 ? (
        <React.Fragment>
          <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
          {templates?.map((template )=>(
            <div key={template._id} className="w-full h-[500px] rounded-md overflow-hidden relative">
              <img src={template?.imageURL} alt="templetimg" className="w-full h-full object-cover"/>

              <div className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-red-400 cursor-pointer" 
              onClick={()=>removeTamplet(template)}>
              <FaTrash className="text-sm text-white"/>
            </div>
            </div>
          ))}
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className="w-full h-full flex items-center justify-center">
      <PuffLoader color="#498FCD" size={60}/>
      <p className="text-xl tracking-wider capitalize text-txtPrimary">No data</p>
    </div>
        </React.Fragment>
      )}
    </React.Fragment>
  )}
</div>
</div>

    
)}

export default CreateTemplate;


