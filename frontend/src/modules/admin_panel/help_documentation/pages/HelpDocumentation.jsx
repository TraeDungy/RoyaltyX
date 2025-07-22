import { InfoCircleFill } from "react-bootstrap-icons";
import TopicsList from "../components/TopicsList";
import { Alert, AlertTitle, Typography } from "@mui/material";

const HelpDocumentation = () => {
  return (
    <div className="pb-5">
      <Typography variant="h2" sx={{ fontWeight: "bold", mt: 4 }}>
        Project Documentation
      </Typography>
      <div className="mt-4 mb-5">
        <Alert
          severity="info"
          variant="outlined"
          icon={<InfoCircleFill className="h5 mb-0" />}
        >
          <AlertTitle>Information</AlertTitle>
          This page contains short explanations of common features. Detailed
          guides are available in the repository README and accompanying
          markdown documents. As we make updates to the project we will keep
          this section up to date and provide support if project owners
          experience any issues.
        </Alert>
      </div>

      <TopicsList />
    </div>
  );
};

export default HelpDocumentation;
