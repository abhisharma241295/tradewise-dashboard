export default function PlannerFilterOptions({
  categories,
  setCategoriesToFilter,
  statuses,
  setStatusesToFilter,
}: {
  categories: string[]
  setCategoriesToFilter: (value: string[]) => void
  statuses: string[]
  setStatusesToFilter: (value: ("done" | "todo" | "inProgress")[]) => void
}) {
  return (
    <div className="flex flex-wrap gap-2 p-2">
      {(categories.length > 0 || statuses.length > 0) && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Filter:</span>
          {categories.length > 0 && (
            <button
              onClick={() => setCategoriesToFilter([])}
              className="inline-flex items-center rounded-full border bg-white px-3 py-1 text-sm text-black shadow-sm"
            >
              Categories: {categories.join(", ")}{" "}
              <span className="ml-1 text-green-600">✓</span>
            </button>
          )}
          {statuses.length > 0 && (
            <button
              onClick={() => setStatusesToFilter([])}
              className="inline-flex items-center rounded-full border bg-white px-3 py-1 text-sm text-black shadow-sm"
            >
              Statuses: {statuses.join(", ")}{" "}
              <span className="ml-1 text-green-600">✓</span>
            </button>
          )}
        </div>
      )}
    </div>
  )
}
