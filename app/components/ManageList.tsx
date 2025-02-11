'use client'
import React from 'react';
import { FieldNames } from './FieldNames';
import { taskType } from '../types'
import DisplayList from './DisplayList';

export default function ManageList({allTasks}: {allTasks: taskType[]}) {
    //@ts-ignore
        return (
            <>
                <FieldNames />
                <DisplayList />    
            </>
        );
}


