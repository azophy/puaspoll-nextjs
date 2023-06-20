import { NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'
import validateRecaptcha from '../../../../lib/helper'

export async function POST(request: Request) {
  const req = await request.json()

  const isRecaptchaValid = await validateRecaptcha(req.recaptchaToken)
  if (!isRecaptchaValid) throw new Error('recaptcha failed')

  const poll = await prisma.poll.findUnique({
    where: { id: req.poll_id },
  })
  if (!poll) throw new Error('Poll not found')

  const incrementSubmissionCount = await prisma.poll.updateMany({
    data: { submissionCount: { increment: 1} },
    where: { id: req.poll_id },
  })

  req.choices.map(async (choice: any) => {
    await prisma.pollChoice.update({
      data: { count: { increment: parseInt(choice.count) } },
      where: { id: choice.id },
    })
  })

  return NextResponse.json({
    ok: true,
  })
}
