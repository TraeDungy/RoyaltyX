import { InfoCircleFill } from "react-bootstrap-icons";
import TopicsList from "../components/TopicsList";
import { Alert, AlertTitle, Typography } from "@mui/material";
import HelpCard from "../components/HelpCard";

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

      <div className="mb-4">
        <HelpCard title="1. Create Your First Project" defaultOpen>
          <p>
            Navigate to the <strong>Projects</strong> section from the sidebar
            and click <em>New Project</em>. Fill in the basic details to start
            organizing your content.
          </p>
        </HelpCard>
        <HelpCard title="2. Upload Revenue Data">
          <p>
            Visit <code>/sources/manual-import</code> to drag and drop your
            revenue files in CSV format. Proper column names ensure accurate
            statistics.
          </p>
        </HelpCard>
        <HelpCard title="3. Invite Team Members">
          <p>
            Go to <code>/admin/users</code> and invite collaborators. Assign
            them to the products they produce so they only see relevant data.
          </p>
        </HelpCard>
        <HelpCard title="4. Explore Detailed Topics">
          <p>
            The list below links to more documentation. Click any topic to open
            or collapse its instructions so the page stays uncluttered.
          </p>
        </HelpCard>
      </div>

      <TopicsList />
    </div>
  );
};

export default HelpDocumentation;
