//-------------------------------
// Project: Task List Application
// (Ticket 7)
// Author: Anna Rankin
// This application allows users
// to manage todo tasks.  
// The application allows you to
// add new tasks, update, delete and 
// displays existing tasks.
//-------------------------------

import './main.css'
import ManageList from "./components/ManageList"
import { getAllTasks } from './actions'
import Link from 'next/link'
import { Button } from '@radix-ui/themes';
import { AddTaskIcon } from './components/PageIcon'

async function App( ) {
  const tasklist = await getAllTasks()

  return (
    <>
      <h1 className='taskListApp w-full text-3xl text-center'>Task List Application</h1>
      <ManageList allTasks={tasklist}/>
    </>
  )
}
export default App


