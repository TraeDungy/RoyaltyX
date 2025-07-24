import { useState } from "react";
import { Box, Button, Stepper, Step, StepLabel, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AddSourceModal } from "../../sources/components/AddSourceModal";
import { useSources } from "../../sources/api/sources";

export default function Onboarding() {
  const [activeStep, setActiveStep] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const { createSource } = useSources();
  const navigate = useNavigate();

  const steps = ["Choose a plan", "Connect your first source", "Explore analytics"];

  const handleNext = () => setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  const handleBack = () => setActiveStep((prev) => Math.max(prev - 1, 0));

  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 4 }}>
        Get Started
      </Typography>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <Box>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Choose a plan
          </Typography>
          <Typography sx={{ mb: 3 }}>
            Pick the subscription that fits your needs to unlock all features.
          </Typography>
          <Button variant="contained" onClick={() => navigate("/account/membership")}>View Plans</Button>
        </Box>
      )}

      {activeStep === 1 && (
        <Box>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Connect your first source
          </Typography>
          <Typography sx={{ mb: 3 }}>
            Link a platform like YouTube or TikTok to start gathering data.
          </Typography>
          <Button variant="contained" onClick={() => setModalOpen(true)}>Add Source</Button>
          <AddSourceModal open={modalOpen} onClose={() => setModalOpen(false)} createSource={createSource} />
        </Box>
      )}

      {activeStep === 2 && (
        <Box>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Explore analytics
          </Typography>
          <Typography sx={{ mb: 3 }}>
            Dive into your metrics to learn how your content is performing.
          </Typography>
          <Button variant="contained" onClick={() => navigate("/analytics")}>Open Analytics</Button>
        </Box>
      )}

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Button onClick={handleBack} disabled={activeStep === 0}>Back</Button>
        {activeStep === steps.length - 1 ? (
          <Button variant="contained" onClick={() => navigate("/")}>Finish</Button>
        ) : (
          <Button variant="contained" onClick={handleNext}>Next</Button>
        )}
      </Box>
    </Box>
  );
}
