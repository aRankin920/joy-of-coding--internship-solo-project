//-------------------------------
// Project: Task List Application
// (Ticket 7)
// Author: Anna Rankin
// This file creates the form for
// editing pre-existing tasks.
//-------------------------------

'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react'
import { task_category } from "@prisma/client"
import { updateTask } from "../actions"
import { taskType } from '../types'
import  './../main.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation' 

function TaskFormUpdate( { task }: { task: taskType }) {
    const [title, setTitle] = useState<string>(task.title)
    const [description, setDescription] = useState<string>(task.description)
    const [category, setCategory] = useState <string>(task.category)
    const allCats = Object.keys(task_category)
    const router = useRouter();

    //SUBMIT FORM
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = {  
            id: task.id, 
            title, 
            description, 
            category
        };
        
        const response = await updateTask(formData)  
        router.push('/')  
    }//handleSubmit
    
    return (
        <>
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="flex-col  space-x-8 mt-8">
                    <div className='taskListApp newPageTitleWidth text-2xl text-center'>Edit Task</div>
                    <div> {/* Subcontainer - houses New Task div (top) and remaining div field (bottom) */}
                    <div className="flex-1">
                        <label className='mt-5' htmlFor='category'>Category</label>
                        <select name="category" 
                            id="category" 
                            value={category} 
                            className='border rounded h-8 w-60 mb-5'
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => {setCategory(e.target.value)}}>
                            
                            {allCats.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex-1 ">
                        <label  htmlFor='title' >Title</label> 
                        <input
                            title="title"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {setTitle(e.target.value)}}
                            id="title"
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={title}
                            className='h-8 mb-5'
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor='description'>Description</label> 
                        <input
                            title="description"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {setDescription(e.target.value)}}
                            id="description"
                            type="text"
                            placeholder="Description"
                            value={description}
                            className='h-8'
                        />
                    </div>
                    <div className='flex justify-center items-end  mb-1.5 '>
                            <button type="submit" className='rounded mt-7 mr-7  hover:bg-blue-300 font-bold'> 
                                Update
                            </button>
                            <button className='rounded mt-7 mr-7 hover:bg-blue-300 font-bold' >
                                <Link href='/'> Return </Link>
                            </button>
                    </div>
                </div>{/*Subcontainer */}
            </div>
        </form> 
        </div>
    </>
)}
export default TaskFormUpdate