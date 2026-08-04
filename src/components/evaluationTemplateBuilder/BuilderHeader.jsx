import {
    Box,
    Button,
    Chip,
    Stack,
    Typography,
    ToggleButton,
    ToggleButtonGroup
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SaveIcon from "@mui/icons-material/Save";
import PublishIcon from "@mui/icons-material/Publish";

export default function BuilderHeader({
    templateName,
    viewMode,
    onViewModeChange
}) {

    return (

        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={4}
        >

            <Box>

                <Button
                    startIcon={<ArrowBackIcon />}
                    sx={{ mb: 2 }}
                >
                    Back to Templates
                </Button>

                <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                >

                    <Typography
                        variant="h4"
                        fontWeight={700}
                    >
                        {templateName}
                    </Typography>

                    <Chip
                        label="Draft"
                        color="warning"
                    />

                </Stack>

            </Box>

            <Stack
                direction="row"
                spacing={2}
            >

                <ToggleButtonGroup
                    value={viewMode}
                    exclusive
                    onChange={(event, value) => {
                        if (value) {
                            onViewModeChange(value);
                        }
                    }}
                    size="small"
                >

                    <ToggleButton value="builder">
                        Builder
                    </ToggleButton>

                    <ToggleButton value="preview">
                        <VisibilityIcon
                            fontSize="small"
                            sx={{ mr: 1 }}
                        />
                        Preview
                    </ToggleButton>

                </ToggleButtonGroup>

                <Button
                    startIcon={<SaveIcon />}
                    variant="outlined"
                >
                    Save Draft
                </Button>

                <Button
                    startIcon={<PublishIcon />}
                    variant="contained"
                >
                    Publish
                </Button>

            </Stack>

        </Box>

    );

}