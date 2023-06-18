import prisma from '../../../../lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const req = await request.json()
  const poll = await prisma.poll.findUnique({
    where: { id: req.poll_id },
  })
  if (!poll) throw new Error('Poll not found')

  const incrementSubmissionCount = await prisma.poll.updateMany({
    data: { submissionCount: { increment: 1} },
    where: { id: req.poll_id },
  })

  req.choices.map(async (choice) => {
    await prisma.pollChoice.update({
      data: { count: { increment: parseInt(choice.count) } },
      where: { id: choice.id },
    })
  })

  return NextResponse.json({
    ok: true,
  })
}
