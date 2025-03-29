export interface InviteProps {
  groom_name: string
  bride_name: string
  wedding_date: string
  venue: string
  location: string
}

export interface InvitePageProps {
  invite: InviteProps
}
