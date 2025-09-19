import Link from 'next/link'

export default function Navbar(){
  return (
    <nav className="bg-blue-500 p-4 mb-6">
      <div className="max-w-7xl mx-auto flex justify-center items-center">
        <Link href="/" className="text-white text-2xl font-bold">
          Product Showcase
        </Link>
      </div>
    </nav>
  )
}