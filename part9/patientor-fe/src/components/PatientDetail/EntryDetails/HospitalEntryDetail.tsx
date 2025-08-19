import {
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import type { Diagnosis, HospitalEntry } from "../../../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

const HospitalEntryDetail: React.FC<{
  entry: HospitalEntry;
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
            {entry.date} <LocalHospitalIcon />
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

export default HospitalEntryDetail;
