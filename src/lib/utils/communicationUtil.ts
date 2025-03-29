import { CommunicationGroup } from "@/types/Communication"

export const getRelativeDate = (date: string, type: string) => {
    const now = new Date()
    const messageDate = new Date(date)

    const isToday = messageDate.toDateString() === now.toDateString()
    const isYesterday =
        messageDate.toDateString() ===
        new Date(now.setDate(now.getDate() - 1)).toDateString()

    if (isYesterday) return "Yesterday"
    if (type === "channel") {
        if (isToday) return getTimeInAMPMFormat(date)
    } else {
        if (isToday) return "Today"
    }
    return messageDate.toLocaleDateString() // e.g., "1/1/2025"
}

export const getTimeInAMPMFormat = (timestamp: string) => {
    const date = new Date(timestamp)
    let hours = date.getHours()
    const minutes = date.getMinutes()
    const ampm = hours >= 12 ? "PM" : "AM"
    hours = hours % 12
    hours = hours ? hours : 12
    const formattedMinutes = minutes.toString().padStart(2, "0")
    const formattedTime = `${hours}:${formattedMinutes} ${ampm}`
    return formattedTime
}

export const getGroupsEventsGuestsArray = (selectedGroup: CommunicationGroup) => {
    const eventsArray =
        selectedGroup && selectedGroup?.events && selectedGroup?.events.length > 0
            ? selectedGroup?.events.map((item) => item.event_name)
            : []
    const groupsArray =
        selectedGroup && selectedGroup?.groups && selectedGroup?.groups.length > 0
            ? selectedGroup?.groups.map((item) => item.group_name)
            : []
    const guestsArray =
        selectedGroup && selectedGroup?.guests && selectedGroup?.guests.length > 0
            ? selectedGroup?.guests.map((item) => item.guest_name)
            : []
    return [...eventsArray, ...groupsArray, ...guestsArray]
}

export const getInitials = (name: string) => {
    return name && name?.split(" ")[0]?.charAt(0)?.toUpperCase()
}