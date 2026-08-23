import { useEffect, useState } from "react";

import {
    Box,
    Button,
    IconButton,
    Stack,
    TextField,
    Typography,
} from "@mui/material";


export default function ExtraProjects({
    component,
    previewMode = "employee",
    responses = {},
    onResponsesChange,
    employeeResponses = {},
    hrResponses = {},
}) {
    console.log("EXTRA PROJECTS DEBUG:", {
        previewMode,
        responses,
        employeeResponses,
        hrResponses,
    });

    const [projects, setProjects] = useState(
        responses?.extra_projects || []
    );

    const [employeeProjects, setEmployeeProjects] = useState(
        employeeResponses?.extra_projects || []
    );

    const [hrProjects, setHrProjects] = useState(
        hrResponses?.hr_extra_projects || []
    );

    const displayProjects = [
        ...projects,
        ...hrProjects,
    ];

    useEffect(() => {
        setHrProjects(hrResponses?.hr_extra_projects || []);
    }, [hrResponses?.hr_extra_projects]);

    useEffect(() => {
        setEmployeeProjects(employeeResponses?.extra_projects || []);
    }, [employeeResponses?.extra_projects]);

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


                    {employeeProjects.map(
                        (project, index) => (

                            <Box
                                key={project.id}
                                sx={{
                                    minWidth: 700,

                                    display: "grid",

                                    gridTemplateColumns:
                                        "2fr 1fr 1fr",

                                    position: "relative",

                                    backgroundColor:
                                        index % 2 === 0
                                            ? "#FFFFFF"
                                            : "#FAFCFE",

                                    borderBottom:
                                        index ===
                                        (employeeProjects.length || 0) - 1
                                            ? "none"
                                            : "1px solid #E2E8F0",
                                }}
                            >

                                <IconButton
                                    size="small"
                                    color="error"
                                    aria-label="Delete employee project"
                                    onClick={() => {
                                        const updatedEmployeeProjects =
                                            employeeProjects.filter(
                                                (row) => row.id !== project.id
                                            );

                                        setEmployeeProjects(updatedEmployeeProjects);

                                        onResponsesChange?.({
                                            ...responses,
                                            extra_projects: updatedEmployeeProjects,
                                        });
                                    }}
                                    sx={{
                                        position: "absolute",
                                        top: 8,
                                        right: 8,
                                        color: "#EF4444",
                                        zIndex: 1,
                                    }}
                                >
                                    ×
                                </IconButton>

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

                    {hrProjects.map((project, index) => (
                        <Box
                            key={project.id}
                            sx={{
                                minWidth: 700,
                                display: "grid",
                                gridTemplateColumns: "2fr 1fr 1fr",
                                backgroundColor:
                                    index % 2 === 0 ? "#FFFFFF" : "#FAFCFE",
                                borderTop: "1px solid #E2E8F0",
                                position: "relative",
                            }}
                        >
                            <IconButton
                                size="small"
                                onClick={() => {
                                    const updatedHrProjects = hrProjects.filter(
                                        (row) => row.id !== project.id
                                    );

                                    setHrProjects(updatedHrProjects);

                                    onResponsesChange?.({
                                        ...responses,
                                        hr_extra_projects: updatedHrProjects,
                                    });
                                }}
                                sx={{
                                    position: "absolute",
                                    top: 8,
                                    right: 8,
                                    color: "#EF4444",
                                    zIndex: 1,
                                }}
                            >
                                ×
                            </IconButton>

                            <Box sx={{ p: 1.5, borderRight: "1px solid #E2E8F0" }}>
                                <ProjectField
                                    label="Project or Assignment"
                                    value={project.description}
                                    onChange={(value) => {
                                        const updatedHrProjects = hrProjects.map((row) =>
                                            row.id === project.id
                                                ? { ...row, description: value }
                                                : row
                                        );

                                        setHrProjects(updatedHrProjects);

                                        onResponsesChange?.({
                                            ...responses,
                                            hr_extra_projects: updatedHrProjects,
                                        });
                                    }}
                                />
                            </Box>

                            <Box sx={{ p: 1.5, borderRight: "1px solid #E2E8F0" }}>
                                <ProjectField
                                    label="Start date"
                                    value={project.startDate}
                                    type="date"
                                    onChange={(value) => {
                                        const updatedHrProjects = hrProjects.map((row) =>
                                            row.id === project.id
                                                ? { ...row, startDate: value }
                                                : row
                                        );

                                        setHrProjects(updatedHrProjects);

                                        onResponsesChange?.({
                                            ...responses,
                                            hr_extra_projects: updatedHrProjects,
                                        });
                                    }}
                                />
                            </Box>

                            <Box sx={{ p: 1.5 }}>
                                <ProjectField
                                    label="End date"
                                    value={project.endDate}
                                    type="date"
                                    onChange={(value) => {
                                        const updatedHrProjects = hrProjects.map((row) =>
                                            row.id === project.id
                                                ? { ...row, endDate: value }
                                                : row
                                        );

                                        setHrProjects(updatedHrProjects);

                                        onResponsesChange?.({
                                            ...responses,
                                            hr_extra_projects: updatedHrProjects,
                                        });
                                    }}
                                />
                            </Box>
                        </Box>
                    ))}

                </Box>

                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                        const updatedHrProjects = [
                            ...hrProjects,
                            {
                                id: `hr-project-${Date.now()}`,
                                description: "",
                                startDate: "",
                                endDate: "",
                            },
                        ];

                        setHrProjects(updatedHrProjects);

                        onResponsesChange?.({
                            ...responses,
                            hr_extra_projects: updatedHrProjects,
                        });
                    }}
                    sx={{ mt: 2 }}
                >
                    + Add Project
                </Button>

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
                        Extra Projects or
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
                    onClick={() => {
                        setProjects((prev) => [
                            ...prev,
                            {
                                id: `project-${Date.now()}`,
                                description: "",
                                startDate: "",
                                endDate: "",
                            },
                        ]);
                    }}
                >
                    + Add Another Project
                </Button>

            </Stack>


            <Stack spacing={1.5}>

                {displayProjects.map(
                    (project, index) => {

                        const isHrProject =
                            hrProjects.some(
                                (hrProject) =>
                                    hrProject.id === project.id
                            );

                        return (
                            <Box
                                key={project.id}
                                sx={{
                                    border: "1px solid #D6E0EC",
                                    borderRadius: 2,
                                    backgroundColor: "#F8FAFC",
                                    p: 1.5,
                                    position: "relative",
                                    pr: 6,
                                }}
                            >

                                {isHrProject ? (
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            display: "block",
                                            mb: 1,
                                            fontWeight: 600,
                                            color: "#64748B",
                                        }}
                                    >
                                        Added by HR
                                    </Typography>
                                ) : (
                                    <IconButton
                                        size="small"
                                        onClick={() => {
                                            setProjects((prev) =>
                                                prev.filter(
                                                    (row) =>
                                                        row.id !== project.id
                                                )
                                            );
                                        }}
                                        sx={{
                                            position: "absolute",
                                            top: 8,
                                            right: 8,
                                            color: "#EF4444",
                                        }}
                                    >
                                        ×
                                    </IconButton>
                                )}

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
                                        value={project.description}
                                        onChange={
                                            isHrProject
                                                ? undefined
                                                : (value) => {
                                                    const updatedProjects =
                                                        projects.map((row) =>
                                                            row.id === project.id
                                                                ? {
                                                                    ...row,
                                                                    description: value,
                                                                }
                                                                : row
                                                        );

                                                    setProjects(updatedProjects);

                                                    onResponsesChange?.({
                                                        ...responses,
                                                        extra_projects:
                                                            updatedProjects,
                                                    });
                                                }
                                        }
                                    />

                                    <ProjectField
                                        label="Start Date"
                                        value={project.startDate}
                                        type="date"
                                        onChange={
                                            isHrProject
                                                ? undefined
                                                : (value) => {
                                                    const updatedProjects =
                                                        projects.map((row) =>
                                                            row.id === project.id
                                                                ? {
                                                                    ...row,
                                                                    startDate: value,
                                                                }
                                                                : row
                                                        );

                                                    setProjects(updatedProjects);

                                                    onResponsesChange?.({
                                                        ...responses,
                                                        extra_projects:
                                                            updatedProjects,
                                                    });
                                                }
                                        }
                                    />

                                    <ProjectField
                                        label="End Date"
                                        value={project.endDate}
                                        type="date"
                                        onChange={
                                            isHrProject
                                                ? undefined
                                                : (value) => {
                                                    const updatedProjects =
                                                        projects.map((row) =>
                                                            row.id === project.id
                                                                ? {
                                                                    ...row,
                                                                    endDate: value,
                                                                }
                                                                : row
                                                        );

                                                    setProjects(updatedProjects);

                                                    onResponsesChange?.({
                                                        ...responses,
                                                        extra_projects:
                                                            updatedProjects,
                                                    });
                                                }
                                        }
                                    />

                                </Box>

                            </Box>
                        );
                    }
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
    onChange,
    type,
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
                type={type}
                value={value}
                variant="outlined"
                onChange={(event) =>
                    onChange?.(event.target.value)
                }
                sx={{
                    "& .MuiOutlinedInput-root": {
                        backgroundColor: "#FFFFFF",
                    },
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