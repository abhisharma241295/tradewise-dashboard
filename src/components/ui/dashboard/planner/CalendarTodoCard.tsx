import React from "react"
import { MapPin, Mail } from "lucide-react"

interface Todo {
  id: string
  title: string
}

interface TodoCardProps {
  todos: Todo[]
  title: string
}

const CalendarTodoCard: React.FC<TodoCardProps> = ({ title, todos }) => {
  return (
    <div className="rounded-lg border bg-white p-4">
      <h3 className="mb-4 border-b pb-2 text-lg font-semibold">{title}</h3>
      <div className="space-y-2">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={`flex items-center rounded p-2 ${"hover:bg-[#ECF4F5]"}`}
          >
            {todo.id === "1" ? (
              <MapPin className="mr-2 text-gray-600" size={20} />
            ) : (
              <Mail className="mr-2 text-gray-600" size={20} />
            )}
            <span className="flex-grow">{todo.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CalendarTodoCard
