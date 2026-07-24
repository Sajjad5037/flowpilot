export const mockNotifications = {
  summary: {
    pending: 8,
    sentToday: 24,
    completed: 31,
    failed: 2,
  },

  notifications: [
  {
    id: 1,
    recipient: "John Doe",
    role: "Employee",
    evaluation: "Q3 Review",
    linkSent: "Jul 24, 9:00 AM",
    status: "Completed",
  },
  {
    id: 2,
    recipient: "Sarah Lee",
    role: "Supervisor",
    evaluation: "Q3 Review",
    linkSent: "Jul 24, 9:30 AM",
    status: "Awaiting Response",
  },
  {
    id: 3,
    recipient: "Emma Brown",
    role: "Employee",
    evaluation: "Annual Review",
    linkSent: "Jul 23, 10:00 AM",
    status: "Completed",
  },
  {
    id: 4,
    recipient: "Michael Lee",
    role: "Supervisor",
    evaluation: "Annual Review",
    linkSent: "Jul 20, 10:15 AM",
    status: "Overdue",
  },
],
};