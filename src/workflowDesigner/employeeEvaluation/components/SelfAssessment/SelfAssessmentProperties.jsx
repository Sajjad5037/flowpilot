import {
    Box,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

export default function SelfAssessmentProperties({
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

        <Stack spacing={3}>

            <Box>

                <Typography
                    fontWeight={700}
                >
                    Self Assessment
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    mt={0.5}
                >
                    Configure the instructions and guidance
                    employees will see before completing
                    their self-assessment.
                </Typography>

            </Box>


            <TextField
                fullWidth
                label="Title"
                value={
                    settings.title ||
                    "Instructions for Employee Self-Assessment"
                }
                onChange={(event) =>
                    updateSetting(
                        "title",
                        event.target.value
                    )
                }
            />


            <TextField
                fullWidth
                multiline
                minRows={5}
                label="Instructions"
                value={
                    settings.instructions ||
                    "Please complete all highlighted fields below. Evaluate your quarterly goals, outline any extra projects completed, provide feedback for moving forward, and propose your initial Q3 goal ideas."
                }
                onChange={(event) =>
                    updateSetting(
                        "instructions",
                        event.target.value
                    )
                }
            />


            <TextField
                fullWidth
                label="Tutorial Link Text"
                value={
                    settings.tutorialText ||
                    "Employee Eval Prep Tutorial"
                }
                onChange={(event) =>
                    updateSetting(
                        "tutorialText",
                        event.target.value
                    )
                }
            />


            <TextField
                fullWidth
                label="Tutorial URL"
                placeholder="https://..."
                value={
                    settings.tutorialUrl || ""
                }
                onChange={(event) =>
                    updateSetting(
                        "tutorialUrl",
                        event.target.value
                    )
                }
            />


            <TextField
                fullWidth
                multiline
                minRows={3}
                label="Note"
                value={
                    settings.note ||
                    "Ratings and inputs provided here will be reviewed and discussed during your 1:1 evaluation meeting with your supervisor."
                }
                onChange={(event) =>
                    updateSetting(
                        "note",
                        event.target.value
                    )
                }
            />

        </Stack>

    );

}