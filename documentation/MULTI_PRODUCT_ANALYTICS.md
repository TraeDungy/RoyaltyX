# Multi-Product Analytics Comparison
See [Documentation Overview](DOCUMENTATION_OVERVIEW.md) for a list of all guides.

This guide describes how to design a dashboard that lets creators compare the performance of multiple products side by side. The goal is to surface insights quickly and help users make data-driven decisions across their catalog.

## Outline for Multi-Product Comparison
Below is a high‑level checklist for building a comparison feature that leverages the existing analytics infrastructure.

## Key Features
- **Product selection:** choose any combination of products to compare.
- **Unified metrics:** view impressions, sales, revenue, and eCPM for each product in the same table.
- **Interactive charts:** overlay product metrics in line or bar graphs for easy trend analysis.
- **Export options:** download comparative data as CSV or PDF for offline review.
- **Saved comparisons:** let users store their favorite product sets for quick access in the dashboard.

## Backend Approach
1. **Aggregated endpoint** – Introduce a new route such as `GET /analytics/?product_ids=1,2,3` that returns metrics for multiple products at once.
2. **Grouping by product** – Alternatively extend `calculate_analytics_by_dimension` so that clients can request `dimension=product` and reuse the existing aggregation logic.
3. **Reuse calculations** – Leverage `calculate_analytics` and `calculate_analytics_per_source` to aggregate impressions, revenue, and sales per product.
4. **Caching** – Cache popular comparison queries to keep the dashboard responsive.

## Frontend Implementation
1. **Comparison page** – Add a dedicated view in the analytics module for multi-product comparison.
2. **Multi-select filter** – Provide a searchable dropdown that lets the user pick two or more products from the existing list.
3. **Fetching data** – Call the new API route and store the results in component state.
4. **Comparison table** – Display key metrics for each product in a grid layout with one column per product.
5. **Visualization** – Overlay product metrics using existing chart components such as `ImpressionsChart` or `SalesOverTime`.

## User Experience
1. Navigate to `Analytics > Comparison`.
2. Pick a preset time range (e.g., last 7 days) and select two or more products.
3. The dashboard updates with side-by-side metrics and graphs.
4. Users can export the data as CSV using the existing export process.
5. Save favorite comparisons in `DashboardPreference` so they can be quickly recalled later.

Implementing these steps will give users a clear and easy way to compare their products' performance, matching industry-leading analytics platforms.
