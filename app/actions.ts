'use server'
import axios from 'axios';//Need to validate data from the database. Note can use fetch() to get data as well but will have to send a bunch of headers with it.  Axios simplify all of this.
import { taskType, NewTaskType } from './types';
import { task } from '@prisma/client';

export async function getAllTasks() {
    try {
        const response = await axios.get('http://localhost:3000/api/tasks');
        return response.data; // Axios automatically parses the JSON
    } catch (error) {
        throw new Error('Failed to fetch tasks');
    }
}

export async function getOneTask(id: string) {
    try {
        const response = await axios.get(`http://localhost:3000/api/tasks/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch task');
    }
}

//{ description: string; name: string; category: string }
export async function createTask(newTask: NewTaskType) {
    console.log('Inside CREATETASK - newTask is: ', newTask);
    try {
        const response = await axios.post(`http://localhost:3000/api/tasks`, newTask);
        console.log('Inside CREATETASK: ', response.data);
        return response.data; 
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.response?.data || error.message);
        } else {
            console.error('Non-Axios error:', error);
        }
        throw error;
        
        // Rethrowing the error is useful if you handle these errors upstream
    }
}

export async function deleteTask(id: number) {
    try {   
        if (!id) {
            throw new Error("updateTask.id value is missing");
        }
        const response = await axios.delete(`http://localhost:3000/api/tasks/${id}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function updateTask(updateTask: taskType) {
    try {
        const { id } = await updateTask;
        console.log('UPDATETASK : id is: ', id)
    
        if (!id) {
            console.log("Task id is required" );
        }    
        if (!updateTask.id) {
            throw new Error("updateTask.id value is missing");
        }
        const response = await axios.patch(`http://localhost:3000/api/tasks/${id}`, updateTask);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}


export async function getServerSideProps() {
    return {
        props: {}, // Will always run on the server and not be cached
    };
}
// export async function updateOneTask(updateTask: taskType) {
//     try {
//         const updatedTask = tasks.find((task) => task.id === taskId);
        
//         const { id } = await updateTask; 
//         console.log('UPDATETASK : id is: ', id)
    
//         if (!id) {
//             console.log("Task id is required" );
//         }    
//         if (!updateTask.id) {
//             throw new Error("updateTask.id value is missing");
//         }
//         const response = await axios.patch(`http://localhost:3000/api/tasks/${id}`, updateTask);
//         console.log(response.data);
//         return response.data;
//     } catch (error) {
//         console.error('Error:', error);
//         throw error;
//     }
//}



//----------------

        // fetch('http://localhost:3000/api/tasks/${id}') // /api/users?name=John&age=30'
        // .then(response => response.json())
        // .then(data => console.log(data))