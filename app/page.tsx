import prisma from '../lib/prisma'

export const revalidate = 1 // revalidate every minute
 
async function getPolls() {
  const polls = await prisma.poll.findMany()
  return polls
}
 
import Link from 'next/link'
import Navbar from '../components/nav'

export default async function Home() {
  const polls = await getPolls()

  return (
    <main className="min-h-screen grid items-center justify-center">
      <div>
        <Navbar />
        <h1 className="text-center text-3xl font-bold">
          PuasPoll
        </h1>

        <div className="m-4 bg-gray-400 p-6">
          <h2>Existing polls</h2>
          <ul className="list-disc">
          { polls?.map(
            (poll: any) => <li key={poll.id}>
              <Link href={`/poll/${poll.id}`} className="underline hover:font-bold">{poll.title}</Link>
            </li>
          )}
          </ul>
        </div>
      </div>
    </main>
  )
}
