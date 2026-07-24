import {
    Box,
    Divider,
    TextField,
    Typography,
    Checkbox,
    FormControlLabel
} from "@mui/material";
import { QUESTION_REGISTRY } from "../../constants/questionRegistry";
import { QUESTION_TYPES } from "../../constants/questionTypes";


export default function PropertiesPanel({
    selectedSection,
    selectedQuestion,
    onQuestionChange,
    onSectionChange
}) {

    // Nothing selected
    if (!selectedSection && !selectedQuestion) {

        return (

            <Box
                sx={{
                    border: "1px solid #E5E7EB",
                    borderRadius: 3,
                    bgcolor: "#fff",
                    height: "100%",
                    p: 3
                }}
            >

                <Typography variant="h6">
                    Properties
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography
                    fontWeight={600}
                    gutterBottom
                >
                    Nothing Selected
                </Typography>

                <Typography color="text.secondary">
                    Select a section or question to edit its properties.
                </Typography>

            </Box>

        );

    }

    // Question selected
    if (selectedQuestion) {

        return (

            <Box
                sx={{
                    border: "1px solid #E5E7EB",
                    borderRadius: 3,
                    bgcolor: "#fff",
                    height: "100%",
                    p: 3
                }}
            >

                <Typography variant="h6">
                    Properties
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography
                    fontWeight={600}
                    gutterBottom
                >
                    Question Details
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle2" color="text.secondary">
                    Label
                </Typography>

                <TextField
                    fullWidth
                    value={selectedQuestion.label}
                    onChange={(event) =>
                        onQuestionChange(selectedQuestion.id, {
                            label: event.target.value
                        })
                    }
                    sx={{ mb: 2 }}
                />

                <Typography variant="subtitle2" color="text.secondary">
                    Question Type
                </Typography>

                <Typography mb={2}>
                    {
                        QUESTION_TYPES.find(
                            item => item.value === selectedQuestion.type
                        )?.label || selectedQuestion.type
                    }
                </Typography>

                <Typography variant="subtitle2" color="text.secondary">
                    Help Text
                </Typography>

                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    value={selectedQuestion.helpText || ""}
                    onChange={(event) =>
                        onQuestionChange(selectedQuestion.id, {
                            helpText: event.target.value
                        })
                    }
                    sx={{ mb: 2 }}
                />

                <Typography variant="subtitle2" color="text.secondary">
                    Required
                </Typography>

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={selectedQuestion.required}
                            onChange={(event) =>
                                onQuestionChange(selectedQuestion.id, {
                                    required: event.target.checked
                                })
                            }
                        />
                    }
                    label="Required"
                />
                {renderQuestionTypeProperties()}

            </Box>

        );

    }
    function renderQuestionTypeProperties() {

    const PropertiesComponent =
        QUESTION_REGISTRY[selectedQuestion.type]?.properties;

    if (!PropertiesComponent) {
        return null;
    }

    return (
        <PropertiesComponent
            question={selectedQuestion}
            onQuestionChange={onQuestionChange}
        />
    );

}
    

    // Section selected
    return (

        <Box
            sx={{
                border: "1px solid #E5E7EB",
                borderRadius: 3,
                bgcolor: "#fff",
                height: "100%",
                p: 3
            }}
        >

            <Typography variant="h6">
                Properties
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography
                fontWeight={600}
                gutterBottom
            >
                Section Settings
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle2" color="text.secondary">
                Section Name
            </Typography>

            <TextField
                fullWidth
                value={selectedSection.name}
                onChange={(event) =>
                    onSectionChange(selectedSection.id, {
                        name: event.target.value
                    })
                }
            />

        </Box>

    );

}