import {
    Box,
    Stack,
    Typography
} from "@mui/material";

import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

export default function SectionCard({
    title,
    children
}) {

    return (

        <Box
            sx={{
                bgcolor: "#FAFAFC",
                border: "1px solid #E4E7EC",
                borderRadius: 2,
                p: 3,
                mb: 3
            }}
        >

            <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                mb={2}
            >

                <FiberManualRecordIcon
                    sx={{
                        fontSize: 12,
                        color: "#6D5BD0"
                    }}
                />

                <Typography
                    variant="h6"
                    fontWeight={700}
                >
                    {title}
                </Typography>

            </Stack>

            {children}

        </Box>

    );

}