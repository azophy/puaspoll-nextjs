import prisma from '../../../lib/prisma'
import { NextResponse } from 'next/server'

export const revalidate = 60 // revalidate every minute
 
export async function POST(request: Request) {
  const req = await request.json()
  const result = await prisma.poll.create({
    data: {
      title: req.title,
      choices: {
        create: req.choices.map((label:string) => ({ label }))
      },
    }
  })
  return NextResponse.json({
    ok: true,
    data: { id: result.id },
  })
}
