import { useState, useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useProducts } from "../../products/api/products";
import { compareProductsAnalytics } from "../api/analytics";
import {
  Autocomplete,
  TextField,
  Box,
  Typography,
  Grid,
  IconButton,
  Card,
  CardContent,
} from "@mui/material";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import GraphTypeSelector from "../components/GraphTypeSelector";
import { GraphColorPalette } from "../components/GraphColorPalette";
import { Palette, BarChart2 } from "lucide-react";
import GranularitySelector from "../../common/components/GranularitySelector";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
);

const COLORS = ["#6CC3E0", "#009efd", "#5E4DB2", "#4BCE97", "#E2B203", "#Ff0000"];

const CompareProducts = () => {
  const { products, loading } = useProducts();
  const [selected, setSelected] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [graphType, setGraphType] = useState("line");
  const [graphColor, setGraphColor] = useState("#009efd");
  const [showTypeSelector, setShowTypeSelector] = useState(false);
  const [showColorPalette, setShowColorPalette] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const granularity = params.get("granularity") || "monthly";

  useEffect(() => {
    if (selected.length === 0) {
      setAnalytics(null);
      return;
    }
    const fetchData = async () => {
      try {
        const data = await compareProductsAnalytics(selected.map((p) => p.id), {
          granularity,
        });
        setAnalytics(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [selected, location.search]);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  const chartLabels = analytics?.aggregate?.time_stats?.map((item) => item.period);
  const datasets = (analytics?.products || []).map((entry, idx) => {
    const dataValues = entry.analytics.time_stats.map((t) => t.sales);
    const color = COLORS[idx % COLORS.length];
    return {
      label: entry.product_title || `Product ${entry.product_id}`,
      data: dataValues,
      fill: true,
      backgroundColor: graphColor + "45",
      borderColor: color,
      tension: graphType === "sharp" ? 0 : 0.4,
    };
  });
  const ChartComponent = graphType === "bar" ? Bar : Line;

  const pieData = {
    labels: (analytics?.products || []).map((a) => a.product_title || a.product_id),
    datasets: [
      {
        data: (analytics?.products || []).map(
          (a) => a.analytics.total_royalty_revenue || 0,
        ),
        backgroundColor: COLORS,
      },
    ],
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h2" mb={3}>
        Compare Products
      </Typography>
      <Box sx={{ maxWidth: 400, mb: 3 }}>
        <Autocomplete
          multiple
          options={products || []}
          getOptionLabel={(option) => option.title}
          onChange={(e, val) => setSelected(val)}
          renderInput={(params) => <TextField {...params} label="Select products" />}
        />
      </Box>
      <GranularitySelector />
      {analytics && analytics.products && analytics.products.length > 0 && (
        <>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <IconButton onClick={() => setShowTypeSelector(true)} size="small">
              <BarChart2 size={16} />
            </IconButton>
            <IconButton onClick={() => setShowColorPalette(true)} size="small">
              <Palette size={16} />
            </IconButton>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card variant="outlined">
                <CardContent>
                  <ChartComponent
                    data={{ labels: chartLabels, datasets }}
                    options={{ responsive: true, plugins: { legend: { display: true } } }}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card variant="outlined">
                <CardContent>
                  <Pie data={pieData} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
      <GraphTypeSelector
        open={showTypeSelector}
        onClose={() => setShowTypeSelector(false)}
        onSelectType={(type) => {
          setGraphType(type);
          setShowTypeSelector(false);
        }}
      />
      <GraphColorPalette
        showGraphColorPalette={showColorPalette}
        setShowGraphColorPalette={setShowColorPalette}
        onSelectColor={(color) => {
          setGraphColor(color);
        }}
      />
    </Box>
  );
};

export default CompareProducts;
