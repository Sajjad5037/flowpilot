import {
    Box,
    Button,
    Divider,
    List,
    ListItemButton,
    ListItemText,
    Typography
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

export default function SectionsPanel({
    sections,
    selectedSection,
    onSelect,
    onAddSection
}) {

    return (

        <Box
            sx={{
                border: "1px solid #E5E7EB",
                borderRadius: 3,
                bgcolor: "#fff",
                height: "100%",
                p: 2
            }}
        >

            <Typography
                variant="h6"
                mb={2}
            >
                Sections
            </Typography>

            <Button
                fullWidth
                variant="contained"
                startIcon={<AddIcon />}
                onClick={onAddSection}
            >
                Add Section
            </Button>

            <Divider sx={{ my: 2 }} />

            {sections.length === 0 ? (

                <Box
                    sx={{
                        py: 5,
                        textAlign: "center"
                    }}
                >

                    <Typography
                        variant="body1"
                        fontWeight={600}
                    >
                        No sections yet
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        mt={1}
                    >
                        Click "Add Section" to begin building your evaluation template.
                    </Typography>

                </Box>

            ) : (

                <List>

                    {sections.map(section => (

                        <ListItemButton
                            key={section.id}
                            selected={selectedSection?.id === section.id}
                            onClick={() => onSelect(section)}
                        >

                            <ListItemText
                                primary={section.name}
                                secondary={section.description}
                            />

                        </ListItemButton>

                    ))}

                </List>

            )}

        </Box>

    );

}