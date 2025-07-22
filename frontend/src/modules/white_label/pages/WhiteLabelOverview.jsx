import { Box, Typography, Button } from "@mui/material";
import PageHeader from "../../common/components/PageHeader";
import { Link } from "react-router-dom";

const WhiteLabelOverview = () => {
  return (
    <Box>
      <PageHeader
        title="White-Label Branding"
        description="Your brand, your domain, your glory. Offer RoyaltyX under your own banner."
        action={
          <Button component={Link} to="/white-label/cost-estimator" variant="contained" color="primary" size="small">
            Cost Estimator
          </Button>
        }
      />
      <Typography variant="h6" className="mt-4 mb-2">
        Big Flex
      </Typography>
      <Typography className="mb-4">
        Your clients don\'t need to know we exist. With this add-on, they won\'t. Put your name, your logo, and your magic touch front and center.
      </Typography>
      <Typography variant="h6" className="mb-2">
        Includes
      </Typography>
      <ul>
        <li>Custom domain & login screen</li>
        <li>Your logo, colors, and branding</li>
        <li>Resell or impress — your choice</li>
      </ul>
      <Typography variant="h6" className="mt-4 mb-2">
        Without It
      </Typography>
      <ul>
        <li>Clients see "RoyaltyX" and ask, "What\'s that?"</li>
        <li>You look like a middleman</li>
        <li>You lose out on brand equity</li>
      </ul>
      <Typography variant="h6" className="mt-4 mb-2">
        With It
      </Typography>
      <ul>
        <li>You look like the platform</li>
        <li>You resell at your price</li>
        <li>You build a tech empire without writing a line of code</li>
      </ul>
      <Typography variant="h5" className="mt-5 mb-3">
        $25/mo
      </Typography>
      <Typography>The cheapest agency launch ever.</Typography>
    </Box>
  );
};

export default WhiteLabelOverview;
