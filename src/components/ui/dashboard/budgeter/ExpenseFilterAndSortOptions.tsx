import { MenuItem } from "primereact/menuitem"

interface ExpenseFilterAndSortOptionsProps {
  setCategory: (category: string | null) => void
  category: string | null
  categories: string[]
}

const ExpenseFilterAndSortOptions = ({
  setCategory,
  category,
  categories,
}: ExpenseFilterAndSortOptionsProps) => {
  const getMenuItems = () => {
    const filterItems: MenuItem[] = [
      {
        label: "Category",
        items: [
          ...categories.map((cat) => ({
            label: cat,
            icon: "pi pi-check",
            command: () => setCategory(cat),
            className: category === cat ? "active-filter" : "",
          })),
        ],
      },
    ]

    return {
      filterItems,
    }
  }

  return getMenuItems()
}

export default ExpenseFilterAndSortOptions
