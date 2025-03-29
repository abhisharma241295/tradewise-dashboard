export default function GuestFilterAndSortOptions({
  status,
  setStatus,
  eventFilter,
  setEventFilter,
  belongsToFilter,
  setBelongsToFilter,
  sort,
  setSort,
}: {
  status: null | "undecided" | "coming"
  setStatus: (value: null | "undecided" | "coming") => void
  eventFilter: any
  setEventFilter: (value: any) => void
  belongsToFilter: any
  setBelongsToFilter: (value: any) => void
  sort: { type: "name"; order: "name_asc" | "name_desc" | null }
  setSort: (value: {
    type: "name"
    order: "name_asc" | "name_desc" | null
  }) => void
}) {
  return (
    <div className="flex flex-wrap gap-2 p-2">
      {(status || eventFilter || belongsToFilter) && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Filter:</span>
          {status === "coming" && (
            <button
              onClick={() => setStatus(null)}
              className="inline-flex items-center rounded-full border bg-white px-3 py-1 text-sm text-black shadow-sm"
            >
              Status: Coming <span className="ml-1 text-green-600">✓</span>
            </button>
          )}
          {status === "undecided" && (
            <button
              onClick={() => setStatus(null)}
              className="inline-flex items-center rounded-full border bg-white px-3 py-1 text-sm text-black shadow-sm"
            >
              Status: Undecided <span className="ml-1 text-green-600">✓</span>
            </button>
          )}
          {eventFilter && (
            <button
              onClick={() => setEventFilter(null)}
              className="inline-flex items-center rounded-full border bg-white px-3 py-1 text-sm text-black shadow-sm"
            >
              Event: {eventFilter.event_name}{" "}
              <span className="ml-1 text-green-600">✓</span>
            </button>
          )}
          {belongsToFilter && (
            <button
              onClick={() => setBelongsToFilter(null)}
              className="inline-flex items-center rounded-full border bg-white px-3 py-1 text-sm text-black shadow-sm"
            >
              Belongs To: {belongsToFilter}{" "}
              <span className="ml-1 text-green-600">✓</span>
            </button>
          )}
        </div>
      )}
      {sort.order && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort:</span>
          <button
            onClick={() =>
              setSort({
                type: "name",
                order: null,
              })
            }
            className="inline-flex items-center rounded-full border bg-white px-3 py-1 text-sm text-black shadow-sm"
          >
            Name {sort.order === "name_asc" ? "↑" : "↓"}
          </button>
        </div>
      )}
    </div>
  )
}
