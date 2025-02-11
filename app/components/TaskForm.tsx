//-------------------------------
// Project: Task List Application
// (Ticket 7)
// Author: Anna Rankin
// This file creates the form for
// new tasks.
//-------------------------------

'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react'
import { task_category } from "@prisma/client"
import { createTask } from "../actions"
import { NewTaskType } from '../types'
import Link from 'next/link'
import { useRouter } from 'next/navigation' 
import  './../main.css'

//SUBMIT FORM
function TaskForm( { task }: { task: NewTaskType }) {
    const [title, setTitle] = useState<string>(task.title)
    const [description, setDescription] = useState<string>(task.description)
    const [category, setCategory] = useState <string>(task.category)
    const allCats = Object.keys(task_category)
    const router = useRouter();
    

    async function handleSubmit (e: FormEvent<HTMLFormElement>) {
            e.preventDefault();
            const formData = { id:0, title, description, category };
            await createTask(formData)
            router.push('/')                
    }//handleSubmit
    
    
    return (
        <>
        <div className='container '>
            <form onSubmit={handleSubmit}>
                <div className="flex-col  space-x-8 mt-8">
                    <div className='taskListApp newPageTitleWidth text-2xl text-center'>New Task</div>
                    <div> {/* Subcontainer - houses New Task div (top) and remaining div field (bottom) */}
                    <div className="flex-1">
                        <div ><label className='mt-5' htmlFor='category'>Category</label></div>
                        <div className="flex-row mt-2  w-20">
                            <select name="category" 
                                id="category" 
                                value={category} 
                                required
                                className="border rounded h-8 w-60 mb-5 "
                                onChange={(e: ChangeEvent<HTMLSelectElement>) => {setCategory(e.target.value)}}> 
                                <option value="">Select Category</option> {/* Default option */}                            
                                {allCats.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                    </div>        
                    <div className="flex-1">
                        <label htmlFor='title' >Title</label> 
                        <input
                            title="title"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {setTitle(e.target.value)}}
                            id="title"
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={title}
                            className="h-8 mb-5 "
                            required
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
                            required
                        />
                    </div>
                    <div className='flex justify-center items-end mb-1.5'>
                            <button type="submit" className='rounded mt-7 mr-7 
                                    hover:bg-blue-300 font-bold'> 
                                Add
                            </button>
                            <button className='rounded mt-7 mr-7 hover:bg-blue-300 font-bold' >
                                <Link href='/'> Return </Link>
                            </button>
                    </div>
                </div> {/*Subcontainer */}
                </div> 
            </form> 
        </div>
    </>
)}
export default TaskForm