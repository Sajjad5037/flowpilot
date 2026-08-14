import {
    Box,
    Button,
    Divider,
    IconButton,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";


export default function CompanyInformationProperties({
    component,
    onChange,
}) {

    const settings = component?.settings || {};


    const missionStatement =
        settings.missionStatement || "";


    const coreValues =
        settings.coreValues || [];


    const ratingGuide =
        settings.ratingGuide || [];


    function updateSettings(field, value) {

        onChange({

            ...component,

            settings: {

                ...settings,

                [field]: value,

            },

        });

    }


    /*
     * ==========================================
     * CORE VALUES
     * ==========================================
     */

    function addCoreValue() {

        updateSettings(
            "coreValues",
            [
                ...coreValues,
                {
                    name: "",
                    description: "",
                },
            ]
        );

    }


    function updateCoreValue(
        index,
        field,
        value
    ) {

        const updated =
            coreValues.map(
                (item, itemIndex) =>
                    itemIndex === index
                        ? {
                            ...item,
                            [field]: value,
                        }
                        : item
            );


        updateSettings(
            "coreValues",
            updated
        );

    }


    function removeCoreValue(index) {

        const updated =
            coreValues.filter(
                (_, itemIndex) =>
                    itemIndex !== index
            );


        updateSettings(
            "coreValues",
            updated
        );

    }


    /*
     * ==========================================
     * RATING GUIDE
     * ==========================================
     */

    function addRating() {

        updateSettings(
            "ratingGuide",
            [
                ...ratingGuide,
                {
                    rating: "",
                    description: "",
                },
            ]
        );

    }


    function updateRating(
        index,
        field,
        value
    ) {

        const updated =
            ratingGuide.map(
                (item, itemIndex) =>
                    itemIndex === index
                        ? {
                            ...item,
                            [field]: value,
                        }
                        : item
            );


        updateSettings(
            "ratingGuide",
            updated
        );

    }


    function removeRating(index) {

        const updated =
            ratingGuide.filter(
                (_, itemIndex) =>
                    itemIndex !== index
            );


        updateSettings(
            "ratingGuide",
            updated
        );

    }


    return (

        <Stack spacing={4}>

            {/* ================================= */}
            {/* DESCRIPTION                       */}
            {/* ================================= */}

            <Box>

                <Typography
                    fontWeight={700}
                >
                    Company Information
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    mt={0.5}
                >
                    Configure the information employees
                    should see before completing the
                    evaluation.
                </Typography>

            </Box>


            {/* ================================= */}
            {/* MISSION STATEMENT                 */}
            {/* ================================= */}

            <Box>

                <Typography
                    fontWeight={600}
                    mb={1}
                >
                    Mission Statement
                </Typography>

                <TextField
                    fullWidth
                    multiline
                    minRows={5}
                    label="Mission Statement"
                    value={missionStatement}
                    onChange={(event) =>
                        updateSettings(
                            "missionStatement",
                            event.target.value
                        )
                    }
                />

            </Box>


            <Divider />


            {/* ================================= */}
            {/* CORE VALUES                       */}
            {/* ================================= */}

            <Box>

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                >

                    <Box>

                        <Typography
                            fontWeight={600}
                        >
                            Core Values
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            mt={0.5}
                        >
                            Add the company's core values
                            and their descriptions.
                        </Typography>

                    </Box>


                    <Button
                        size="small"
                        startIcon={<AddIcon />}
                        onClick={addCoreValue}
                    >
                        Add
                    </Button>

                </Stack>


                <Stack spacing={2}>

                    {coreValues.map(
                        (value, index) => (

                            <Box
                                key={index}
                                sx={{
                                    p: 2,
                                    border:
                                        "1px solid #E2E8F0",
                                    borderRadius: 2,
                                    bgcolor: "#F8FAFC",
                                }}
                            >

                                <Stack spacing={2}>

                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        alignItems="flex-start"
                                    >

                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Value"
                                            placeholder="Transparency"
                                            value={
                                                value.name
                                            }
                                            onChange={
                                                (event) =>
                                                    updateCoreValue(
                                                        index,
                                                        "name",
                                                        event.target.value
                                                    )
                                            }
                                        />


                                        <IconButton
                                            color="error"
                                            onClick={() =>
                                                removeCoreValue(
                                                    index
                                                )
                                            }
                                        >

                                            <DeleteIcon />

                                        </IconButton>

                                    </Stack>


                                    <TextField
                                        fullWidth
                                        size="small"
                                        multiline
                                        minRows={2}
                                        label="Description"
                                        placeholder="Open, honest, and factual communication."
                                        value={
                                            value.description
                                        }
                                        onChange={
                                            (event) =>
                                                updateCoreValue(
                                                    index,
                                                    "description",
                                                    event.target.value
                                                )
                                        }
                                    />

                                </Stack>

                            </Box>

                        )
                    )}

                </Stack>


                {coreValues.length === 0 && (

                    <Box
                        sx={{
                            p: 2,
                            border:
                                "1px dashed #CBD5E1",
                            borderRadius: 2,
                            textAlign: "center",
                        }}
                    >

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            No core values added yet.
                        </Typography>

                    </Box>

                )}

            </Box>


            <Divider />


            {/* ================================= */}
            {/* SELF-RATING GUIDE                 */}
            {/* ================================= */}

            <Box>

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                >

                    <Box>

                        <Typography
                            fontWeight={600}
                        >
                            Self-Rating Guide
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            mt={0.5}
                        >
                            Define the rating scale employees
                            will use.
                        </Typography>

                    </Box>


                    <Button
                        size="small"
                        startIcon={<AddIcon />}
                        onClick={addRating}
                    >
                        Add
                    </Button>

                </Stack>


                <Stack spacing={2}>

                    {ratingGuide.map(
                        (item, index) => (

                            <Box
                                key={index}
                                sx={{
                                    p: 2,
                                    border:
                                        "1px solid #E2E8F0",
                                    borderRadius: 2,
                                    bgcolor: "#F8FAFC",
                                }}
                            >

                                <Stack spacing={2}>

                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        alignItems="flex-start"
                                    >

                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Rating"
                                            placeholder="1. Poor"
                                            value={
                                                item.rating
                                            }
                                            onChange={
                                                (event) =>
                                                    updateRating(
                                                        index,
                                                        "rating",
                                                        event.target.value
                                                    )
                                            }
                                        />


                                        <IconButton
                                            color="error"
                                            onClick={() =>
                                                removeRating(
                                                    index
                                                )
                                            }
                                        >

                                            <DeleteIcon />

                                        </IconButton>

                                    </Stack>


                                    <TextField
                                        fullWidth
                                        size="small"
                                        multiline
                                        minRows={2}
                                        label="Description"
                                        placeholder="Substantially below required targets."
                                        value={
                                            item.description
                                        }
                                        onChange={
                                            (event) =>
                                                updateRating(
                                                    index,
                                                    "description",
                                                    event.target.value
                                                )
                                        }
                                    />

                                </Stack>

                            </Box>

                        )
                    )}

                </Stack>


                {ratingGuide.length === 0 && (

                    <Box
                        sx={{
                            p: 2,
                            border:
                                "1px dashed #CBD5E1",
                            borderRadius: 2,
                            textAlign: "center",
                        }}
                    >

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            No rating levels added yet.
                        </Typography>

                    </Box>

                )}

            </Box>

        </Stack>

    );

}