import { PrismaClient } from '@prisma/client'
import {NextRequest, NextResponse} from "next/server";
const prisma = new PrismaClient()

//GET
export async function GET  (request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = await params; // Destructure the id from params

    if (!id) {
        return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
    }
    const task = await prisma.task.findUnique({
        where:{ id: parseInt(id, 10)}
    })

    if (!task) {
        return NextResponse.json({error: "Task not found"}, { status: 404 })
    }
    console.log('Inside of GET:  task is: ', task)
    return NextResponse.json(task)
}

//DELETE
export async function DELETE (request: NextRequest, { params }: { params: { id: string } }) {
    //check if it exists
    const tasks = await prisma.task.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if (!tasks) {
        return NextResponse.json({error: "Task not found"}, { status: 404 })
    }  
    const deleteTask = await prisma.task.delete({
        where: {
            id: parseInt( await params.id),
        },
    })
    return NextResponse.json(deleteTask)
}


//PATCH
export async function PATCH (request: NextRequest, { params }: { params: { id: string } }) {
    const { id } =  await params; 
    if (!id) {
        return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
    }

    const body =  await request.json()
    const updatedTask = await prisma.task.update({
        where: {
            id: parseInt(id, 10),
        },
        data: {
            category: body.category,
            title: body.title,
            description: body.description,     
        }
    })

    return  NextResponse.json(updatedTask)
}
