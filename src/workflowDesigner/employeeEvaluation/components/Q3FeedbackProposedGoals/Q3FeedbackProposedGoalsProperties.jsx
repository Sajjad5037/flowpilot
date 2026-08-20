import {
    Stack,
    TextField,
    Typography,
} from "@mui/material";


export default function Q3FeedbackProposedGoalsProperties({
    component,
    onChange,
}) {

    const settings = component?.settings || {};

    function updateSetting(field, value) {

        onChange({
            ...component,
            settings: {
                ...settings,
                [field]: value,
            },
        });

    }

    return (

        <Stack spacing={2}>

            <Typography
                variant="body2"
                color="text.secondary"
            >
                Configure the Q3 feedback section and guidance text shown to the employee.
            </Typography>

            <TextField
                fullWidth
                size="small"
                label="Section Title"
                value={settings.sectionTitle || "Q3 Feedback & Proposed Goals"}
                onChange={(event) =>
                    updateSetting(
                        "sectionTitle",
                        event.target.value
                    )
                }
            />

            <TextField
                fullWidth
                size="small"
                label="Question 1"
                value={settings.question1 || "What can you improve on moving forward in Q3?"}
                onChange={(event) =>
                    updateSetting(
                        "question1",
                        event.target.value
                    )
                }
            />

            <TextField
                fullWidth
                multiline
                minRows={2}
                size="small"
                label="Placeholder / Guidance for Question 1"
                value={settings.question1Guidance || "Open to suggestions and feedback during evaluation meeting."}
                onChange={(event) =>
                    updateSetting(
                        "question1Guidance",
                        event.target.value
                    )
                }
            />

            <TextField
                fullWidth
                size="small"
                label="Question 2"
                value={settings.question2 || "What support or assistance do you need from your supervisor?"}
                onChange={(event) =>
                    updateSetting(
                        "question2",
                        event.target.value
                    )
                }
            />

            <TextField
                fullWidth
                multiline
                minRows={2}
                size="small"
                label="Placeholder / Guidance for Question 2"
                value={settings.question2Guidance || "The support has been there. The main focus now is ensuring the hiring process is consistently followed across all departments."}
                onChange={(event) =>
                    updateSetting(
                        "question2Guidance",
                        event.target.value
                    )
                }
            />

        </Stack>

    );

}
