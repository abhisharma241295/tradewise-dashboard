
import { useState } from "react"

export default function RsvpFormUI() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attending: "yes",
    guests: "",
    event: "",
    meal: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8 md:py-12">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-2xl font-monallesia-script text-gray-700">Are You Attending?</h1>
        </div>

        <div className="space-y-2">
          <div className="space-y-1.5">
            <label htmlFor="name" className="block text-base font-normal text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full bg-transparent border-b border-gray-300 focus:border-gray-500 focus:outline-none py-2 transition-colors"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-base font-normal text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full bg-transparent border-b border-gray-300 focus:border-gray-500 focus:outline-none py-2 transition-colors"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="space-y-3 py-4">
            <div className="flex gap-8">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="yes"
                  name="attending"
                  value="yes"
                  checked={formData.attending === "yes"}
                  onChange={(e) => setFormData({ ...formData, attending: e.target.value })}
                  className="w-4 h-4 border-2 border-gray-300 text-[#D4B5A7] focus:ring-[#D4B5A7] focus:ring-2 focus:ring-offset-2 cursor-pointer"
                />
                <label htmlFor="yes" className="text-base font-normal text-gray-700 cursor-pointer">
                  Yes, I will be there
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="no"
                  name="attending"
                  value="no"
                  checked={formData.attending === "no"}
                  onChange={(e) => setFormData({ ...formData, attending: e.target.value })}
                  className="w-4 h-4 border-2 border-gray-300 text-[#D4B5A7] focus:ring-[#D4B5A7] focus:ring-2 focus:ring-offset-2 cursor-pointer"
                />
                <label htmlFor="no" className="text-base font-normal text-gray-700 cursor-pointer">
                  Sorry, I can&apos;t come
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="guests" className="block text-base font-normal text-gray-700">
              Number Of Guests
            </label>
            <div className="relative">
              <select
                id="guests"
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                className="w-full bg-transparent border-b border-gray-300 focus:border-gray-500 focus:outline-none py-2 appearance-none cursor-pointer"
              >
                <option value=""></option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="event" className="block text-base font-normal text-gray-700">
              What Will You Be Attending
            </label>
            <input
              id="event"
              type="text"
              className="w-full bg-transparent border-b border-gray-300 focus:border-gray-500 focus:outline-none py-2 transition-colors"
              value={formData.event}
              onChange={(e) => setFormData({ ...formData, event: e.target.value })}
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="meal" className="block text-base font-normal text-gray-700">
              Meal Preferences
            </label>
            <div className="relative">
              <select
                id="meal"
                value={formData.meal}
                onChange={(e) => setFormData({ ...formData, meal: e.target.value })}
                className="w-full bg-transparent border-b border-gray-300 focus:border-gray-500 focus:outline-none py-2 appearance-none cursor-pointer"
              >
                <option value=""></option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="meat">Meat</option>
                <option value="fish">Fish</option>
              </select>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-40 mx-auto block bg-[#D4B5A7] hover:bg-[#C5A696] text-white font-medium text-lg py-3 transition-colors duration-200"
          >
            RSVP
          </button>
        </div>
      </form>
    </div>
  )
}

