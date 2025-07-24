import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { LinkedAccountsSection } from "../components/LinkedAccountsSection";
import { useProducts } from "../../products/api/products";
import { ProductsList } from "../components/ProductsList";
import { useSources } from "../../sources/api/sources";
import { getProjectAnalytics } from "../../analytics/api/analytics";
import { SalesCard } from "../../analytics/components/SalesCard";
import { ImpressionsCard } from "../../analytics/components/ImpressionsCard";
import { RevenueCard } from "../../analytics/components/RevenueCard";
import { ClockCard } from "../../analytics/components/ClockCard";
import BannerCard from "../components/BannerCard";
import { fetchActiveBanner } from "../../admin_panel/api/banners";
import { useSettings } from "../../common/contexts/SettingsContext";
import { useLocation, useNavigate } from "react-router";
import { Grid } from "@mui/material";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";

function Dashboard() {
  const { products, loading } = useProducts();
  const { sources } = useSources();
  const [analytics, setAnalytics] = useState(null);
  const [banner, setBanner] = useState(null);
  const {
    showTotalImpressionsCard,
    showTotalSalesCard,
    showTotalRevenueCard,
    showClockCard,
    showBanner,
    dashboardAnalyticsOrder,
    setDashboardAnalyticsOrder,
  } = useSettings();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const start = params.get("period_start");
    const end = params.get("period_end");
    if (!start || !end) {
      let latest = null;
      if (Array.isArray(sources) && sources.length) {
        sources.forEach((s) => {
          if (s.last_fetched_at) {
            const d = new Date(s.last_fetched_at);
            if (!latest || d > latest) latest = d;
          }
        });
      }
      const endDate = latest || new Date();
      const startDate = new Date(endDate);
      startDate.setMonth(endDate.getMonth() - 1);
      params.set("period_start", startDate.toLocaleDateString("en-CA"));
      params.set("period_end", endDate.toLocaleDateString("en-CA"));
      navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sources]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const periodStart = params.get("period_start");
    const periodEnd = params.get("period_end");

    const period_range = {
      period_start: periodStart,
      period_end: periodEnd,
    };

    const fetchAnalytics = async () => {
      try {
        const fetchedAnalytics = await getProjectAnalytics(period_range);
        setAnalytics(fetchedAnalytics);
      } catch (error) {
        toast.error(error.message || "Failed to fetch analytics");
      }
    };

    const loadBanner = async () => {
      try {
        const b = await fetchActiveBanner();
        setBanner(b);
      } catch (e) {
        console.error(e);
      }
    };

    fetchAnalytics();
    loadBanner();
  }, [location.search]);

  const cardComponents = {
    impressions: showTotalImpressionsCard ? (
      <ImpressionsCard analytics={analytics} />
    ) : null,
    sales: showTotalSalesCard ? <SalesCard analytics={analytics} /> : null,
    revenue: showTotalRevenueCard ? <RevenueCard analytics={analytics} /> : null,
    clock: showClockCard ? <ClockCard /> : null,
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const newOrder = Array.from(dashboardAnalyticsOrder);
    const [removed] = newOrder.splice(result.source.index, 1);
    newOrder.splice(result.destination.index, 0, removed);
    setDashboardAnalyticsOrder(newOrder);
  };

  return (
    <>
      {showBanner && <BannerCard banner={banner} />}
      {analytics && (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="cards" direction="horizontal">
            {(provided) => (
              <Grid
                container
                spacing={3}
                className="mb-4"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {dashboardAnalyticsOrder.map((key, index) => {
                  const CardComponent = cardComponents[key];
                  if (!CardComponent) return null;
                  return (
                    <Draggable key={key} draggableId={key} index={index}>
                      {(providedDraggable) =>
                        React.cloneElement(CardComponent, {
                          innerRef: providedDraggable.innerRef,
                          draggableProps: providedDraggable.draggableProps,
                          dragHandleProps: providedDraggable.dragHandleProps,
                        })
                      }
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </Grid>
            )}
          </Droppable>
        </DragDropContext>
      )}
      
      <LinkedAccountsSection sources={sources} loading={loading} />
      <ProductsList products={products} loading={loading} />
    </>
  );
}

export default Dashboard;
