import {
    Box,
    Checkbox,
    FormControlLabel,
    Typography,
} from "@mui/material";


export default function ExtraProjectsProperties({
    component,
    onChange,
}) {

    const settings =
        component?.settings || {};


    function updateSetting(
        field,
        value
    ) {

        onChange({

            ...component,

            settings: {

                ...settings,

                [field]: value,

            },

        });

    }


    return (

        <Box>

            <Typography
                variant="subtitle1"
                fontWeight={600}
                gutterBottom
            >
                Extra Projects or Accomplishments
            </Typography>


            <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                    mb: 3,
                }}
            >
                Configure how employees and HR
                will experience this section.
            </Typography>


            <FormControlLabel
                control={
                    <Checkbox
                        checked={
                            settings.allowEmployeeAdd ??
                            true
                        }
                        onChange={(event) =>
                            updateSetting(
                                "allowEmployeeAdd",
                                event.target.checked
                            )
                        }
                    />
                }
                label="Allow Employee to Add Projects"
            />


            <FormControlLabel
                control={
                    <Checkbox
                        checked={
                            settings.allowEmployeeDelete ??
                            true
                        }
                        onChange={(event) =>
                            updateSetting(
                                "allowEmployeeDelete",
                                event.target.checked
                            )
                        }
                    />
                }
                label="Allow Employee to Delete Projects"
            />

        </Box>

    );
}