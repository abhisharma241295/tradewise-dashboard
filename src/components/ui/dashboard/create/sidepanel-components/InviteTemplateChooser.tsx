import React, { useState } from "react"

interface Template {
  id: number
  name: string
  image: string
  selected: boolean
}

interface Props {
  setSelectedInviteTemplate: (string) => void
  selectedInviteTemplate: string
}

const InviteTemplateChooser = ({
  setSelectedInviteTemplate,
  selectedInviteTemplate,
}: Props) => {
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: "1",
      name: "Temp Name 1",
      image: "/invites/invite1.jpg",
      selected: selectedInviteTemplate === "1" && true,
    },
    {
      id: "2",
      name: "Temp Name 2",
      image: "/invites/invite2.jpg",
      selected: selectedInviteTemplate === "2" && true,
    },
    {
      id: "3",
      name: "Temp Name 3",
      image: "/invites/invite3.jpg",
      selected: selectedInviteTemplate === "3" && true,
    },
    {
      id: "4",
      name: "Temp Name 4",
      image: "/invites/invite4.jpg",
      selected: selectedInviteTemplate === "4" && true,
    },
    {
      id: "5",
      name: "Temp Name 5",
      image: "/invites/invite5.jpg",
      selected: selectedInviteTemplate === "5" && true,
    },
  ])

  const handleSelect = (id: number) => {
    setTemplates(
      templates.map((template) => ({
        ...template,
        selected: template.id === id,
      }))
    )
    setSelectedInviteTemplate(id)
  }
  console.log("temp", templates)
  return (
    <div className="overflow-y-auto bg-white p-2">
      <h1 className="mb-2 font-semibold text-gray-700">
        Select Design Template
      </h1>

      <div className="overflow-x-auto">
        <div className="flex space-x-6 pb-4">
          {templates.map((template) => (
            <div key={template.id} className="relative flex-shrink-0">
              <div
                className={`cursor-pointer overflow-hidden rounded-lg border-2 transition-all ${template.selected ? "border-blue-500" : "border-gray-200"}`}
                onClick={() => handleSelect(template.id)}
              >
                <img
                  src={template.image}
                  alt={template.name}
                  className="h-32 w-full object-cover"
                />
              </div>

              <div className="mt-3 flex items-center">
                <div
                  className={`mr-2 flex h-5 w-5 items-center justify-center rounded-full border-2 ${template.selected ? "border-blue-500 bg-blue-500" : "border-gray-300"}`}
                >
                  {template.selected && (
                    <div className="h-2 w-2 rounded-full bg-white" />
                  )}
                </div>
                <span className="text-sm text-gray-700">{template.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default InviteTemplateChooser
