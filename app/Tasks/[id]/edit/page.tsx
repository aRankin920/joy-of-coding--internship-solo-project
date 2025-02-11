import TaskFormUpdate from '@/app/components/TaskFormUpdate';
import '@/app/components/styles.css'
import axios from 'axios';

async function EditTask({params}: {params: {id:string}} ) { 
    const { id } = await params; 

    //'getdata' retrieves data via server api call
    const getdata = async () => {         
        const response = await axios.get(`http://localhost:3000/api/tasks/${(id)}`);      
        return await response.data 
    };  

    //'task' holds what 'getdata' returns
    const task = await getdata();

    return (
        <div className='bg-blue-100 h-full'>
            <TaskFormUpdate task={task}/> 
        </div>
    )
}
export default EditTask