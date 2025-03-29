import React from "react"

import Button from "../../Button"

const AppBarMenu = ({
  menuItems,
}: {
  menuItems: { icon: React.ReactNode; text: string; onClick: () => void }[]
}) => {
  return (
    <ul className="space-y-0.5">
      {menuItems.map((item, index) => (
        <React.Fragment key={item.text}>
          {index === 4 && <hr className="my-2 border-gray-200" />}
          <li>
            <Button
              variant="ghost"
              size="sm"
              onClick={item.onClick}
              className="flex w-full items-center justify-start gap-3 rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100"
            >
              {item.icon}
              <span className="text-sm font-medium">{item.text}</span>
            </Button>
          </li>
        </React.Fragment>
      ))}
    </ul>
  )
}

export default AppBarMenu
