// src/components/PageContainer.tsx
export default function PageContainer({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold mb-6">
        {title}
      </h1>
      {children}
    </div>
  )
}
