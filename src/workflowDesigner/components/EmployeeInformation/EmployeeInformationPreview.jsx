import {
    Box,
    Grid,
    TextField,
    Typography
} from "@mui/material";

export default function EmployeeInformationPreview({

    component,
    previewMode,
    responses,
    employeeResponses,
    onResponsesChange

}) {

    const fields = component.fields || {};
    const isEmployee = previewMode === "employee";
    const isSupervisor = previewMode === "supervisor";
    const isHR = previewMode === "hr";

    console.log(
        "EmployeeInformation responses:",
        responses
    );

    function renderField(label, fieldKey) {

    return (

        <Box sx={{ mb: 3 }}>

            <Typography
                variant="body1"
                fontWeight={600}
                sx={{ mb: 1 }}
            >
                {label}
            </Typography>

            <TextField
                fullWidth
                variant="outlined"
                value={
                    previewMode === "employee"
                        ? (responses?.employee_information?.[fieldKey] || "")
                        : (employeeResponses?.employee_information?.[fieldKey] || "")
                }
                onChange={(e) => {

                    onResponsesChange({
                        ...responses,
                        employee_information: {
                            ...(responses?.employee_information || {}),
                            [fieldKey]: e.target.value
                        }
                    });

                }}
                disabled={previewMode !== "employee"}
            />

        </Box>

    );

}

    return (

    <Box
        sx={{
            mb: 4
        }}
    >

        {(fields.employeeName ?? true) && (

            <Box>

                {renderField("Employee Name", "employee_name")}

            </Box>

        )}

        {(fields.supervisor ?? true) && (

            <Box>

                {renderField("Supervisor", "supervisor")}

            </Box>

        )}

        {(fields.department ?? true) && (

            <Box>

                {renderField("Department", "department")}

            </Box>

        )}

        {(fields.position ?? true) && (

            <Box>

                {renderField("Position", "position")}

            </Box>

        )}

        {(fields.phoneNumber ?? false) && (

            <Box>

                {renderField("Phone Number", "phone_number")}

            </Box>

        )}

        {(fields.employeeId ?? false) && (

            <Box>

                {renderField("Employee ID", "employee_id")}

            </Box>

        )}

        {(fields.officeLocation ?? false) && (

            <Box>

                {renderField("Office Location", "office_location")}

            </Box>

        )}

        {(fields.costCentre ?? false) && (

            <Box>

                {renderField("Cost Center", "cost_center")}

            </Box>

        )}

    </Box>

);

}