import {
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import type { Diagnosis, OccupationalHealthcareEntry } from "../../../types";
import WorkIcon from "@mui/icons-material/Work";

const OccupationalHealthcareEntryDetail: React.FC<{
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}> = ({ entry, diagnoses }) => {
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
            {entry.date} <WorkIcon /> {entry.employerName}
          </Typography>
          <Typography sx={{ fontStyle: "italic" }}>
            {entry.description}
          </Typography>
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

export default OccupationalHealthcareEntryDetail;
