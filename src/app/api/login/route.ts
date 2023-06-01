import prisma from '@/libs/prismadb';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

interface RequestBody {
  email: string;
  password: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user && (await bcrypt.compare(body.password, user.hashedPassword!))) {
      const { hashedPassword, ...userWithoutPass } = user;
      return NextResponse.json(userWithoutPass)
    }else return new NextResponse('Missing Info',{status:500})
  } catch (error) {
    console.log('logIn error');
  }
}
