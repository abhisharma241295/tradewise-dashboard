import React from "react"
import type { NextPage } from "next"

interface NotificationSettingsProps {
  error?: string
}

const NotificationSettings: NextPage<NotificationSettingsProps> = ({
  error,
}) => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-2xl font-bold">Notification Settings</h1>
      {error && <div className="text-red-500">{error}</div>}
      {/* Add your notification settings content here */}
    </div>
  )
}

export default NotificationSettings

// export const getServerSideProps = async (context) => {
//   try {
//     return {
//       props: {
//         // Add your props here
//       },
//     }
//   } catch (error) {
//     return {
//       props: {
//         error: 'Failed to fetch data',
//       },
//     }
//   }
// }
