import {
    Paper,
    Typography,
    Divider,
    Stack,
    TextField,
    Button
} from "@mui/material";

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