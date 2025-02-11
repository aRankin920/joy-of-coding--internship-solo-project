//This file is not a reusable component. It is only for navigation.
'use client'
import Link from 'next/link'
import React from 'react'
import axios from 'axios';
import { FaBug } from "react-icons/fa";
import { AiFillBug } from "react-icons/ai";
import {usePathname} from 'next/navigation';
import { FcEditImage } from "react-icons/fc";
import classnames from 'classnames';
import { useState, useEffect, ChangeEvent } from 'react'
import { task_category } from "@prisma/client"
import { getAllTasks } from '../actions'

const NavBar2 = ({tsk}: {tsk: []}) => {
        const [tasks, setTasks] = useState<any[]>([]);
        const [categoryInput, setCategoryInput] = useState<string>('');
        const [filteredTasks, setFilteredTasks] = useState<any[]>([]);
        const [sortOrder, setSortOrder] = useState('asc');
        const allCats = Object.keys(task_category)
        //const tasklist = await getAllTasks()
    
    const currentPath = usePathname(); //How to call this hook. Dynamically hold current path.
    console.log('current path is: ',currentPath);

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




    //'All Links' and 'Sort' links and Category select field   
    const handleSelection = (text_value:string,) =>{    
        console.log("Inside of HANDLESELECTION")
        if (text_value === 'All') {
            setFilteredTasks(tasks); // Reset to all tasks
            return tasks
        }

        if (text_value === 'Sort') {
            const sortedTasks = [...filteredTasks].sort((a, b) => 
            sortOrder === 'asc' ? a.id - b.id : b.id - a.id);
            setFilteredTasks(sortedTasks);
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle order
            return tasks;
        }

        if (text_value === 'Category' && categoryInput.trim()) {
            const filtered = tasks.filter(task => task.category.toLowerCase() === categoryInput.toLowerCase());
            console.log('filtered is: ', filtered)
            setFilteredTasks(filtered);
        }
    }//handleSelection



    //const sName= "";
    return (
        <nav className='flex space-x-6 border-b mb-1.5 px-5 h-14 items-center'>
            <Link href="/">List All <AiFillBug/></Link>
            <ul className='flex space-x-6'>
                <li><Link href='/' onClick={() => handleSelection('All')}>List All</Link> </li>
                <li><Link href='/' onClick={() => handleSelection('SORT')}>Sort</Link></li>
                <li></li>
            </ul>   
        </nav>
    )  
}

export default NavBar2