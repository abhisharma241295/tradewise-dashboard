import { FullName } from "./FullName"

export interface WeddingCouple {
  couple: FullName[]
  wedding_date: string
  wedding_days_left: string
  wedding_id: string
  wedding_location: string
  wedding_status: string
  image_url?: string
}
// {
//     "couple": [
//         {
//             "first_name": "Emily",
//             "last_name": "Williams"
//         },
//         {
//             "first_name": "Michael",
//             "last_name": "Johnson"
//         }
//     ],
//     "wedding_date": "2023-12-31",
//     "wedding_days_left": "0",
//     "wedding_id": "89058182-4fad-4fbb-b4b4-b0880dee3985",
//     "wedding_location": "Sunset Beach Resort, Hawaii",
//     "wedding_status": "upcoming"
// }
