import {
    Paper,
    Typography,
    Divider,
    IconButton,
    Stack,
    TextField,
    Button
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function SelfAssessmentProperties({

    component,

    onChange

}) {

    const questions = component.questions || [];

    function updateQuestion(index, value) {

        const updatedQuestions = [...questions];

        updatedQuestions[index] = {

            ...updatedQuestions[index],

            text: value

        };

        onChange({

            ...component,

            questions: updatedQuestions

        });

    }

    function addQuestion() {

        onChange({

            ...component,

            questions: [

                ...questions,

                {

                    id: crypto.randomUUID(),

                    text: ""

                }

            ]

        });

    }

    function removeQuestion(index) {
        onChange({
            ...component,
            questions: questions.filter(
                (_, questionIndex) => questionIndex !== index
            )
        });
    }

    return (

        <Paper
            elevation={0}
            sx={{
                p: 2
            }}
        >

            <Typography
                variant="h6"
                fontWeight={700}
            >
                Self Assessment
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Stack spacing={2}>

                <TextField
                    label="Section Title"
                    value={component.title || "Self Assessment"}
                    onChange={(e) =>
                        onChange({

                            ...component,

                            title: e.target.value

                        })
                    }
                />

                <TextField
                    label="Description"
                    multiline
                    rows={3}
                    value={
                        component.description ||
                        "Employees answer configurable self-assessment questions."
                    }
                    onChange={(e) =>
                        onChange({

                            ...component,

                            description: e.target.value

                        })
                    }
                />

                <Divider />

                <Typography fontWeight={600}>

                    Questions

                </Typography>

                {questions.map((question, index) => (

                    <TextField
                        key={question.id}
                        label={`Question ${index + 1}`}
                        value={question.text}
                        onChange={(e) =>
                            updateQuestion(index, e.target.value)
                        }
                        InputProps={{
                            endAdornment: (
                                <IconButton
                                    size="small"
                                    color="error"
                                    aria-label={`Remove Question ${index + 1}`}
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        removeQuestion(index);
                                    }}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            )
                        }}
                    />

                ))}

                <Button
                    variant="outlined"
                    onClick={addQuestion}
                >
                    + Add Question
                </Button>

            </Stack>

        </Paper>

    );

}