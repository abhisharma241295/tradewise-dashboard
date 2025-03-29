import WeddingOverview from "@/types/WeddingOverview"
import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { InputText } from "primereact/inputtext"
import { useEffect, useState } from "react"
import { X, Loader, Plus } from "lucide-react"
import { useCreateContactMutation } from "@/lib/redux/features/apis/contactsApi"
import { toast } from "sonner"
import { getCurrentWedding } from "@/lib/cookies/currentWeddingCookie"
import { useAppSelector } from "@/lib/redux/hooks"

interface Props {
  data: WeddingOverview | undefined
}

export default function HomeContacts({ data }: Props) {
  const [showCollabPopup, setShowCollabPopup] = useState(false)
  const [name, setName] = useState("")
  const [contactNumber, setContactNumber] = useState("")
  const [createContact, { isLoading, error }] = useCreateContactMutation()
  useEffect(() => {
    if (error) {
      toast.error("Failed to create contact: " + (error as any).message)
    }
  }, [error])
  const currentWeddingId =
    useAppSelector((state) => state.currentWedding.currentWeddingId) ||
    getCurrentWedding()
  const handleAddContact = async () => {
    if (!name || !contactNumber) {
      toast.error("Please fill in all fields")
      return
    }

    try {
      await createContact({
        weddingId: currentWeddingId as string,
        contactData: {
          contact_name: name,
          contact_number: contactNumber,
        },
      }).unwrap()
      toast.success("Contact added successfully")
      setShowCollabPopup(false)
      setName("")
      setContactNumber("")
    } catch (error) {
      console.log(error)
      toast.error("Failed to add contact")
    }
  }

  if (!data?.contacts || Object.keys(data.contacts).length === 0) {
    return (
      <div>
        <div className="mt-4 overflow-hidden rounded-xl border">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <p className="text-lg font-bold">Contacts</p>
            <Button
              label="Add Contact"
              className="rounded-lg px-2 py-2 font-bold lg:px-8"
              onClick={() => setShowCollabPopup(true)}
            />
          </div>
          <div className="flex min-h-48 flex-col items-center justify-center text-[#E4EFF0]">
            <svg
              width="94"
              height="94"
              viewBox="0 0 94 94"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M65.2009 53.9464C65.0268 53.88 64.8376 53.8636 64.6546 53.8991L52.979 56.1615C45.2973 52.2532 40.6078 47.8247 37.8284 41.0622L40.0204 29.3038C40.0539 29.1244 40.0376 28.9393 39.9734 28.7685L35.7283 17.4813C35.5817 17.0915 35.2088 16.8333 34.7923 16.8333L23.8521 16.8333C20.0188 16.8333 16.8838 20.0309 17.4761 23.9521C18.7125 32.1375 22.3705 47.1181 33.1679 57.9154C44.4755 69.223 60.696 74.0892 69.5432 76.0142C73.6211 76.9016 77.1667 73.704 77.1667 69.6492L77.1666 59.1952C77.1666 58.7803 76.9104 58.4085 76.5227 58.2608L65.2009 53.9464Z"
                stroke="#E4EFF0"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M30 75C35.5228 75 40 70.5228 40 65C40 59.4772 35.5228 55 30 55C24.4772 55 20 59.4772 20 65C20 70.5228 24.4772 75 30 75Z"
                fill="white"
              />
              <path
                d="M30 60V66M30 70.01L30.01 69.9989M40 65C40 70.5228 35.5228 75 30 75C24.4772 75 20 70.5228 20 65C20 59.4772 24.4772 55 30 55C35.5228 55 40 59.4772 40 65Z"
                stroke="#E4EFF0"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M42.8363 9.22854C43.2363 7.71507 44.7509 6.80278 46.2193 7.19088C47.6877 7.57898 48.5537 9.1205 48.1537 10.634L46.6637 16.2714C46.2637 17.7849 44.749 18.6972 43.2807 18.3091C41.8123 17.921 40.9463 16.3795 41.3463 14.866L42.8363 9.22854Z"
                fill="#E4EFF0"
              />
              <rect
                x="44.9831"
                y="8.9328"
                width="1.4"
                height="7.6"
                rx="0.7"
                transform="rotate(14.8052 44.9831 8.9328)"
                fill="white"
              />
              <path
                d="M53.2023 21.9234C54.7588 22.0902 55.8894 23.4496 55.7276 24.9597C55.5657 26.4699 54.1727 27.5589 52.6162 27.3921L46.8184 26.7707C45.2618 26.6039 44.1312 25.2445 44.293 23.7343C44.4549 22.2242 45.8479 21.1352 47.4044 21.302L53.2023 21.9234Z"
                fill="#E4EFF0"
              />
              <rect
                x="53.8189"
                y="24.0009"
                width="1.4"
                height="7.6"
                rx="0.7"
                transform="rotate(96.1169 53.8189 24.0009)"
                fill="white"
              />
            </svg>
            <p className="mt-4 text-lg font-semibold">No contacts</p>
          </div>
        </div>

        <Dialog
          draggable={false}
          visible={showCollabPopup}
          onHide={() => setShowCollabPopup(false)}
          className="relative w-full max-w-md"
          header="Add Contact"
        >
          <X
            className="absolute right-4 top-4 cursor-pointer"
            onClick={() => setShowCollabPopup(false)}
          />
          <div className="!space-y-4">
            <InputText
              id="contactName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full ${!name ? "p-invalid" : ""}`}
              placeholder="Enter Name"
            />
            <InputText
              type="number"
              id="contactNumber"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className={`w-full ${!contactNumber ? "p-invalid" : ""}`}
              placeholder="Enter Contact Number"
            />
          </div>
          <Button
            className="item-center mt-10 flex w-full flex-row justify-center gap-2"
            size="small"
            onClick={handleAddContact}
            disabled={isLoading}
          >
            {isLoading && <Loader className="animate-spin" />}
            Add Contact
          </Button>
        </Dialog>
      </div>
    )
  }

  return (
    <div>
      <div className="mt-4 overflow-hidden rounded-xl border">
        <div className="flex items-center justify-between px-4 py-3">
          <p className="text-lg font-bold">Contacts</p>
          <Button
            icon={<Plus className="mr-2.5 h-4 w-4" />}
            label="Add"
            className="rounded-lg !px-2.5 py-2 lg:px-8"
            onClick={() => setShowCollabPopup(true)}
          />
        </div>
        <ul className="!max-h-[200px] overflow-y-auto border-t">
          {Object.values(data.contacts).map((contact: any) => (
            <li
              key={contact.contact_id}
              className="flex items-center px-4 py-1 hover:bg-hover"
            >
              <div className="mr-2.5 h-10 w-10 rounded-lg bg-orange-500"></div>
              <div className="flex flex-col">
                <p className="font-semibold">{contact.contact_name}</p>
                <p className="text-sm text-muted-foreground">
                  {contact.contact_number}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Dialog
        draggable={false}
        visible={showCollabPopup}
        onHide={() => setShowCollabPopup(false)}
        className="relative w-full max-w-md"
        header="Add Contact"
      >
        <X
          className="absolute right-4 top-4 cursor-pointer"
          onClick={() => setShowCollabPopup(false)}
        />
        <div className="!space-y-4">
          <InputText
            id="contactName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full ${!name ? "p-invalid" : ""}`}
            placeholder="Enter Name"
          />
          <InputText
            id="contactNumber"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            className={`w-full ${!contactNumber ? "p-invalid" : ""}`}
            placeholder="Enter Contact Number"
          />
        </div>

        <Button
          className="item-center mt-10 flex w-full flex-row justify-center gap-2"
          size="small"
          onClick={handleAddContact}
          disabled={isLoading}
        >
          {isLoading && <Loader className="animate-spin" />}
          Add Contact
        </Button>
      </Dialog>
    </div>
  )
}
