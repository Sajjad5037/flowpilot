import {
    Box,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";


export default function GoalSelfEvaluation({
    component,
    previewMode = "employee",
}) {

    const settings =
        component?.settings || {};

    const showTargetDescription =
        settings.showTargetDescription !== false;

    const showMonthlyProgress =
        settings.showMonthlyProgress !== false;

    const allowEmployeeRating =
        settings.allowEmployeeRating !== false;

    const allowEmployeeNotes =
        settings.allowEmployeeNotes !== false;

    const allowSupervisorRating =
        settings.allowSupervisorRating !== false;

    const allowSupervisorNotes =
        settings.allowSupervisorNotes !== false;

    const showEmployeeRating =
        settings.showEmployeeRating !== false;

    const showSupervisorRating =
        settings.showSupervisorRating !== false;

    const allowFinalAgreedRating =
        settings.allowFinalAgreedRating !== false;


    const previewGoal = {
        id: "preview-goal-1",
        targetDescription:
            "Build a bench of 3 top candidates for the RM role (in addition to the 3 we already have)",
    };


    /*
     * Temporary preview data.
     * We will connect this to the database later.
     */

    const monthlyProgress =
        settings.monthlyProgress || {

            April:
                "1 added to bench Andrew Stewart. Total of 4. 3 from last round hire",

            May:
                "1 added to bench Andrew Stewart. Total of 4. 3 from last round hire",

            June:
                "1 added to bench Andrew Stewart. Total of 4. 3 from last round hire",

        };


    const employeeRating =
        settings.employeeRating ||
        "4. Above Expectation";


    const supervisorRating =
        settings.supervisorRating ||
        "3. Meets Expectation";


    const employeeNotes =
        settings.employeeNotes || "";


    const supervisorNotes =
        settings.supervisorNotes ||
        "Solid progress made on bench additions.";


    const finalRating =
        settings.finalRating ||
        "3. Meets Expectation";


    const sectionWeight =
        settings.sectionWeight ||
        "50%";


    const goalWeight =
        settings.goalWeight ||
        "12.5%";


    const totalPoints =
        settings.totalPoints ||
        "9.375 pts";


    const completionDate =
        settings.completionDate ||
        "--";


    const ratingOptions = [

        "1. Poor",

        "2. Below Expectation",

        "3. Meets Expectation",

        "4. Above Expectation",

        "5. Fully Sent",

    ];


    /*
     * ==========================================
     * EMPLOYEE PREVIEW
     * ==========================================
     */

    if (previewMode === "employee") {

        return (

            <Box>

                <Box sx={{ mb: 3 }}>

                    <Typography
                        sx={{
                            fontSize: 18,
                            fontWeight: 700,
                            color: "#0F172A",
                        }}
                    >
                        Quarterly Goals Self-Evaluation
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: 13,
                            color: "#64748B",
                            mt: 0.5,
                            fontStyle: "italic",
                        }}
                    >
                        (Goals are based on the final agreements from the previous
                        goal-setting meeting.)
                    </Typography>

                </Box>


                <Box
                    sx={{
                        mb: 4,
                    }}
                >

                    <Typography
                        sx={{
                            fontSize: 14,
                            fontWeight: 700,
                            mb: 1.5,
                        }}
                    >
                        Goal #1
                    </Typography>


                    <GoalProgressTable
                        targetDescription={
                            previewGoal.targetDescription
                        }
                        monthlyProgress={
                            monthlyProgress
                        }
                        showTargetDescription={
                            showTargetDescription
                        }
                        showMonthlyProgress={
                            showMonthlyProgress
                        }
                    />


                    {allowEmployeeRating && (

                        <Box
                            sx={{
                                mt: 2,
                                p: 2,
                                border:
                                    "1px solid #BFDBFE",
                                borderRadius: 2,
                                bgcolor: "#F8FBFF",
                            }}
                        >

                            <Typography
                                fontSize={13}
                                fontWeight={700}
                                mb={1}
                            >
                                Select Your Self-Rating
                            </Typography>


                            <Select
                                fullWidth
                                size="small"
                                value={employeeRating}
                            >

                                {ratingOptions.map(
                                    option => (

                                        <MenuItem
                                            key={option}
                                            value={option}
                                        >
                                            {option}
                                        </MenuItem>

                                    )
                                )}

                            </Select>


                            {allowEmployeeNotes && (

                                <TextField
                                    fullWidth
                                    size="small"
                                    sx={{ mt: 2 }}
                                    placeholder="Add notes or feedback..."
                                    value={employeeNotes}
                                    multiline
                                    minRows={2}
                                />

                            )}

                        </Box>

                    )}

                </Box>

            </Box>

        );

    }


    /*
     * ==========================================
     * SUPERVISOR PREVIEW
     * ==========================================
     */

    if (previewMode === "supervisor") {

        return (

            <Box>

                <Typography
                    sx={{
                        fontSize: 18,
                        fontWeight: 700,
                        color: "#0F172A",
                        mb: 3,
                    }}
                >
                    Quarterly Goals Evaluation
                </Typography>


                <Box
                    sx={{
                        mb: 4,
                    }}
                >

                    <Typography
                        sx={{
                            fontSize: 14,
                            fontWeight: 700,
                            mb: 1.5,
                        }}
                    >
                        Goal #1
                    </Typography>


                    <GoalProgressTable
                        targetDescription={
                            previewGoal.targetDescription
                        }
                        monthlyProgress={
                            monthlyProgress
                        }
                        showTargetDescription={
                            showTargetDescription
                        }
                        showMonthlyProgress={
                            showMonthlyProgress
                        }
                    />


                    {(allowSupervisorRating ||
                        allowSupervisorNotes) && (

                        <Box
                            sx={{
                                mt: 2,
                                p: 2,
                                border:
                                    "1px solid #E9D5FF",
                                borderRadius: 2,
                                bgcolor: "#FCF8FF",
                            }}
                        >

                            {allowSupervisorRating && (

                                <>
                                    <Typography
                                        fontSize={13}
                                        fontWeight={700}
                                        mb={1}
                                    >
                                        Select Supervisor Rating *
                                    </Typography>


                                    <Select
                                        fullWidth
                                        size="small"
                                        value={
                                            supervisorRating
                                        }
                                    >

                                        {ratingOptions.map(
                                            option => (

                                                <MenuItem
                                                    key={option}
                                                    value={option}
                                                >
                                                    {option}
                                                </MenuItem>

                                            )
                                        )}

                                    </Select>

                                </>

                            )}


                            {allowSupervisorNotes && (

                                <TextField
                                    fullWidth
                                    size="small"
                                    sx={{ mt: 2 }}
                                    value={
                                        supervisorNotes
                                    }
                                    multiline
                                    minRows={2}
                                    placeholder="Supervisor notes..."
                                />

                            )}

                        </Box>

                    )}

                </Box>

            </Box>

        );

    }


    /*
     * ==========================================
     * HR PREVIEW
     * ==========================================
     */

    if (previewMode === "hr") {

        return (

            <Box>

                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    mb={3}
                >

                    <Typography
                        sx={{
                            fontSize: 18,
                            fontWeight: 700,
                            color: "#0F172A",
                        }}
                    >
                        Quarterly Goals
                    </Typography>


                    <Box
                        sx={{
                            px: 1.5,
                            py: 0.6,
                            border:
                                "1px solid #CBD5E1",
                            borderRadius: 1.5,
                            bgcolor: "#F8FAFC",
                            fontSize: 12,
                            fontWeight: 600,
                        }}
                    >
                        Section Weight: {sectionWeight}
                    </Box>

                </Stack>


                <Box
                    sx={{
                        mb: 4,
                    }}
                >

                    <Box
                        
                        sx={{
                            mb: 4,
                        }}
                    >

                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            mb={2}
                        >

                            <Typography
                                sx={{
                                    fontSize: 14,
                                    fontWeight: 700,
                                    color: "#7C3AED",
                                }}
                            >
                                Goal # 1
                            </Typography>


                            <Stack
                                direction="row"
                                spacing={2}
                            >

                                <Typography
                                    sx={{
                                        fontSize: 13,
                                    }}
                                >
                                    Goal Weight:{" "}
                                    <strong>
                                        {goalWeight}
                                    </strong>
                                </Typography>


                                <Typography
                                    sx={{
                                        fontSize: 13,
                                    }}
                                >
                                    Total Points:{" "}
                                    <strong>
                                        {totalPoints}
                                    </strong>
                                </Typography>

                            </Stack>

                        </Stack>


                        <HRGoalTable
                            targetDescription={
                                previewGoal.targetDescription
                            }
                            monthlyProgress={
                                monthlyProgress
                            }
                            completionDate={
                                completionDate
                            }
                        />


                        <Box
                            sx={{
                                mt: 2,
                                display: "grid",
                                gridTemplateColumns:
                                    {
                                        xs: "1fr",
                                        md: "1fr 1fr 1fr",
                                    },
                                gap: 2,
                            }}
                        >

                            <RatingBox
                                label="Employee Selection"
                                value={
                                    employeeRating
                                }
                            />


                            <RatingBox
                                label="Supervisor Selection"
                                value={
                                    supervisorRating
                                }
                            />


                            <Box
                                sx={{
                                    p: 2,
                                    border:
                                        "1px solid #BFDBFE",
                                    borderRadius: 2,
                                    bgcolor: "#F8FBFF",
                                }}
                            >

                                <Typography
                                    sx={{
                                        fontSize: 13,
                                        fontWeight: 700,
                                        color: "#2563EB",
                                        mb: 1,
                                    }}
                                >
                                    Final Agreed Rating
                                    (Meeting Decision)
                                </Typography>


                                <Select
                                    fullWidth
                                    size="small"
                                    value={
                                        finalRating
                                    }
                                >

                                    {ratingOptions.map(
                                        option => (

                                            <MenuItem
                                                key={option}
                                                value={option}
                                            >
                                                {option}
                                            </MenuItem>

                                        )
                                    )}

                                </Select>

                            </Box>

                        </Box>

                    </Box>

                </Box>


            </Box>

        );

    }


    return null;

}


/*
 * ==========================================
 * EMPLOYEE / SUPERVISOR TABLE
 * ==========================================
 */

function GoalProgressTable({
    targetDescription,
    monthlyProgress,
    showTargetDescription = true,
    showMonthlyProgress = true,
}) {

    return (

        <Box
            sx={{
                width: "100%",
                border:
                    "1px solid #CBD5E1",
                overflow: "hidden",
            }}
        >

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns:
                        "1.2fr 1fr 1fr 1fr",
                }}
            >

                <Box
                    sx={{
                        p: 1.5,
                        bgcolor: "#F8FAFC",
                        borderRight:
                            "1px solid #CBD5E1",
                        borderBottom:
                            "1px solid #CBD5E1",
                    }}
                >

                    <Typography
                        sx={{
                            fontSize: 13,
                            fontWeight: 700,
                        }}
                    >
                        Target Description
                    </Typography>

                </Box>


                <Box
                    sx={{
                        gridColumn: "span 3",
                        p: 1.5,
                        bgcolor: "#F8FAFC",
                        textAlign: "center",
                        borderBottom:
                            "1px solid #CBD5E1",
                    }}
                >

                    <Typography
                        sx={{
                            fontSize: 13,
                            fontWeight: 700,
                        }}
                    >
                        Monthly Progress Tracking
                    </Typography>


                    <Typography
                        sx={{
                            fontSize: 10,
                            color: "text.secondary",
                        }}
                    >
                        (Synced from Master Sheet)
                    </Typography>

                </Box>


                <Box
                    sx={{
                        p: 1.2,
                        bgcolor: "#F8FAFC",
                        borderRight:
                            "1px solid #CBD5E1",
                    }}
                />


                {["April", "May", "June"].map(
                    month => (

                        <Box
                            key={month}
                            sx={{
                                p: 1.2,
                                bgcolor: "#F8FAFC",
                                textAlign: "center",
                                borderRight:
                                    month !== "June"
                                        ? "1px solid #CBD5E1"
                                        : "none",
                            }}
                        >

                            <Typography
                                sx={{
                                    fontSize: 13,
                                    fontWeight: 700,
                                }}
                            >
                                {month}
                            </Typography>

                        </Box>

                    )
                )}


                <Box
                    sx={{
                        p: 1.5,
                        minHeight: 80,
                        borderRight:
                            "1px solid #CBD5E1",
                    }}
                >

                    <Typography
                        sx={{
                            fontSize: 13,
                            color: "#334155",
                        }}
                    >
                        {targetDescription}
                    </Typography>

                </Box>


                {["April", "May", "June"].map(
                    month => (

                        <Box
                            key={month}
                            sx={{
                                p: 1.5,
                                minHeight: 80,
                                borderRight:
                                    month !== "June"
                                        ? "1px solid #CBD5E1"
                                        : "none",
                            }}
                        >

                            <Typography
                                sx={{
                                    fontSize: 13,
                                    color: "#334155",
                                }}
                            >
                                {
                                    monthlyProgress[
                                        month
                                    ] || "--"
                                }
                            </Typography>

                        </Box>

                    )
                )}

            </Box>

        </Box>

    );

}


/*
 * ==========================================
 * HR TABLE
 * ==========================================
 */

function HRGoalTable({
    targetDescription,
    monthlyProgress,
    completionDate,
    showTargetDescription = true,
    showMonthlyProgress = true,
}) {

    return (

        <Box
            sx={{
                width: "100%",
                border:
                    "1px solid #CBD5E1",
                overflow: "hidden",
            }}
        >

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns:
                        "1.2fr 1fr 1fr 1fr 0.7fr",
                }}
            >

                <Box
                    sx={{
                        p: 1.5,
                        bgcolor: "#F8FAFC",
                        borderRight:
                            "1px solid #CBD5E1",
                        borderBottom:
                            "1px solid #CBD5E1",
                    }}
                >

                    <Typography
                        sx={{
                            fontSize: 13,
                            fontWeight: 700,
                        }}
                    >
                        Goals
                    </Typography>

                </Box>


                <Box
                    sx={{
                        gridColumn: "span 3",
                        p: 1.5,
                        bgcolor: "#F8FAFC",
                        textAlign: "center",
                        borderBottom:
                            "1px solid #CBD5E1",
                    }}
                >

                    <Typography
                        sx={{
                            fontSize: 13,
                            fontWeight: 700,
                        }}
                    >
                        Defined Completion
                    </Typography>

                </Box>


                <Box
                    sx={{
                        p: 1.5,
                        bgcolor: "#F8FAFC",
                        textAlign: "center",
                        borderBottom:
                            "1px solid #CBD5E1",
                    }}
                >

                    <Typography
                        sx={{
                            fontSize: 13,
                            fontWeight: 700,
                        }}
                    >
                        Completion Date
                    </Typography>

                </Box>


                <Box
                    sx={{
                        p: 1.2,
                        bgcolor: "#F8FAFC",
                        borderRight:
                            "1px solid #CBD5E1",
                    }}
                />


                {["April", "May", "June"].map(
                    month => (

                        <Box
                            key={month}
                            sx={{
                                p: 1.2,
                                bgcolor: "#F8FAFC",
                                textAlign: "center",
                                borderRight:
                                    "1px solid #CBD5E1",
                            }}
                        >

                            <Typography
                                sx={{
                                    fontSize: 13,
                                    fontWeight: 700,
                                }}
                            >
                                {month}
                            </Typography>

                        </Box>

                    )
                )}


                <Box
                    sx={{
                        p: 1.2,
                        bgcolor: "#F8FAFC",
                    }}
                />


                <Box
                    sx={{
                        p: 1.5,
                        minHeight: 75,
                        borderRight:
                            "1px solid #CBD5E1",
                    }}
                >

                    <Typography
                        sx={{
                            fontSize: 13,
                            color: "#334155",
                        }}
                    >
                        {targetDescription}
                    </Typography>

                </Box>


                {["April", "May", "June"].map(
                    month => (

                        <Box
                            key={month}
                            sx={{
                                p: 1.5,
                                minHeight: 75,
                                borderRight:
                                    "1px solid #CBD5E1",
                            }}
                        >

                            <Typography
                                sx={{
                                    fontSize: 13,
                                    color: "#334155",
                                }}
                            >
                                {
                                    monthlyProgress[
                                        month
                                    ] || "--"
                                }
                            </Typography>

                        </Box>

                    )
                )}


                <Box
                    sx={{
                        p: 1.5,
                        minHeight: 75,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >

                    <Typography
                        sx={{
                            fontSize: 13,
                            color: "#334155",
                        }}
                    >
                        {completionDate}
                    </Typography>

                </Box>

            </Box>

        </Box>

    );

}


/*
 * ==========================================
 * HR RATING BOX
 * ==========================================
 */

function RatingBox({
    label,
    value,
}) {

    return (

        <Box
            sx={{
                p: 2,
                border:
                    "1px solid #CBD5E1",
                borderRadius: 2,
                bgcolor: "#F8FAFC",
            }}
        >

            <Typography
                sx={{
                    fontSize: 13,
                    color: "#475569",
                    mb: 1,
                }}
            >
                {label}
            </Typography>


            <Typography
                sx={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#0F172A",
                }}
            >
                {value}
            </Typography>

        </Box>

    );

}