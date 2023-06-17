import prisma from '../../../lib/prisma'
 
export const revalidate = 3600 // revalidate every hour
import Navbar from '../../../common/nav'
import Vote from '../vote'
 
async function getPoll(id: string) {
  const poll = await prisma.poll.findUnique({
    where: { id },
    include: {
      choices: true,
    },
  })

  return poll
}

export default async function VotePage({ params }: { params: { id: string } }) {
  const poll = await getPoll(params.id)
  const choices = poll.choices.map(choice => choice.label)

    return (
      <div>
        <Vote 
	  title={poll.title}
	  choices={choices}
	/>
        <Navbar />
      </div>
    )
}
