'use client'
import './DisplayList.css'
import React from 'react';
import { useState, useEffect, ChangeEvent } from 'react'
import axios from 'axios';
import { task_category } from "@prisma/client"
import { deleteTask, updateTask } from '../actions';
import Link from 'next/link';
import { Button } from '@radix-ui/themes';
import NavBar2 from './NavBar2';
import { DropdownMenu } from "radix-ui";


function DisplayList() {
    const [tasks, setTasks] = useState<any[]>([]);
    const [category, setCategory] = useState<string>()
    const [categoryInput, setCategoryInput] = useState<string>('');
    const [editableTask, setEditableTask] = useState<number | null>(null);
    const [filteredTasks, setFilteredTasks] = useState<any[]>([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const allCats = Object.keys(task_category)

    useEffect(() => {
        const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/tasks');
            setTasks(response.data);
            setFilteredTasks(response.data);
            //const categories:string[] = Array.from(new Set(response.data.map((task: any) => task.category)));
            //setAllCategories(categories);
        } catch (error) {
            console.error('Error fetching tasks', error);
        }};
        fetchTasks();
    }, []);


    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, id: number) => {
        const { name, value } = e.target;
        setTasks(prevTasks => 
            prevTasks.map(task => 
                task.id === id ? { ...task, [name]: value } : task
            )
        );
    }; //handleChange


    //UPDATE
    const handleUpdate = async (task: any) => {
        try {
            const formData = { 
                id:task.id, 
                category: task.category,
                title: task.title,
                description: task.description,
            };
            await updateTask(formData);

        } catch (error) {
            console.error("Error updating task:", error);
        }};


    //Delete
    const handleDelete = async (id:string) => {
        console.log('Delete task with ID:', id);
        await deleteTask(parseInt(id));
        setTasks(tasks.filter((task) => task.id !== id));
        {window.location.reload();}
    };//handleDelete


    //'All Links' and 'Sort' links and Category select field   
    const handleSelection = (text_value:string,) =>{     
        if (text_value === 'All') {
            setFilteredTasks(tasks); // Reset to all tasks
            return  
        }

        if (text_value === 'Sort') {
            const sortedTasks = [...filteredTasks].sort((a, b) => 
            sortOrder === 'asc' ? a.id - b.id : b.id - a.id);
            setFilteredTasks(sortedTasks);
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle order
            return;
        }

        if (text_value === 'Category' && categoryInput.trim()) {
            const filtered = tasks.filter(task => task.category.toLowerCase() === categoryInput.toLowerCase());
            console.log('filtered is: ', filtered)
            setFilteredTasks(filtered);
        }
    }//handleSelection

    //Category selection
    function handleCategory(selectedCategory:string){
        if (selectedCategory) {
        const filtered = tasks.filter(task => task.category === selectedCategory);
        setFilteredTasks(filtered);
        }
    }//handleCategory

    //This is used to align the Task ID
    function idAlignment (id:string) {
        let temp = ''; 
        if (parseInt(id) < 10){
            temp = temp.concat('0', id);
            return temp;
        }
        return id     
    }//idAlignment

    return (
        <> 
            {/* TABLE navigation for List-All & SORT links and FILTER list. */}
            <div className="table ">
                <div className="header-row "> 
                    <div className='taskListLinks mt-0 text-8 border-y-black  text-start TaskBarLinks'>
                    <div className='flex flex-col  mb-2 w-full '>
                    <ul className='flex  '>
                        {/* LIST ALL Link */}
                        <li className='mt-3 mr-[30px] ml-[10px]'>
                            <Link href='/' onClick={() => handleSelection('All')} className='hover:text-white transition-colors'>
                                List All
                            </Link>
                        </li>
                        {/* SORT Link */}
                        <li className='mt-3 mr-[20px]'>
                            <Link href='/' onClick={() => handleSelection('Sort')} className='hover:text-white'>
                                Sort
                            </Link>
                        </li>
                        {/* CATEGORY Search DROPLIST */}
                        <li className="mb-2 mt-2 ml-[10px]">
                            {/* Single Dropdown for Categories */}
                            <div className=" mr-2">
                            <select
                                onChange={(e) => {
                                    const selectedCategory = e.target.value;
                                    setCategory(selectedCategory);
                                    handleCategory(selectedCategory); // Pass directly instead of relying on async state
                                }}
                                name="category"
                                id="category"
                                value={category || ""} // Ensure it's always a valid string
                                className="border p-1 w-56 "
                            >
                                <option value="">Select Category</option> {/* Default option */}
                                {allCats.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                            </div>
                        </li>
                        <li> 
                            <Button type="submit"  color="blue" variant="outline" 
                                className='text-[rgb(3,63, 116)] hover:text-white transition-colors"'
                                    style={{ marginTop: "10px", marginLeft: "25px", width: "84px", 
                                            padding: "4px 4px", fontSize: "16px", fontWeight: "bold" }}  > 
                                <Link href='./Tasks/new' >         
                                    Add Task
                                </Link>    
                            </Button>
                        </li>
                    </ul>
                    </div>
                    </div> {/*TaskListLink*/}
    
                    {/* LIST HEADERS */}
                    <div className='float-left ml-3' header-cell={'Task ID'} >Task ID</div>
                    <div className='float-start ml-16 mr-5 ' header-cell={'Category'}>Category</div>
                    <div className='float-start ml-48 ' header-cell={'Title'}>Title</div>
                    <div className='float-start ml-96 -mr-52' header-cell={'Description'}>Description</div>
                </div> {/*header-Rows*/}
                    <div className="task-list-container">
                    {filteredTasks.map((task) => ( 
                    <div key={task.id}>  
                        <div  className="flex "> 
                            <label className='mt-2 ml-6 mr-7'>{idAlignment (task.id)}</label>
                            <div className="ml-3 mr-2"> 
                                <select
                                    onChange={(e) => handleChange(e, task.id)}
                                    name="category"
                                    id="category"
                                    value={task.category}
                                    className="border p-1 w-56"
                                    >
                                        {allCats.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                </select>
                            </div>                           
                            <div className="mr-2">
                                <input
                                    title="title"
                                    onChange={(e) => handleChange(e, task.id)}
                                    id="title"
                                    type="text"
                                    placeholder="Title"
                                    value={task.title}
                                    className="border p-1 w-60"
                                    onFocus={() => handleUpdate(task)} // Enable editing when the field is focused
                                    disabled={editableTask !== task.id} // Make field editable if it's the selected task
                                />
                            </div>
                            <div className="flex-1">
                                <input
                                    title="description"
                                    onChange={(e) => handleChange(e, task.id)}
                                    id="description"
                                    type="text"
                                    placeholder="description"
                                    value={task.description}
                                    className="border p-1 w-full"
                                />
                            </div>
                            <div className='flex justify-center items-end mb-1'>
                                <div>
                                    <div className='flex flex-row'>
                                        
                                        <Button type="submit"  color="blue" variant="soft" 
                                                style={{ marginLeft: "12px", marginRight: "7px", 
                                                        padding: "4px 4px", fontSize: "12px" }} 
                                                onClick={() => handleUpdate(task)}
                                            >
                                            <Link href={`./Tasks/${task.id}/edit`}>
                                                Update
                                            </Link>
                                        </Button>
                                        <Button type="submit"  color="blue" variant="soft" 
                                                style={{ marginLeft: "4px", marginRight: "4px", 
                                                        padding: "4px 4px", fontSize: "12px" }} 
                                                onClick={() => handleDelete(task)}
                                            >
                                                Remove
                                        </Button>
                                    </div> 
                                </div> 
                            </div> {/*button container*/}
                        </div> 
                    </div>
                    ))} {/*task.map*/}
                </div>
            </div>
        </>
    ) //return
} //DisplayList
export default DisplayList
