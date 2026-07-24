export const mockMeetingReadiness = {

    summary: {
        ready: 8,
        waitingEmployee: 5,
        waitingSupervisor: 3,
        scheduled: 12
    },

    evaluations: [

        {
            id: 1,
            employee: "John Doe",
            supervisor: "Sarah Lee",
            employeeComplete: true,
            supervisorComplete: true
        },

        {
            id: 2,
            employee: "Emma Brown",
            supervisor: "Michael Lee",
            employeeComplete: true,
            supervisorComplete: false
        },

        {
            id: 3,
            employee: "David Chen",
            supervisor: "Lisa White",
            employeeComplete: false,
            supervisorComplete: false
        }

    ]

};