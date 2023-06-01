import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'

import prisma from '@/libs/prismadb'

interface RequestBody {
  name:string,
  email:string,
  password:string,
}

export async function POST(request:Request){
  const body:RequestBody = await request.json();

  try {
    const user = await prisma.user.create({
      data:{
        name:body.name,
        email:body.email,
        hashedPassword: await bcrypt.hash(body.password,10)
      }
    })

    const {hashedPassword, ... result} = user
    return NextResponse.json(result);
  } catch (error) {
    console.log(error)
    return new NextResponse('Register Error', {status:500})
  }
}
