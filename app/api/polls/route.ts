import prisma from '../../../lib/prisma'
import { NextResponse } from 'next/server'

export const revalidate = 60 // revalidate every minute
 
async function validateRecaptcha(token:string) {
  const secret_key = process.env.RECAPTCHA_SECRET_KEY
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`

  const res = await fetch(url, {
    method: 'post'
  })
  const google_response = await res.json()
  return (google_response.success == true)
}

export async function POST(request: Request) {
  const req = await request.json()

  const isRecaptchaValid = await validateRecaptcha(req.recaptchaToken)
  if (!isRecaptchaValid) throw new Error('recaprcha failed')

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
