export const mockMeetingQueue = {
  summary: {
    today: 3,
    upcoming: 12,
    completed: 48,
    rescheduled: 2,
  },

  meetings: [
    {
      id: 1,
      employee: "John Doe",
      supervisor: "Sarah Lee",
      date: "2026-07-28",
      time: "10:00 AM",
      meetingType: "Microsoft Teams",
      status: "Scheduled",
    },
    {
      id: 2,
      employee: "Emma Brown",
      supervisor: "Michael Lee",
      date: "2026-07-29",
      time: "2:00 PM",
      meetingType: "Zoom",
      status: "Scheduled",
    },
    {
      id: 3,
      employee: "David Chen",
      supervisor: "Lisa White",
      date: "2026-07-24",
      time: "11:00 AM",
      meetingType: "In Person",
      status: "Completed",
    },
    {
      id: 4,
      employee: "Sophia Taylor",
      supervisor: "Robert Green",
      date: "2026-07-31",
      time: "9:30 AM",
      meetingType: "Google Meet",
      status: "Rescheduled",
    },
  ],
};