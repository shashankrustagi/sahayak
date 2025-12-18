export default function DashboardLayout({
  title,
  role,
  children,
}: {
  title: string
  role: string
  children: React.ReactNode
}) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <header className="mb-6 border-b pb-4">
        <h1 className="text-2xl font-semibold">
          {title}
        </h1>
        <p className="text-sm text-gray-600">
          Role: {role}
        </p>
      </header>

      <section>{children}</section>
    </div>
  )
}
