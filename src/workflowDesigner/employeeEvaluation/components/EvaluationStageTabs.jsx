import {
    Box,
    Button,
    Stack
} from "@mui/material";

export default function EvaluationStageTabs({
    currentStage,
    onStageChange
}) {

    const stages = [
        {
            id: "employee",
            label: "Employee"
        },
        {
            id: "supervisor",
            label: "Supervisor"
        },
        {
            id: "hr",
            label: "HR"
        }
    ];

    return (

        <Stack
            direction="row"
            sx={{
                width: "100%"
            }}
        >

            {stages.map(stage => (

                <Button
                    key={stage.id}
                    onClick={() =>
                        onStageChange(stage.id)
                    }
                    sx={{
                        flex: 1,
                        py: 1.5,
                        borderRadius: 0,
                        borderBottom:
                            currentStage === stage.id
                                ? "2px solid #2563EB"
                                : "2px solid transparent",
                        color:
                            currentStage === stage.id
                                ? "#2563EB"
                                : "#64748B",
                        fontWeight: 600
                    }}
                >
                    {stage.label}
                </Button>

            ))}

        </Stack>

    );
}