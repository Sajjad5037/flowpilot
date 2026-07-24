import {
    Box,
    Button,
    Stack,
    Typography
} from "@mui/material";

import QuestionCard from "./QuestionCard";

export default function BuilderCanvas({
    selectedSection,
    selectedQuestion,
    onSelectQuestion,
    onAddQuestion
}) {

    if (!selectedSection) {

        return (

            <Box
                sx={{
                    border: "1px solid #E5E7EB",
                    borderRadius: 3,
                    bgcolor: "#fff",
                    height: "100%",
                    p: 5
                }}
            >

                <Typography
                    variant="h4"
                    gutterBottom
                >
                    Welcome to FlowPilot Builder
                </Typography>

                <Typography color="text.secondary">
                    Your template doesn't contain any sections yet.
                </Typography>

                <Typography
                    color="text.secondary"
                    mt={2}
                >
                    Click <strong>Add Section</strong> to begin building your evaluation template.
                </Typography>

            </Box>

        );

    }

    return (

        <Box
            sx={{
                border: "1px solid #E5E7EB",
                borderRadius: 3,
                bgcolor: "#fff",
                height: "100%",
                p: 5
            }}
        >

            <Typography
                variant="h4"
                gutterBottom
            >
                {selectedSection.name}
            </Typography>

            <Typography
                color="text.secondary"
                mb={3}
            >
                {selectedSection.description || "No description"}
            </Typography>

            <Button
                variant="contained"
                onClick={onAddQuestion}
            >
                + Add Question
            </Button>

            {selectedSection.questions.length === 0 ? (

                <Typography
                    color="text.secondary"
                    mt={5}
                >
                    This section doesn't contain any questions yet.
                </Typography>

            ) : (

                <Stack
                    spacing={3}
                    mt={4}
                >

                    {selectedSection.questions.map(question => (

                          <QuestionCard
                            key={question.id}
                            question={question}
                            selected={selectedQuestion?.id === question.id}
                            onClick={() => onSelectQuestion(question)}
                        />

                    ))}

                </Stack>

            )}

        </Box>

    );

}