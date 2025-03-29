import { WeddingCouple } from "@/types/WeddingCouple"

export function mergeWeddingLists(weddingInfo?: {
    completed?: WeddingCouple[]
    live?: WeddingCouple[]
    upcoming?: WeddingCouple[]
}) {
    return [
        ...(weddingInfo?.live || []),
        ...(weddingInfo?.completed || []),
        ...(weddingInfo?.upcoming || []),
    ]
}
export function getWeddingInfo(weddingInfo?: {
    completed?: WeddingCouple[]
    live?: WeddingCouple[]
    upcoming?: WeddingCouple[]
}, currentWeddingId?: string) {
    const wedding = mergeWeddingLists(weddingInfo).find(w => w.wedding_id === currentWeddingId)
    return wedding
}