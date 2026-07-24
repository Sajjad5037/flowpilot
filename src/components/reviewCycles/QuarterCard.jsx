import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Stack,
  Typography,
  TextField,
  Button,
  Chip,
  Divider,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

const QuarterCard = ({ quarter, reviewPeriod, sendDate, onSave }) => {
  const [date, setDate] = useState(sendDate || "");

  useEffect(() => {
    setDate(sendDate || "");
  }, [sendDate]);

  const handleSave = () => {
    if (onSave) {
      onSave({
        quarter,
        sendDate: date,
      });
    }
  };

  return (
    <Card
      elevation={2}
      sx={{
        borderRadius: 3,
        height: "100%",
      }}
    >
      <CardContent>
        <Stack spacing={3}>
          {/* Header */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" fontWeight={700}>
              {quarter}
            </Typography>

            <Chip
              label="Read Only"
              size="small"
              color="default"
              variant="outlined"
            />
          </Stack>

          <Divider />

          {/* Quarter */}
          <Stack spacing={0.5}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ textTransform: "uppercase", letterSpacing: 1 }}
            >
              Quarter
            </Typography>

            <Typography variant="body1" fontWeight={600}>
              {reviewPeriod}
            </Typography>
          </Stack>

          {/* Send Date */}
          <TextField
            label="Send Evaluation Invitations On"
            type="date"
            fullWidth
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />

          {/* Save */}
          <Stack direction="row" justifyContent="flex-end">
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSave}
            >
              Save
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default QuarterCard;