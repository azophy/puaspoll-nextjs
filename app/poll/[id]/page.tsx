import prisma from '../../../lib/prisma'
 
export const revalidate = 60 // revalidate every minute
import Navbar from '../../../components/nav'
import Poll from '../../../components/poll'
 
async function getPoll(id: string) {
  const poll = await prisma.poll.findUnique({
    where: { id },
    include: {
      choices: true,
    },
  })

  return poll
}

export default async function Page({ params }: { params: { id: string } }) {
  const poll = await getPoll(params.id)
  if (!poll) throw new Error('Poll not found')

  const choices = poll.choices.map(choice => ({
    id: choice.id,
    label: choice.label,
    count: 0,
  }))

    return (
      <main className="min-h-screen grid items-center justify-center">
      <div>
        <Navbar />
        <Poll 
          title={poll.title}
          choices={poll.choices}
        />

        <div className="m-4 bg-gray-200 p-6">
          <h2 className="text-lg font-bold">Result</h2>
          <span>
          {poll.submissionCount} Submission
          </span>
          <ul className="list-disc">
          { poll.choices.map((choice:any) => (
            <li key={choice.id}>{choice.label}: {choice.count} poll</li>
          ))}
          </ul>
        </div>
      </div>
      </main>
    )
}
