import { SectionHeader } from "./SectionHeader"
import { StoryCard } from "./StoryCard"

export function LoveStory() {
  const events = [
    {
      title: "First Time We Meet",
      date: "June 2019",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.",
    },
    {
      title: "First Date Night",
      date: "August 2019",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.",
    },
    {
      title: "She Said Yes",
      date: "December 2022",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.",
    },
  ]

  return (
    <section className="max-w-4xl mx-auto">
      <SectionHeader title="Our Sweet Love Story" pretext="Our Story" />
      <div className="space-y-16">
        {events.map((event, i) => (
          <StoryCard key={i} {...event} direction={i % 2 === 0 ? "left" : "right"} />
        ))}
      </div>
    </section>
  )
}
