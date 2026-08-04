import {
    Paper,
    Tabs,
    Tab
} from "@mui/material";

export default function StageSelector({
    currentStage,
    onStageChange
}) {

    return (

        <Paper
            elevation={0}
            sx={{
                border: "1px solid #E5E7EB",
                borderRadius: 3,
                mb: 3
            }}
        >

            <Tabs
                value={currentStage}
                onChange={(event, value) => onStageChange(value)}
                variant="fullWidth"
            >

                <Tab
                    label="Employee"
                    value="employee"
                />

                <Tab
                    label="Supervisor"
                    value="supervisor"
                />

                <Tab
                    label="HR"
                    value="hr"
                />

            </Tabs>

        </Paper>

    );

}