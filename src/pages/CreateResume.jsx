import {Routes ,Route} from "react-router-dom";
import { TemplatesData } from '../utils/helper';

 const CreateResume = () => {
  return (
    <div className='w-full  flex-col flex items-center justify-start py-4 '>

      <Routes>
        {TemplatesData.map(template=>(
            <Route key={template?.id} path={`/${template.name}`} Component={template.component}
            
            />
        ))}
        </Routes>
    </div>
  )
}


export default CreateResume;