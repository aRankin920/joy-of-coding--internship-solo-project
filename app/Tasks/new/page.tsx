'use server'
import React from 'react';
import '@/app/components/styles.css'
import TaskForm from '@/app/components/TaskForm';

async function NewTask( ) {
  // Default task structure
  const task = { 
    category: ' ',
    title: ' ',
    description: ' '
  };

  return (
    <div className='bg-blue-100 h-full'>
      <TaskForm task={task} /> 
    </div>
  )
}
export default NewTask
