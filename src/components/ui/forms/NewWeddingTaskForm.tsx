import React from "react"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { InputText } from "primereact/inputtext"
import { Calendar } from "primereact/calendar"
import { Checkbox } from "primereact/checkbox"

import { Button } from "primereact/button"
import {
  NewTaskFormSchema,
  NewTaskFormType,
  StatusEnum,
} from "@/lib/form-schema/newWeddingTaskForm"
import { ArrowLeft, Loader } from "lucide-react"
import { TodosCategory } from "@/lib/raw-data/todoCategories"
import { plannerApi } from "@/lib/redux/features/apis/plannerApi"
import { useAppSelector } from "@/lib/redux/hooks"
import { toast } from "sonner"
import { SingleSelect } from "../commons/SingleSelect"

interface NewTaskFormProps {
  onClose: () => void
}
const NewTaskForm = ({ onClose }: NewTaskFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewTaskFormType>({
    resolver: yupResolver(NewTaskFormSchema),
    defaultValues: {
      checklist: [{ text: "", completed: false }],
    },
  })
  const [addWeddingPlannerEvent, { isLoading, error }] =
    plannerApi.useAddWeddingPlannerEventMutation()
  const currentWeddingId = useAppSelector(
    (state) => state.currentWedding.currentWeddingId
  )
  const onSubmit = async (data: NewTaskFormType) => {
    console.log(data)
    // Handle form submission
    try {
      await addWeddingPlannerEvent({
        weddingId: currentWeddingId,
        body: {
          checklists: data.checklist.map((value) => {
            return {
              checklist_icon_id: 0,
              checklist_name: value.text,
              checklist_status: value.completed ? "completed" : "pending",
            }
          }),
          todo_category: data.category,
          todo_due_date: `${data.dateCreated.toISOString().split("T")[0]}`,
          todo_icon_id: 0,
          todo_name: data.task,
          todo_status:
            data.status == "Todo"
              ? "todo"
              : data.status == "Inprogress"
                ? "in_progress"
                : "completed",
        },
      }).unwrap()
      onClose()
    } catch (error) {
      toast(`Error:${error}`)
      console.error("Failed to add wedding:", error)
      // Handle the error, e.g., show an error message to the user
    }
  }

  return (
    <div className="mx-auto w-full max-w-2xl overflow-auto p-4">
      <div className="mb-6 flex items-center">
        <h1 className="flex items-center gap-2 text-2xl font-bold">
          <ArrowLeft className="cursor-pointer" onClick={onClose} />
          New Task
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="task" className="mb-1 block">
            Task
          </label>
          <Controller
            name="task"
            control={control}
            render={({ field }) => (
              <InputText
                id="task"
                {...field}
                className={`w-full ${errors.task ? "p-invalid" : ""}`}
                placeholder="Lorem ipsum dolor sit amet"
              />
            )}
          />
          {errors.task && (
            <small className="p-error">{errors.task.message}</small>
          )}
        </div>

        <div>
          <label htmlFor="category" className="mb-1 block">
            Category
          </label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <SingleSelect
                value={{
                  label: field.value,
                  value: field.value,
                  raw: null,
                }}
                setValue={(e) => {
                  field.onChange(e?.label)
                }}
                options={TodosCategory.map((category) => ({
                  value: category.value,
                  label: category.value,
                  raw: null,
                }))}
                placeholder="Select an event"
              />
            )}
          />
          {errors.category && (
            <small className="p-error">{errors.category.message}</small>
          )}
        </div>

        <div>
          <label htmlFor="dateCreated" className="mb-1 block">
            Date Created
          </label>
          <Controller
            name="dateCreated"
            control={control}
            render={({ field }) => (
              <Calendar
                id="dateCreated"
                {...field}
                dateFormat="mm/dd/yy"
                placeholder="MM/DD/YYYY"
                className={`w-full ${errors.dateCreated ? "p-invalid" : ""}`}
              />
            )}
          />
          {errors.dateCreated && (
            <small className="p-error">{errors.dateCreated.message}</small>
          )}
        </div>

        <div>
          <label htmlFor="status" className="mb-1 block">
            Status
          </label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <SingleSelect
                options={Object.values(StatusEnum).map((value) => ({
                  label: value,
                  value: value,
                  raw: value,
                }))}
                placeholder="Select"
                setValue={(option) => field.onChange(option?.value)}
                value={{
                  label: field.value,
                  value: field.value,
                  raw: field.value,
                }}
                itemTemplate={(option) => {
                  return (
                    <div className="flex items-center gap-2">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="7.5"
                          cy="7.5"
                          r="7.5"
                          fill={
                            option.label == "Todo"
                              ? "#FFC312"
                              : option.label == "Done"
                                ? "#28A745"
                                : "#3264CA"
                          }
                        />
                      </svg>
                      <span>{option.label}</span>
                    </div>
                  )
                }}
              />
            )}
          />
          {errors.status && (
            <small className="p-error">{errors.status.message}</small>
          )}
        </div>

        <div>
          <label className="mb-1 block">Checklist</label>
          <Controller
            name="checklist"
            control={control}
            render={({ field }) => (
              <div>
                {field.value.map((item, index) => (
                  <div key={index} className="mb-2 flex items-center gap-2">
                    <Checkbox
                      checked={item.completed}
                      onChange={() => {
                        const newChecklist = [...field.value]
                        newChecklist[index].completed = !item.completed
                        field.onChange(newChecklist)
                      }}
                      className="mr-2"
                    />
                    <InputText
                      value={item.text}
                      onChange={(e) => {
                        const newChecklist = [...field.value]
                        newChecklist[index].text = e.target.value
                        field.onChange(newChecklist)
                      }}
                      placeholder="Enter checklist item"
                      className="flex-grow"
                    />
                  </div>
                ))}
                <Button
                  link
                  unstyled
                  type="button"
                  icon="pi pi-plus"
                  onClick={() =>
                    field.onChange([
                      ...field.value,
                      { text: "", completed: false },
                    ])
                  }
                  className="text-grey-500 hover:text-gray-700 hover:underline"
                  label="Add Step"
                />
              </div>
            )}
          />
          {errors.checklist && (
            <small className="p-error">{errors.checklist.message}</small>
          )}
        </div>

        {JSON.stringify(error)}
        <Button
          type="submit"
          disabled={isLoading}
          className="item-center flex w-full flex-row justify-center gap-2"
        >
          {isLoading && <Loader className="animate-spin" />}
          {!isLoading ? <p>Add new task</p> : <p>Adding new task...</p>}
        </Button>
      </form>
    </div>
  )
}

export default NewTaskForm
