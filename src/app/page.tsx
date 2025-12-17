import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">SAHAYAK</h1>
        <p className="text-gray-600">
          Real-time emergency coordination platform
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            href="/login"
            className="px-6 py-3 bg-black text-white rounded"
          >
            Login
          </Link>

          <Link
            href="/citizen/emergency"
            className="px-6 py-3 bg-red-600 text-white rounded"
          >
            Emergency
          </Link>
        </div>
      </div>
    </main>
  )
}
