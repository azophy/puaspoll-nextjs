import Link from 'next/link'

export default function Navbar() {
  return (
      <div className="flex space-x-4">
        <Link href="/" className="underline">Home</Link>
        <Link href="/vote" className="underline">Vote</Link>
      </div>
  )
}
