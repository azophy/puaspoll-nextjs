import Link from 'next/link'

export default function Navbar() {
  return (
      <div class="flex space-x-4">
        <span>
          <Link href="/" class="underline">Home</Link>
        </span>
        <span>
          <Link href="/projects" class="underline">Projects</Link>
        </span>
      </div>
  )
}
