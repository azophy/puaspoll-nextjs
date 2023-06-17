import prisma from '../lib/prisma'

export const revalidate = 3600 // revalidate every hour
 
async function getPolls() {
  const polls = await prisma.poll.findMany()
  return polls
}
 
import Link from 'next/link'
import Navbar from '../common/nav'

export default async function Home() {
  const polls = await getPolls()

  return (
    <main className="min-h-screen grid items-center justify-center">
      <div>
        <Navbar />
        <h1 className="text-3xl font-bold">
          PuasPoll
        </h1>
	<ul>
	{ polls?.map(
	  (poll: any) => <li key={poll.id}>
	    <Link href={`/vote/${poll.id}`} className="underline">{poll.title}</Link>
	  </li>
	)}
	</ul>
      </div>
    </main>
  )
}
