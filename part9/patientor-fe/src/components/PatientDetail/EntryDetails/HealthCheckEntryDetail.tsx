import {
  HealthCheckRating,
  type Diagnosis,
  type HealthCheckEntry,
} from "../../../types";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

const HealthCheckEntryDetail: React.FC<{
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}> = ({ entry, diagnoses }) => {
  const color = (() => {
    switch (entry.healthCheckRating) {
      case HealthCheckRating.Healthy:
        // return { color: "success" };
        return { style: { color: "green" } };
      case HealthCheckRating.LowRisk:
        return { style: { color: "yellow" } };
      case HealthCheckRating.HighRisk:
        return { style: { color: "orange" } };
      // return { color: "error" };
      case HealthCheckRating.CriticalRisk:
        return { style: { color: "red" } };
      default:
        return { style: { color: "black" } };
    }
  })();

  return (
    <Box>
      <Card
        sx={{
          border: 1,
          mt: 1,
          mb: 1,
        }}
      >
        <CardContent>
          <Typography variant="subtitle1" component="div">
            {entry.date} <MedicalServicesIcon />
          </Typography>
          <Typography sx={{ fontStyle: "italic" }}>
            {entry.description}
          </Typography>
          <Typography>{<FavoriteIcon {...color} />}</Typography>
          {entry.diagnosisCodes && (
            <List dense={true} disablePadding={true}>
              {entry.diagnosisCodes.map((code) => (
                <ListItem key={code}>
                  <ListItemText
                    primary={`${code} ${
                      diagnoses.find((d) => d.code == code)?.name
                    }`}
                  />
                </ListItem>
              ))}
            </List>
          )}
          <Typography>diagnose by {entry.specialist}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default HealthCheckEntryDetail;
