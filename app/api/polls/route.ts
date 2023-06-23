import { NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'
import validateRecaptcha from '../../../lib/helper'

export const revalidate = 60 // revalidate every minute

export async function POST(request: Request) {
  try {
    const req = await request.json()

    const isRecaptchaValid = await validateRecaptcha(req.recaptchaToken)
    if (!isRecaptchaValid) throw new Error('recaptcha failed')

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
  } catch (err: any) {
    return NextResponse.json({
      ok: false,
      error: err.message,
    })
  }
}
