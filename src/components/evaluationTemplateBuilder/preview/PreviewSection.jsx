import { Box, Typography } from "@mui/material";

export default function PreviewSection({
    title,
    children
}) {

    return (

        <Box
            sx={{
                bgcolor: "#fff",
                border: "1px solid #E5E7EB",
                borderRadius: 3,
                p: 4,
                mb: 4,
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
            }}
        >

            <Typography
                variant="h5"
                fontWeight={700}
                mb={2}
            >
                {title}
            </Typography>

            {children}

        </Box>

    );

}