import { WeddingPlannerEventWithId } from "@/types/WeddingPlannerEvent"

interface ChecklistItem {
  text: string
  id: string
  checked: boolean
}

interface Collaborator {
  initials: string
  color: string
}

export interface Event {
  id: string
  category: string
  title: string
  date: string
  status: "todo" | "inProgress" | "done"
  checklist: ChecklistItem[]
  collaborators: Collaborator[]
}

// const mapChecklistStatus = (checklists: any[]): ChecklistItem[] => {
//   return checklists.map((checklist) => ({
//     text: checklist.checklist_name || "Unnamed Checklist", // Provide a default name if not present
//     checked: checklist.checklist_status === "completed", // Assuming completed status means checked
//     id: checklist.checklist_id,
//   }))
// }

// Function to merge all lists into a single list of Event
export const mergeTaskLists = (data: any): Event[] => {
  const mergedList: Event[] = []
  console.log(data)
  try {
    // Merge completed tasks
    console.log("Merging completed tasks...")
    data.completed?.forEach((task: WeddingPlannerEventWithId) => {
      console.log(`Processing completed task: ${task.todo_name}`)
      mergedList.push({
        id: task.todo_id || "", // Default to empty string if not present
        category: task.todo_category || "Completed", // Default category if not available
        title: task.todo_name || "Unnamed Task", // Default name if not available
        date: task.todo_due_date, // Default to current date if not present
        status:
          task.todo_status == "completed"
            ? "done"
            : task.todo_status == "in_progress"
              ? "inProgress"
              : "todo",
        checklist: task.checklists.map((item) => {
          return {
            id: item.checklist_id,
            text: item.checklist_name,
            checked: item.checklist_status == "completed",
          }
        }), // Assuming no checklists for completed tasks
        collaborators: [], // Assuming no collaborators for completed tasks
      })
    })
    console.log(`Total completed tasks merged: ${mergedList.length}`)
  } catch (e) {
    console.error("Error merging completed tasks:", e)
  }

  try {
    // Merge in-progress tasks
    console.log("Merging in-progress tasks...")
    data.in_progress?.forEach((task: WeddingPlannerEventWithId) => {
      console.log(`Processing in-progress task: ${task.todo_name}`)
      mergedList.push({
        id: task.todo_id || "", // Default to empty string if not present
        category: task.todo_category || "In Progress", // Default category if not available
        title: task.todo_name || "Unnamed Task", // Default name if not available
        date: task.todo_due_date, // Default to current date if not present
        status: "inProgress", // Default to 'unknown' status if not present
        checklist: task.checklists.map((item) => {
          return {
            id: item.checklist_id,
            text: item.checklist_name,
            checked: item.checklist_status == "completed",
          }
        }),
        collaborators: [], // Assuming no collaborators for in-progress tasks
      })
    })
    console.log(`Total in-progress tasks merged: ${mergedList.length}`)
  } catch (e) {
    console.error("Error merging in-progress tasks:", e)
  }

  try {
    // Merge todo tasks
    console.log("Merging todo tasks...")
    data.todo?.forEach((task: WeddingPlannerEventWithId) => {
      console.log(`Processing todo task: ${task.todo_name}`)
      mergedList.push({
        id: task.todo_id || "", // Default to empty string if not present
        category: task.todo_category || "Todo", // Default category if not available
        title: task.todo_name || "Unnamed Task", // Default name if not available
        date: task.todo_due_date, // Default to current date if not present
        status: "todo",
        checklist: task.checklists.map((item) => {
          return {
            id: item.checklist_id,
            text: item.checklist_name,
            checked: item.checklist_status == "completed",
          }
        }), // Assuming no checklists for todo tasks
        collaborators: [], // Assuming no collaborators for todo tasks
      })
    })
    console.log(`Total todo tasks merged: ${mergedList.length}`)
  } catch (e) {
    console.error("Error merging todo tasks:", e)
  }
  console.log("Merging task lists completed.")
  return mergedList
}
