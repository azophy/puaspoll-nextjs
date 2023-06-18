import Link from 'next/link'

export default function Navbar() {
  return (
      <div className="flex space-x-4">
        <Link href="/" className="underline">Home</Link>
        <Link href="/poll" className="underline">Poll</Link>
        <Link href="/poll/new" className="underline">New Poll</Link>
      </div>
  )
}
