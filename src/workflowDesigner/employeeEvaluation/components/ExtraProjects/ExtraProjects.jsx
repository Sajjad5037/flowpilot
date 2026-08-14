import {
    Box,
    Button,
    IconButton,
    Stack,
    TextField,
    Typography,
} from "@mui/material";


const previewProjects = [
    {
        id: "project-1",
        description:
            "Supervisor Survey Q2 - 100% submission rate",
        startDate: "June 22nd",
        endDate: "June 29th",
    },
];


export default function ExtraProjects({
    component,
    previewMode = "employee",
}) {

    /*
     * This component is employee-facing only.
     *
     * Supervisor should not see it.
     *
     * HR sees a consolidated version of the
     * employee-submitted projects.
     */


    /*
     * ==========================================
     * SUPERVISOR
     * ==========================================
     *
     * This component should not appear in the
     * Supervisor form.
     */

    if (previewMode === "supervisor") {
        return null;
    }


    /*
     * ==========================================
     * HR VIEW
     * ==========================================
     */

    if (previewMode === "hr") {

        return (

            <Box
                sx={{
                    width: "100%",
                }}
            >

                <Stack
                    direction="row"
                    alignItems="flex-start"
                    justifyContent="space-between"
                    spacing={2}
                    sx={{
                        mb: 1.5,
                    }}
                >

                    <Box>

                        <Typography
                            variant="h6"
                            fontWeight={700}
                            color="#0F172A"
                        >
                            3. Extra Projects or Assignments
                            Accomplished Aside From Quarterly
                            Goals
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                mt: 0.5,
                            }}
                        >
                            Additional impactful projects or
                            assignments completed during the
                            quarter.
                        </Typography>

                    </Box>


                    <Button
                        variant="outlined"
                        size="small"
                    >
                        + Add Project
                    </Button>

                </Stack>


                <Box
                    sx={{
                        width: "100%",
                        overflowX: "auto",
                        border:
                            "1px solid #CBD5E1",
                        borderRadius: 2,
                        overflow: "hidden",
                    }}
                >

                    <Box
                        sx={{
                            minWidth: 700,

                            display: "grid",

                            gridTemplateColumns:
                                "2fr 1fr 1fr",

                            backgroundColor:
                                "#F4F7FB",

                            borderBottom:
                                "1px solid #CBD5E1",
                        }}
                    >

                        <HeaderCell>
                            Project or Assignment
                        </HeaderCell>

                        <HeaderCell>
                            Start date
                        </HeaderCell>

                        <HeaderCell>
                            End date
                        </HeaderCell>

                    </Box>


                    {previewProjects.map(
                        (project, index) => (

                            <Box
                                key={project.id}
                                sx={{
                                    minWidth: 700,

                                    display: "grid",

                                    gridTemplateColumns:
                                        "2fr 1fr 1fr",

                                    backgroundColor:
                                        index % 2 === 0
                                            ? "#FFFFFF"
                                            : "#FAFCFE",

                                    borderBottom:
                                        index ===
                                        previewProjects.length - 1
                                            ? "none"
                                            : "1px solid #E2E8F0",
                                }}
                            >

                                <BodyCell>
                                    {project.description}
                                </BodyCell>

                                <BodyCell
                                    center
                                >
                                    {project.startDate}
                                </BodyCell>

                                <BodyCell
                                    center
                                >
                                    {project.endDate}
                                </BodyCell>

                            </Box>

                        )
                    )}

                </Box>

            </Box>

        );
    }


    /*
     * ==========================================
     * EMPLOYEE VIEW
     * ==========================================
     */

    return (

        <Box
            sx={{
                width: "100%",
            }}
        >

            <Stack
                direction="row"
                alignItems="flex-start"
                justifyContent="space-between"
                spacing={2}
                sx={{
                    mb: 1.5,
                }}
            >

                <Box>

                    <Typography
                        variant="h6"
                        fontWeight={700}
                        color="#0F172A"
                    >
                        3. Extra Projects or
                        Accomplishments
                    </Typography>


                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            mt: 0.5,
                        }}
                    >
                        Add any additional impactful
                        projects or assignments you
                        completed during Q2.
                    </Typography>

                </Box>


                <Button
                    variant="outlined"
                    size="small"
                >
                    + Add Another Project
                </Button>

            </Stack>


            <Stack spacing={1.5}>

                {previewProjects.map(
                    (project) => (

                        <Box
                            key={project.id}
                            sx={{
                                border:
                                    "1px solid #D6E0EC",

                                borderRadius: 2,

                                backgroundColor:
                                    "#F8FAFC",

                                p: 1.5,
                            }}
                        >

                            <Box
                                sx={{
                                    display: "grid",

                                    gridTemplateColumns:
                                        "2fr 1fr 1fr",

                                    gap: 1.5,
                                }}
                            >

                                <ProjectField
                                    label="Project Name / Description"
                                    value={
                                        project.description
                                    }
                                />

                                <ProjectField
                                    label="Start Date"
                                    value={
                                        project.startDate
                                    }
                                />

                                <ProjectField
                                    label="End Date"
                                    value={
                                        project.endDate
                                    }
                                />

                            </Box>

                        </Box>

                    )
                )}

            </Stack>

        </Box>

    );
}


/*
 * ==========================================
 * EMPLOYEE FIELD
 * ==========================================
 */

function ProjectField({
    label,
    value,
}) {

    return (

        <Box>

            <Typography
                variant="caption"
                fontWeight={600}
                color="#334155"
                sx={{
                    display: "block",
                    mb: 0.5,
                }}
            >
                {label}
            </Typography>


            <TextField
                fullWidth
                size="small"
                value={value}
                variant="outlined"
                InputProps={{
                    readOnly: true,
                }}
            />

        </Box>

    );
}


/*
 * ==========================================
 * HR TABLE CELLS
 * ==========================================
 */

function HeaderCell({
    children,
}) {

    return (

        <Box
            sx={{
                p: 1.5,

                minHeight: 52,

                display: "flex",
                alignItems: "center",

                borderRight:
                    "1px solid #CBD5E1",

                fontSize: "0.78rem",

                fontWeight: 700,

                color: "#1E3A5F",
            }}
        >
            {children}
        </Box>

    );
}


function BodyCell({
    children,
    center = false,
}) {

    return (

        <Box
            sx={{
                p: 1.5,

                minHeight: 58,

                display: "flex",

                alignItems: "center",

                justifyContent:
                    center
                        ? "center"
                        : "flex-start",

                borderRight:
                    "1px solid #E2E8F0",

                fontSize: "0.82rem",

                color: "#334155",

                lineHeight: 1.45,
            }}
        >
            {children}
        </Box>

    );
}