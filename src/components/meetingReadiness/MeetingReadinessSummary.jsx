import {
    Grid,
    Paper,
    Typography
} from "@mui/material";

export default function MeetingReadinessSummary({

    evaluations

}) {

    const ready = evaluations.filter(

        evaluation =>
            evaluation.meeting_status === "Ready to Schedule"

    ).length;

    const waitingEmployee = evaluations.filter(

        evaluation =>
            evaluation.meeting_status === "Waiting on Employee"

    ).length;

    const waitingSupervisor = evaluations.filter(

        evaluation =>
            evaluation.meeting_status === "Waiting on Supervisor"

    ).length;

    const scheduled = 0;

    const cards = [

        {
            title: "Ready for Meeting",
            value: ready,
        },

        {
            title: "Waiting on Employee",
            value: waitingEmployee,
        },

        {
            title: "Waiting on Supervisor",
            value: waitingSupervisor,
        },

        {
            title: "Meetings Scheduled",
            value: scheduled,
        },

    ];

    return (

        <Grid
            container
            spacing={3}
            mb={4}
        >

            {cards.map((card) => (

                <Grid
                    key={card.title}
                    size={{ xs: 12, md: 3 }}
                >

                    <Paper sx={{ p: 3 }}>

                        <Typography variant="h4">

                            {card.value}

                        </Typography>

                        <Typography color="text.secondary">

                            {card.title}

                        </Typography>

                    </Paper>

                </Grid>

            ))}

        </Grid>

    );

}