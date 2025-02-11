import { PrismaClient } from '@prisma/client'
import {NextRequest, NextResponse} from "next/server";

const prisma = new PrismaClient()

export async function GET  (request: NextRequest) {
    const tasks = await prisma.task.findMany()
    console.log(tasks)
    return NextResponse.json(tasks)
}

export async function POST (request: NextRequest){
    try {
        const body =  await request.json();
        console.log("Received body:", body);
        const newTask = await prisma.task.create({
            data: {
                category: body.category,
                title: body.title,
                description: body.description,    
            }
        })
        console.log('POST function: ', newTask)
        return NextResponse.json(newTask, {status: 201})
        }
    catch (error){
        console.error("Error during POST request:", error);
        return NextResponse.json({error: "Object is null."},{status: 500})
        }
        
}

