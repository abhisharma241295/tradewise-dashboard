export default function ExpenseFilter({
  category,
  setCategory,
}: {
  category: string | null
  setCategory: (category: string | null) => void
}) {
  return (
    <div className="flex flex-wrap gap-2 p-2">
      {category && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Filter:</span>
          <button
            onClick={() => setCategory(null)}
            className="inline-flex items-center rounded-full border bg-white px-3 py-1 text-sm text-black shadow-sm"
          >
            Category: {category} <span className="ml-1 text-green-600">✓</span>
          </button>
        </div>
      )}
    </div>
  )
}
