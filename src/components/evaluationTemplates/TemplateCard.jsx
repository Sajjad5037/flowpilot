import {
    Card,
    CardContent,
    Typography,
    Stack,
    Chip,
    Button,
    Divider
} from "@mui/material";

export default function TemplateCard({ template }) {

    return (

        <Card sx={{ borderRadius: 3 }}>

            <CardContent>

                <Stack spacing={2}>

                    <Typography
                        variant="h6"
                        fontWeight={700}
                    >
                        {template.name}
                    </Typography>

                    <Stack
                        direction="row"
                        spacing={1}
                    >
                        <Chip
                            label={template.audience}
                            size="small"
                        />

                        <Chip
                            label={template.category}
                            size="small"
                            color="primary"
                            variant="outlined"
                        />

                        <Chip
                            label={template.status}
                            color={
                                template.status === "Published"
                                    ? "success"
                                    : "warning"
                            }
                            size="small"
                        />
                    </Stack>

                    <Divider />

                    <Typography color="text.secondary">

                        {template.questions} Questions

                    </Typography>

                    <Stack
                        direction="row"
                        spacing={2}
                    >
                        <Button>
                            Edit
                        </Button>

                        <Button>
                            Duplicate
                        </Button>

                        <Button>
                            Preview
                        </Button>
                    </Stack>

                </Stack>

            </CardContent>

        </Card>

    );

}