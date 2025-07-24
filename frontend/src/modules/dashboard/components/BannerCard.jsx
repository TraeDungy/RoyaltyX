import { Card, CardContent, Typography, Button } from "@mui/material";

export default function BannerCard({ banner }) {
  if (!banner) return null;
  return (
    <Card sx={{ position: "relative", mb: 3 }}>
      {banner.image_url && (
        <img src={banner.image_url} alt="" style={{ width: "100%", height: "auto" }} />
      )}
      {banner.video_url && (
        <video autoPlay loop muted style={{ width: "100%", height: "auto" }}>
          <source src={banner.video_url} />
        </video>
      )}
      <CardContent
        sx={{ position: banner.image_url || banner.video_url ? "absolute" : "static", top: 0, left: 0, color: "#fff" }}
      >
        <Typography variant="h5" gutterBottom>
          {banner.title}
        </Typography>
        <Typography variant="body1">{banner.message}</Typography>
        {banner.link_url && (
          <Button href={banner.link_url} variant="contained" sx={{ mt: 2 }}>
            Learn More
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
