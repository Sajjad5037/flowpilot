import { Divider, Typography } from "@mui/material";

export default function InformationCardProperties() {

    return (
        <>
            <Divider sx={{ my: 2 }} />

            <Typography
                variant="subtitle1"
                fontWeight={600}
            >
                Information Card Properties
            </Typography>

            <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1 }}
            >
                This is our first reusable evaluation component.
            </Typography>
        </>
    );

}