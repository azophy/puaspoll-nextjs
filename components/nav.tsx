import Link from 'next/link'

export default function Navbar() {
  return (
      <div className="flex justify-between space-x-4">
        <Link href="/" className="underline hover:font-bold">Home</Link>
        <Link href="/poll/new" className="underline hover:font-bold">New Poll</Link>
      </div>
  )
}
