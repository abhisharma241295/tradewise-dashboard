import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Paginator } from "primereact/paginator"
import { FilterIcon, Trash } from "lucide-react"
import CustomButton from "@/components/ui/Button"
import { Sidebar } from "primereact/sidebar"
import { useEffect, useRef, useState } from "react"
import ExpenseEntry from "@/types/Expense"
import { useAppSelector } from "@/lib/redux/hooks"
import {
  useBulkDeleteExpensesMutation,
  useGetExpensesQuery,
} from "@/lib/redux/features/apis/expenseApi"
import { getCurrentWedding } from "@/lib/cookies/currentWeddingCookie"
import { cn } from "@/lib/utils/cn"
import ExpenseCard from "./ExpenseCard"
import { TieredMenu } from "primereact/tieredmenu"
import ExpenseFilterAndSortOptions from "./ExpenseFilterAndSortOptions"
import { Button } from "primereact/button"
import SearchButton from "../../commons/SearchButton"
import { Dialog } from "primereact/dialog"
import ExpenseSidesheetContent from "./ExpenseSidesheetContent"
import { Skeleton } from "primereact/skeleton"
import { ExpenseCategory } from "@/lib/raw-data/expenseCategory"
import ExpenseFilter from "./ExpenseFilter"
import { toast } from "sonner"

interface ExpenseTableProps {
  data: any
  noExpensesAvailable: boolean
  setNoExpensesAvailable: (value: boolean) => void
}

const ExpenseTable: React.FC<ExpenseTableProps> = ({
  data,
  noExpensesAvailable,
  setNoExpensesAvailable,
}) => {
  const [first, setFirst] = useState<number>(0)
  const [rows, setRows] = useState<number>(20)
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState<boolean>(false)

  const [selectedExpenses, setSelectedExpenses] = useState<
    Array<{
      id: string
      description: string
      paid: number
      due: number
      dueDate: string
      paymentTo: string
      category: string
    }>
  >([])

  const [expenseFormVisible, setExpenseFormVisible] = useState(false)
  const [expenseDetailsVisible, setExpenseDetailsVisible] = useState(false)
  const filterTieredMenu = useRef<TieredMenu>(null)
  const [category, setCategory] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const currentWeddingId =
    useAppSelector((state) => state.currentWedding.currentWeddingId) ||
    getCurrentWedding()
  const {
    data: expenseResponse,
    isLoading: useGetExpensesQuery_isLoading,
    isFetching: useGetExpensesQuery_isFetching,
    error: expenseError,
  } = useGetExpensesQuery({
    weddingId: currentWeddingId,
    pagination: {
      page: Math.floor(first / rows) + 1,
      perPage: rows,
      search: searchTerm,
      expenseCategory: category || undefined,
    },
  })
  useEffect(() => {
    if (expenseError) {
      toast.error("Failed to fetch expenses. Please try again later.")
    }
  }, [expenseError])

  const expenseData = (expenseResponse ? expenseResponse : data) as {
    items: {
      amount: number
      category: string
      due_amount: number
      due_date: string
      id: string
      overdue: boolean
      paid_amount: number
      payment_to: string
      reminder: string
      title: string
    }[]
    pagination: {
      current_page: number
      has_next: boolean
      has_prev: boolean
      next_page: number | null
      per_page: number
      prev_page: number | null
      total_items: number
      total_pages: number
    }
  }
  const [
    bulkDelete,
    { isLoading: useDeleteExpenseMutation_isLoading, isError, error },
  ] = useBulkDeleteExpensesMutation()
  const [focussedExpense, setFocussedExpense] = useState<any>(null)
  useEffect(() => {
    let filteredExpenses = expenseData?.items
      ? expenseData.items.map((data: any) => ({
          id: data.id,
          description: data.title,
          paid: data.amount,
          due: data.due_amount,
          dueDate: data.due_date || "null",
          paymentTo: data.payment_to,
          category: data.category,
        }))
      : []

    setNoExpensesAvailable(filteredExpenses.length === 0)
  }, [expenseData, setNoExpensesAvailable])

  useEffect(() => {
    if (isError && error) {
      toast.error("Failed to delete expenses. Please try again.", {
        duration: 3000,
      })
    }
  }, [isError, error])

  const onPageChange = (event: any) => {
    const newPage = Math.floor(event.first / event.rows) + 1
    setFirst((newPage - 1) * event.rows)
    setRows(event.rows)
  }

  // const iconTemplate = (rowData: ExpenseEntry) => {
  //   const icons: any = {
  //     1: "",
  //     2: "",
  //     3: "",
  //     4: "",
  //     5: "",
  //   }
  //   return (
  //     <span style={{ fontSize: "1.2em", marginRight: "8px" }}>
  //       {icons[Math.floor(Math.random() * 5)]}
  //     </span>
  //   )
  // }

  const descriptionTemplate = (rowData: ExpenseEntry) => {
    return (
      <div className="flex items-center hover:underline">
        {/* {iconTemplate(rowData)} */}
        <span>{rowData.description}</span>
      </div>
    )
  }

  const amountTemplate = (rowData: ExpenseEntry, field: "paid" | "due") => {
    return (
      <span style={{ color: field === "paid" ? "#4CAF50" : "#000" }}>
        ${rowData[field]}
      </span>
    )
  }

  const paymentToTemplate = (rowData: ExpenseEntry) => {
    return (
      <div className="flex w-min items-center rounded-full bg-accent p-1">
        <span className="mr-1 flex size-6 items-center justify-center rounded-full bg-[#00BCD4] text-white">
          {rowData.paymentTo[0].toUpperCase()}
        </span>
        <span className="mr-1 font-semibold">{rowData.paymentTo}</span>
      </div>
    )
  }

  async function onBulkDelete(selectedExpenses: string[]) {
    try {
      const response = await bulkDelete({
        weddingId: currentWeddingId,
        listOfExpenseIds: selectedExpenses,
      })

      // Handle successful deletion
      if ("data" in response) {
        console.log("Expenses deleted successfully")
      }
    } catch (err) {
      console.error("Error deleting expenses:", err)
    }
  }

  const EmptyStateTemplate = () => (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="mb-4 text-gray-400">
        <svg
          width="180"
          height="213"
          viewBox="0 0 180 213"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse
            opacity="0.2"
            cx="90"
            cy="174.6"
            rx="90"
            ry="5.4"
            fill="#B6D3D6"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.1996 43.2C16.1996 31.2706 25.8703 21.6 37.7996 21.6C49.729 21.6 59.3996 31.2706 59.3996 43.2C59.3996 55.1294 49.729 64.8 37.7996 64.8C25.8703 64.8 16.1996 55.1294 16.1996 43.2ZM37.7996 18C23.882 18 12.5996 29.2824 12.5996 43.2C12.5996 55.8953 21.9874 66.398 34.1996 68.1448V122.4C34.1996 130.353 40.6467 136.8 48.5996 136.8H131.4C139.353 136.8 145.8 130.353 145.8 122.4V106.2H147.6C151.576 106.2 154.8 102.976 154.8 99V90C154.8 86.0236 151.576 82.8 147.6 82.8H145.8V66.6C145.8 58.6471 139.353 52.2 131.4 52.2H127.8V48.6C127.8 41.6412 122.158 36 115.2 36H61.956C58.8581 25.5906 49.2153 18 37.7996 18ZM62.7444 39.6C62.9126 40.7758 62.9996 41.9777 62.9996 43.2C62.9996 46.3709 62.414 49.405 61.3449 52.2H124.2V48.6C124.2 43.6294 120.17 39.6 115.2 39.6H62.7444ZM59.6283 55.8C55.2711 63.3323 47.1272 68.4 37.7996 68.4V122.4C37.7996 128.365 42.6349 133.2 48.5996 133.2H131.4C137.364 133.2 142.2 128.365 142.2 122.4V106.2H117C113.023 106.2 109.8 102.976 109.8 99V90C109.8 86.0236 113.023 82.8 117 82.8H142.2V66.6C142.2 60.6353 137.364 55.8 131.4 55.8H59.6283ZM67.0714 82.8C65.5005 82.8 64.1587 83.1 63.0078 83.6583L62.9994 83.6624C61.8455 84.2148 60.972 84.9682 60.3312 85.9221C59.7267 86.8339 59.3996 87.9225 59.3996 89.2559C59.3996 90.8616 59.8743 91.9784 60.6996 92.7965C61.6653 93.7357 63.0503 94.5074 64.9601 95.0398L64.9612 95.0401L67.8907 95.8588L67.8935 95.8596C68.8879 96.1344 69.7916 96.4577 70.5917 96.8378C71.4767 97.2447 72.2594 97.7984 72.855 98.5407C73.542 99.3867 73.8343 100.403 73.8464 101.455L73.8465 101.495C73.8345 102.639 73.5093 103.71 72.8356 104.638L72.8279 104.649C72.1777 105.531 71.3048 106.18 70.2853 106.625L70.2754 106.629C69.243 107.072 68.1024 107.267 66.895 107.267C66.1085 107.267 65.0945 106.998 64.359 106.777C64.3027 106.76 64.2466 106.743 64.1906 106.725L63.9155 107.658C64.7996 107.881 65.8013 108 66.9328 108C68.8024 108 70.2813 107.686 71.4332 107.138C72.619 106.568 73.4596 105.817 74.0315 104.9C74.6069 103.969 74.9195 102.862 74.9195 101.517C74.9195 100.511 74.7454 99.7233 74.4578 99.1051C74.139 98.4202 73.7153 97.853 73.1851 97.3847L73.1772 97.3777C72.602 96.8637 71.9428 96.4316 71.1906 96.0839L71.1848 96.0812C70.3906 95.7107 69.5616 95.416 68.6962 95.1974L68.6657 95.1894L66.2576 94.5361C65.6642 94.3823 65.0774 94.1935 64.4974 93.9701C63.8576 93.7237 63.2588 93.4152 62.7079 93.0401L62.6866 93.0254C62.0593 92.5849 61.5384 92.033 61.1492 91.3713L61.136 91.3484C60.7122 90.603 60.5355 89.7791 60.5355 88.9415V88.92H60.5356C60.5479 87.8899 60.8317 86.9182 61.4109 86.0611C61.9935 85.1988 62.8047 84.5675 63.7529 84.1336C64.7395 83.6822 65.8435 83.492 67.0084 83.492C67.8273 83.492 68.6149 83.5889 69.3529 83.8011L69.6007 83.0982C68.8482 82.9034 68.0085 82.8 67.0714 82.8ZM148.92 136.143C148.92 138.762 151.043 140.885 153.662 140.885H163.418C166.037 140.885 168.16 138.762 168.16 136.143C168.16 133.524 166.037 131.401 163.418 131.401H153.662C151.043 131.401 148.92 133.524 148.92 136.143ZM153.662 137.285C153.031 137.285 152.52 136.774 152.52 136.143C152.52 135.512 153.031 135.001 153.662 135.001H163.418C164.049 135.001 164.56 135.512 164.56 136.143C164.56 136.774 164.049 137.285 163.418 137.285H153.662ZM138.6 155.692C138.6 158.311 140.723 160.434 143.342 160.434C145.961 160.434 148.084 158.311 148.084 155.692V145.936C148.084 143.317 145.961 141.194 143.342 141.194C140.723 141.194 138.6 143.317 138.6 145.936V155.692ZM143.342 156.834C142.711 156.834 142.2 156.322 142.2 155.692V145.936C142.2 145.305 142.711 144.794 143.342 144.794C143.973 144.794 144.484 145.305 144.484 145.936V155.692C144.484 156.322 143.973 156.834 143.342 156.834ZM33.2996 31.5C33.2996 29.0147 35.3143 27 37.7996 27C40.2849 27 42.2996 29.0147 42.2996 31.5V42.3C42.2996 44.7853 40.2849 46.8 37.7996 46.8C35.3143 46.8 33.2996 44.7853 33.2996 42.3V31.5ZM37.7996 30.6C37.3026 30.6 36.8996 31.0029 36.8996 31.5V42.3C36.8996 42.7971 37.3026 43.2 37.7996 43.2C38.2967 43.2 38.6996 42.7971 38.6996 42.3V31.5C38.6996 31.0029 38.2967 30.6 37.7996 30.6ZM37.7996 59.4C35.3143 59.4 33.2996 57.3853 33.2996 54.9C33.2996 52.4147 35.3143 50.4 37.7996 50.4C40.2849 50.4 42.2996 52.4147 42.2996 54.9C42.2996 57.3853 40.2849 59.4 37.7996 59.4ZM36.8996 54.9C36.8996 55.3971 37.3026 55.8 37.7996 55.8C38.2967 55.8 38.6996 55.3971 38.6996 54.9C38.6996 54.4029 38.2967 54 37.7996 54C37.3026 54 36.8996 54.4029 36.8996 54.9Z"
            fill="#ECF4F5"
          />
          <path
            d="M22.9688 208V195.31H24.1388L32.2748 206.11H31.8608V195.31H33.2468V208H32.0948L23.9588 197.2H24.3548V208H22.9688ZM39.962 208.162C39.098 208.162 38.342 207.976 37.694 207.604C37.058 207.22 36.566 206.68 36.218 205.984C35.87 205.276 35.696 204.442 35.696 203.482C35.696 202.51 35.87 201.676 36.218 200.98C36.566 200.284 37.058 199.75 37.694 199.378C38.342 198.994 39.098 198.802 39.962 198.802C40.838 198.802 41.594 198.994 42.23 199.378C42.878 199.75 43.376 200.284 43.724 200.98C44.084 201.676 44.264 202.51 44.264 203.482C44.264 204.442 44.084 205.276 43.724 205.984C43.376 206.68 42.878 207.22 42.23 207.604C41.594 207.976 40.838 208.162 39.962 208.162ZM39.962 206.974C40.826 206.974 41.51 206.68 42.014 206.092C42.518 205.492 42.77 204.622 42.77 203.482C42.77 202.33 42.512 201.46 41.996 200.872C41.492 200.272 40.814 199.972 39.962 199.972C39.11 199.972 38.432 200.272 37.928 200.872C37.424 201.46 37.172 202.33 37.172 203.482C37.172 204.622 37.424 205.492 37.928 206.092C38.432 206.68 39.11 206.974 39.962 206.974ZM51.2306 211.888V201.052C51.2306 200.716 51.2126 200.374 51.1766 200.026C51.1526 199.666 51.1226 199.312 51.0866 198.964H52.4906L52.6886 201.106H52.4726C52.6646 200.398 53.0546 199.84 53.6426 199.432C54.2306 199.012 54.9326 198.802 55.7486 198.802C56.5646 198.802 57.2666 198.988 57.8546 199.36C58.4546 199.732 58.9226 200.266 59.2586 200.962C59.5946 201.658 59.7626 202.498 59.7626 203.482C59.7626 204.454 59.5946 205.288 59.2586 205.984C58.9346 206.68 58.4726 207.22 57.8726 207.604C57.2726 207.976 56.5646 208.162 55.7486 208.162C54.9446 208.162 54.2486 207.958 53.6606 207.55C53.0726 207.142 52.6826 206.584 52.4906 205.876H52.6886V211.888H51.2306ZM55.4606 206.974C56.3246 206.974 57.0086 206.68 57.5126 206.092C58.0286 205.492 58.2866 204.622 58.2866 203.482C58.2866 202.33 58.0286 201.46 57.5126 200.872C57.0086 200.272 56.3246 199.972 55.4606 199.972C54.6086 199.972 53.9246 200.272 53.4086 200.872C52.9046 201.46 52.6526 202.33 52.6526 203.482C52.6526 204.622 52.9046 205.492 53.4086 206.092C53.9246 206.68 54.6086 206.974 55.4606 206.974ZM65.4616 208.162C64.6576 208.162 63.9556 207.976 63.3556 207.604C62.7556 207.22 62.2876 206.68 61.9516 205.984C61.6276 205.288 61.4656 204.454 61.4656 203.482C61.4656 202.498 61.6276 201.658 61.9516 200.962C62.2876 200.266 62.7556 199.732 63.3556 199.36C63.9556 198.988 64.6576 198.802 65.4616 198.802C66.2776 198.802 66.9796 199.012 67.5676 199.432C68.1676 199.84 68.5636 200.398 68.7556 201.106H68.5396L68.7376 198.964H70.1416C70.1056 199.312 70.0696 199.666 70.0336 200.026C70.0096 200.374 69.9976 200.716 69.9976 201.052V208H68.5396V205.876H68.7376C68.5456 206.584 68.1496 207.142 67.5496 207.55C66.9496 207.958 66.2536 208.162 65.4616 208.162ZM65.7496 206.974C66.6136 206.974 67.2976 206.68 67.8016 206.092C68.3056 205.492 68.5576 204.622 68.5576 203.482C68.5576 202.33 68.3056 201.46 67.8016 200.872C67.2976 200.272 66.6136 199.972 65.7496 199.972C64.8976 199.972 64.2136 200.272 63.6976 200.872C63.1936 201.46 62.9416 202.33 62.9416 203.482C62.9416 204.622 63.1936 205.492 63.6976 206.092C64.2136 206.68 64.8976 206.974 65.7496 206.974ZM72.3686 212.086L72.0266 210.88C72.5906 210.748 73.0586 210.592 73.4306 210.412C73.8146 210.244 74.1326 210.016 74.3846 209.728C74.6366 209.44 74.8526 209.08 75.0326 208.648L75.5006 207.586L75.4646 208.198L71.5226 198.964H73.1066L76.3646 206.902H75.8966L79.1186 198.964H80.6486L76.4726 208.756C76.2326 209.332 75.9686 209.812 75.6806 210.196C75.3926 210.592 75.0806 210.91 74.7446 211.15C74.4206 211.402 74.0606 211.6 73.6646 211.744C73.2686 211.888 72.8366 212.002 72.3686 212.086ZM82.2911 208V201.052C82.2911 200.716 82.2731 200.374 82.2371 200.026C82.2131 199.666 82.1831 199.312 82.1471 198.964H83.5511L83.7311 200.944H83.5151C83.7551 200.26 84.1331 199.732 84.6491 199.36C85.1771 198.988 85.8131 198.802 86.5571 198.802C87.3131 198.802 87.9251 198.982 88.3931 199.342C88.8731 199.702 89.1971 200.26 89.3651 201.016H89.0951C89.3231 200.332 89.7251 199.792 90.3011 199.396C90.8771 199 91.5491 198.802 92.3171 198.802C93.3131 198.802 94.0631 199.09 94.5671 199.666C95.0711 200.23 95.3231 201.124 95.3231 202.348V208H93.8651V202.438C93.8651 201.586 93.7151 200.968 93.4151 200.584C93.1151 200.188 92.6351 199.99 91.9751 199.99C91.2191 199.99 90.6191 200.254 90.1751 200.782C89.7431 201.298 89.5271 201.994 89.5271 202.87V208H88.0691V202.438C88.0691 201.586 87.9191 200.968 87.6191 200.584C87.3191 200.188 86.8391 199.99 86.1791 199.99C85.4231 199.99 84.8291 200.254 84.3971 200.782C83.9651 201.298 83.7491 201.994 83.7491 202.87V208H82.2911ZM102.108 208.162C100.692 208.162 99.5759 207.754 98.7599 206.938C97.9439 206.11 97.5359 204.964 97.5359 203.5C97.5359 202.552 97.7159 201.73 98.0759 201.034C98.4359 200.326 98.9399 199.78 99.5879 199.396C100.236 199 100.98 198.802 101.82 198.802C102.648 198.802 103.344 198.976 103.908 199.324C104.472 199.672 104.904 200.17 105.204 200.818C105.504 201.454 105.654 202.21 105.654 203.086V203.626H98.6519V202.708H104.7L104.394 202.942C104.394 201.982 104.178 201.232 103.746 200.692C103.314 200.152 102.672 199.882 101.82 199.882C100.92 199.882 100.218 200.2 99.7139 200.836C99.2099 201.46 98.9579 202.306 98.9579 203.374V203.536C98.9579 204.664 99.2339 205.522 99.7859 206.11C100.35 206.686 101.136 206.974 102.144 206.974C102.684 206.974 103.188 206.896 103.656 206.74C104.136 206.572 104.592 206.302 105.024 205.93L105.528 206.956C105.132 207.34 104.628 207.64 104.016 207.856C103.416 208.06 102.78 208.162 102.108 208.162ZM107.885 208V201.052C107.885 200.716 107.867 200.374 107.831 200.026C107.807 199.666 107.777 199.312 107.741 198.964H109.145L109.325 200.944H109.109C109.373 200.248 109.793 199.72 110.369 199.36C110.957 198.988 111.635 198.802 112.403 198.802C113.471 198.802 114.275 199.09 114.815 199.666C115.367 200.23 115.643 201.124 115.643 202.348V208H114.185V202.438C114.185 201.586 114.011 200.968 113.663 200.584C113.327 200.188 112.799 199.99 112.079 199.99C111.239 199.99 110.573 200.254 110.081 200.764C109.589 201.28 109.343 201.97 109.343 202.834V208H107.885ZM121.636 208.162C120.748 208.162 120.07 207.91 119.602 207.406C119.134 206.89 118.9 206.116 118.9 205.084V200.098H117.136V198.964H118.9V196.498L120.358 196.084V198.964H122.95V200.098H120.358V204.922C120.358 205.642 120.478 206.158 120.718 206.47C120.97 206.77 121.342 206.92 121.834 206.92C122.062 206.92 122.266 206.902 122.446 206.866C122.626 206.818 122.788 206.764 122.932 206.704V207.928C122.764 208 122.56 208.054 122.32 208.09C122.092 208.138 121.864 208.162 121.636 208.162ZM129.058 212.086L128.716 210.88C129.28 210.748 129.748 210.592 130.12 210.412C130.504 210.244 130.822 210.016 131.074 209.728C131.326 209.44 131.542 209.08 131.722 208.648L132.19 207.586L132.154 208.198L128.212 198.964H129.796L133.054 206.902H132.586L135.808 198.964H137.338L133.162 208.756C132.922 209.332 132.658 209.812 132.37 210.196C132.082 210.592 131.77 210.91 131.434 211.15C131.11 211.402 130.75 211.6 130.354 211.744C129.958 211.888 129.526 212.002 129.058 212.086ZM142.872 208.162C141.456 208.162 140.34 207.754 139.524 206.938C138.708 206.11 138.3 204.964 138.3 203.5C138.3 202.552 138.48 201.73 138.84 201.034C139.2 200.326 139.704 199.78 140.352 199.396C141 199 141.744 198.802 142.584 198.802C143.412 198.802 144.108 198.976 144.672 199.324C145.236 199.672 145.668 200.17 145.968 200.818C146.268 201.454 146.418 202.21 146.418 203.086V203.626H139.416V202.708H145.464L145.158 202.942C145.158 201.982 144.942 201.232 144.51 200.692C144.078 200.152 143.436 199.882 142.584 199.882C141.684 199.882 140.982 200.2 140.478 200.836C139.974 201.46 139.722 202.306 139.722 203.374V203.536C139.722 204.664 139.998 205.522 140.55 206.11C141.114 206.686 141.9 206.974 142.908 206.974C143.448 206.974 143.952 206.896 144.42 206.74C144.9 206.572 145.356 206.302 145.788 205.93L146.292 206.956C145.896 207.34 145.392 207.64 144.78 207.856C144.18 208.06 143.544 208.162 142.872 208.162ZM151.853 208.162C150.965 208.162 150.287 207.91 149.819 207.406C149.351 206.89 149.117 206.116 149.117 205.084V200.098H147.353V198.964H149.117V196.498L150.575 196.084V198.964H153.167V200.098H150.575V204.922C150.575 205.642 150.695 206.158 150.935 206.47C151.187 206.77 151.559 206.92 152.051 206.92C152.279 206.92 152.483 206.902 152.663 206.866C152.843 206.818 153.005 206.764 153.149 206.704V207.928C152.981 208 152.777 208.054 152.537 208.09C152.309 208.138 152.081 208.162 151.853 208.162ZM155.122 204.688L154.672 195.31H156.472L156.022 204.688H155.122ZM154.654 208V206.164H156.49V208H154.654Z"
            fill="#D2E1E2"
          />
        </svg>
      </div>
    </div>
  )

  const renderSkeletonCard = () => (
    <div className="flex flex-col space-y-4 p-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton shape="circle" size="2rem" />
              <div className="flex flex-col gap-2">
                <Skeleton width="200px" height="20px" />
                <Skeleton width="100px" height="12px" />
              </div>
            </div>
            <Skeleton width="100px" height="24px" />
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <Skeleton width="150px" height="20px" />
              <Skeleton width="120px" height="16px" />
            </div>
            <Skeleton width="80px" height="24px" />
          </div>
        </div>
      ))}
    </div>
  )

  const renderSkeletonTable = () => (
    <div className="card">
      <DataTable
        value={Array(5).fill({})}
        className="p-datatable-striped"
        responsiveLayout="scroll"
      >
        <Column
          header="Entries"
          body={() => (
            <div className="flex items-center gap-2">
              <div className="flex flex-col gap-2">
                <Skeleton width="200px" height="20px" />
              </div>
            </div>
          )}
        />
        <Column
          header="Paid"
          body={() => <Skeleton width="100px" height="24px" />}
        />
        <Column
          header="Due"
          body={() => <Skeleton width="100px" height="24px" />}
        />
        <Column
          header="Due Date"
          body={() => <Skeleton width="120px" height="24px" />}
        />
        <Column
          header="Payment To"
          body={() => (
            <div className="flex flex-col gap-2">
              <Skeleton width="150px" height="20px" />
            </div>
          )}
        />
      </DataTable>
      <div className="mt-4 flex justify-end">
        <Skeleton width="400px" height="2rem" />
      </div>
    </div>
  )

  return (
    <div className="flex flex-col">
      <Dialog
        draggable={false}
        visible={deleteConfirmationVisible}
        onHide={() => {
          if (!deleteConfirmationVisible) return
          setDeleteConfirmationVisible(false)
        }}
        className="w-full max-w-md"
        header="Delete Confirmation"
      >
        <p className="mb-6 border-t px-2 pt-4">
          Are you sure you want to remove them?
        </p>
        <div className="flex justify-end space-x-4 border-t pt-4">
          <CustomButton
            variant={"outline"}
            size="sm"
            className="rounded-md border border-primary px-6 py-2 !font-medium text-primary"
            onClick={() => {
              setDeleteConfirmationVisible(false)
            }}
          >
            No
          </CustomButton>
          <CustomButton
            loading={useDeleteExpenseMutation_isLoading}
            size="sm"
            className="!hover:bg-red-700 rounded-[8px] !border-red-600 !bg-red-600 px-6 py-2 !font-medium"
            onClick={async () => {
              await onBulkDelete(selectedExpenses.map((_) => _.id))
              setDeleteConfirmationVisible(false)
            }}
          >
            Yes, Delete
          </CustomButton>
        </div>
      </Dialog>
      <div className="flex items-center justify-between border-b px-2 py-3">
        <span>
          Result: {expenseData?.pagination?.current_page * rows - rows + 1}-
          {Math.min(
            expenseData?.pagination?.current_page * rows,
            expenseData?.pagination?.total_items || 0
          )}{" "}
          out of {expenseData?.pagination?.total_items || 0}
        </span>
        <div className="flex gap-2">
          <CustomButton
            size="icon"
            className={cn(
              category !== null && "bg-primary-50 text-primary-600"
            )}
            variant="ghost"
            onClick={(e) => filterTieredMenu.current?.toggle(e)}
          >
            <FilterIcon />
          </CustomButton>
          {selectedExpenses.length > 0 && (
            <CustomButton
              className="flex w-fit px-4 text-red-500 hover:bg-red-700 hover:text-red-50"
              size="icon"
              variant="ghost"
              onClick={() => {
                setDeleteConfirmationVisible(true)
              }}
            >
              <Trash />
              Delete
            </CustomButton>
          )}
          <SearchButton
            placeholder="Search by Receiver Name"
            value={searchTerm}
            setValue={(value: string) => {
              setSearchTerm(value)
              setFirst(0)
            }}
          />
          <Button
            size="small"
            onClick={() => {
              setFocussedExpense(null)
              setExpenseFormVisible(true)
            }}
            className="px-4 py-2 !font-semibold"
          >
            Add Expense
          </Button>
        </div>
      </div>

      <TieredMenu
        model={
          ExpenseFilterAndSortOptions({
            setCategory,
            category,
            categories: ExpenseCategory,
          }).filterItems
        }
        popup
        ref={filterTieredMenu}
        className="expense-filter-menu"
      />
      <ExpenseFilter category={category} setCategory={setCategory} />
      <ul className="space-y-2 p-2 lg:hidden">
        {useGetExpensesQuery_isLoading || useGetExpensesQuery_isFetching
          ? renderSkeletonCard()
          : expenseData?.items?.map((expense) => (
              <ExpenseCard
                key={expense.id}
                expense={{
                  id: expense.id,
                  title: expense.title,
                  paidAmount: expense.amount,
                  dueAmount: expense.due_amount,
                  date: expense.due_date,
                  paymentTo: expense.payment_to,
                  checked: selectedExpenses.some(
                    (selected) => selected.id === expense.id
                  ),
                  onChange: (event) => {
                    const isChecked = event.checked
                    setSelectedExpenses((prevState) => {
                      const updatedState = isChecked
                        ? [
                            ...prevState,
                            {
                              id: expense.id,
                              description: expense.title,
                              paid: expense.amount,
                              due: expense.due_amount,
                              dueDate: expense.due_date,
                              paymentTo: expense.payment_to,
                              category: expense.category,
                            },
                          ]
                        : prevState.filter(
                            (selected) => selected.id !== expense.id
                          )
                      return [...updatedState]
                    })
                  },
                  forceShow: selectedExpenses.length > 0,
                }}
              />
            ))}
      </ul>
      <div className="hidden whitespace-nowrap p-2 lg:block">
        {useGetExpensesQuery_isLoading || useGetExpensesQuery_isFetching ? (
          renderSkeletonTable()
        ) : (
          <DataTable
            responsiveLayout="scroll"
            emptyMessage="NI"
            onRowClick={(e) => {
              setFocussedExpense(e.data)
              setExpenseDetailsVisible(true)
            }}
            selectionMode="checkbox"
            selection={selectedExpenses}
            onSelectionChange={(e) => setSelectedExpenses(e.value)}
            className={cn(
              "custom-datatable",
              noExpensesAvailable ? "hidden-rows" : ""
            )}
            rowHover
            footer={noExpensesAvailable && <EmptyStateTemplate />}
            value={
              expenseData?.items?.map((data) => ({
                id: data.id,
                description: data.title,
                paid: data.amount,
                due: data.due_amount,
                dueDate: data.due_date || "null",
                paymentTo: data.payment_to,
                category: data.category,
                raw: data,
              })) || []
            }
            dataKey="id"
            tableStyle={{ minWidth: "50rem" }}
          >
            <Column selectionMode="multiple"></Column>
            <Column
              field="description"
              header="Entries"
              body={descriptionTemplate}
            ></Column>
            <Column
              field="paid"
              header="Paid"
              body={(rowData) => amountTemplate(rowData, "paid")}
            ></Column>
            <Column
              field="due"
              header="Due"
              body={(rowData) => amountTemplate(rowData, "due")}
            ></Column>
            <Column field="dueDate" header="Due date"></Column>
            <Column
              field="paymentTo"
              header="Payment to"
              body={paymentToTemplate}
            ></Column>
          </DataTable>
        )}
      </div>
      <Paginator
        first={first}
        rows={rows}
        totalRecords={expenseData?.pagination?.total_items || 0}
        onPageChange={onPageChange}
        className="mb-4 justify-end border-none"
      />
      <Sidebar
        position="right"
        visible={expenseFormVisible || expenseDetailsVisible}
        onHide={() => {
          setExpenseFormVisible(false)
          setExpenseDetailsVisible(false)
        }}
        className="max-width-screen w-[450px]"
        content={
          <ExpenseSidesheetContent
            handleDelete={() => {
              onBulkDelete([focussedExpense.id])
              setExpenseFormVisible(false)
              setExpenseDetailsVisible(false)
            }}
            expenseInfo={focussedExpense}
            onClose={() => {
              setExpenseFormVisible(false)
              setExpenseDetailsVisible(false)
            }}
          />
        }
      />
    </div>
  )
}

export default ExpenseTable
