import Link from 'next/link'
import Navbar from '../common/nav'

export default function Home() {
  return (
    <main className="min-h-screen grid items-center justify-center">
      <div>
        <h1 className="text-3xl font-bold">
          Abit belajar nextjs
        </h1>
        <Navbar />
      </div>
    </main>
  )
}
