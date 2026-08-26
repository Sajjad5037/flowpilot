import {
    Box,
    TextField,
    Typography
} from "@mui/material";

export default function KPIListPreview({

    component,
    responses,
    onResponsesChange

}) {
    const fields =
        component?.fields &&
        !Array.isArray(component.fields) &&
        Object.keys(component.fields).length > 0
            ? component.fields
            : {
                kpiTitle: true,
                expectation: true,
            };

    const kpis = (component.kpis || [
        {
            id: "preview-kpi-1",
        },
    ]).map((_, index) => `kpi_${index + 1}`);
    function updateKPIField(kpiKey, fieldName, value) {

        onResponsesChange({

            ...responses,

            kpi_list: {

                ...(responses?.kpi_list || {}),

                [kpiKey]: {

                    ...(responses?.kpi_list?.[kpiKey] || {}),

                    [fieldName]: value

                }

            }

        });

    }

    return (

        <Box
            sx={{
                mb: 4
            }}
        >

            <Typography
                variant="h6"
                fontWeight={700}
                mb={3}
            >
                {component.title || "Proposed KPIs"}
            </Typography>

            <Box
                sx={{
                    border: "1px solid #D1D5DB",
                    borderRadius: 2,
                    overflow: "hidden",
                }}
            >

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        bgcolor: "#EEF2F7",
                        borderBottom: "1px solid #D1D5DB",
                    }}
                >

                    {fields.kpiTitle && (

                        <Box
                            sx={{
                                p: 1.5,
                                fontWeight: 700,
                                borderRight: "1px solid #D1D5DB",
                            }}
                        >
                            Proposed KPI Title
                        </Box>

                    )}

                    {fields.expectation && (

                        <Box
                            sx={{
                                p: 1.5,
                                fontWeight: 700,
                            }}
                        >
                            Expectation / Target
                        </Box>

                    )}

                </Box>

                <Box
                    sx={{
                        display: "grid",
                        gap: 1.5,
                        p: 1.5,
                    }}
                >

                    {kpis.map((kpiKey) => {

                        return (

                            <Box
                                key={kpiKey}
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr",
                                    gap: 1.5,
                                }}
                            >

                                {fields.kpiTitle && (

                                    <TextField
                                        fullWidth
                                        size="small"
                                        placeholder="e.g. Sprint Velocity"
                                        value={
                                            responses?.kpi_list?.[kpiKey]?.title || ""
                                        }
                                        onChange={(e) => {

                                            updateKPIField(
                                                kpiKey,
                                                "title",
                                                e.target.value
                                            );

                                        }}
                                    />

                                )}

                                {fields.expectation && (

                                    <TextField
                                        fullWidth
                                        size="small"
                                        placeholder="e.g. 90% completion rate"
                                        value={
                                            responses?.kpi_list?.[kpiKey]?.expectation || ""
                                        }
                                        onChange={(e) => {

                                            updateKPIField(
                                                kpiKey,
                                                "expectation",
                                                e.target.value
                                            );

                                        }}
                                    />

                                )}

                            </Box>

                        );

                    })}

                </Box>

            </Box>

        </Box>

    );

}