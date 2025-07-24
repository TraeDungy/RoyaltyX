import { useState, useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
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
  Select,
  MenuItem,
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
  const [analytics, setAnalytics] = useState([]);
  const [aggregate, setAggregate] = useState(null);
  const [granularity, setGranularity] = useState("monthly");
  const [graphType, setGraphType] = useState("line");
  const [graphColor, setGraphColor] = useState("#009efd");
  const [showTypeSelector, setShowTypeSelector] = useState(false);
  const [showColorPalette, setShowColorPalette] = useState(false);

  useEffect(() => {
    if (selected.length === 0) {
      setAnalytics([]);
      return;
    }
    const fetchData = async () => {
      try {
        const data = await compareProductsAnalytics(selected.map((p) => p.id), {
          granularity,
        });
        setAnalytics(data.products || []);
        setAggregate(data.aggregate || null);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [selected, granularity]);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  const chartLabels =
    aggregate?.time_stats?.map((item) => item.period) ||
    analytics[0]?.analytics?.time_stats?.map((item) => item.period);
  const productDatasets = analytics.map((entry, idx) => {
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
  const aggregateDataset =
    aggregate && aggregate.time_stats
      ? [
          {
            label: "Combined",
            data: aggregate.time_stats.map((t) => t.sales),
            fill: true,
            backgroundColor: graphColor + "45",
            borderColor: "#000000",
            tension: graphType === "sharp" ? 0 : 0.4,
          },
        ]
      : [];
  const datasets = [...productDatasets, ...aggregateDataset];
  const ChartComponent = graphType === "bar" ? Bar : Line;

  const pieData = {
    labels: analytics.map((a) => a.product_title || a.product_id),
    datasets: [
      {
        data: analytics.map((a) => a.analytics.total_royalty_revenue || 0),
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
        <Box sx={{ mt: 2 }}>
          <Select
            size="small"
            value={granularity}
            onChange={(e) => setGranularity(e.target.value)}
          >
            <MenuItem value="hourly">Hourly</MenuItem>
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="yearly">Yearly</MenuItem>
          </Select>
        </Box>
      </Box>
      {analytics.length > 0 && (
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
