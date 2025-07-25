# Multi-Product Analytics Comparison
See [Documentation Overview](DOCUMENTATION_OVERVIEW.md) for a list of all guides.

This guide describes how to design a dashboard that lets creators compare the performance of multiple products side by side. The goal is to surface insights quickly and help users make data-driven decisions across their catalog.

## Key Features
- **Product selection:** choose any combination of products to compare.
- **Unified metrics:** view impressions, sales, revenue, and eCPM for each product in the same table.
- **Interactive charts:** overlay product metrics in line or bar graphs for easy trend analysis.
- **Export options:** download comparative data as CSV or PDF for offline review.

## Backend Approach
1. **Aggregated endpoint** – Add a new API endpoint that accepts a list of product IDs and a date range. It should return per-product aggregates plus totals across the selection.
2. **Efficient queries** – Use Django ORM annotations or materialized views to compute metrics without heavy database load.
3. **Caching** – Cache popular comparison queries to keep the dashboard responsive.

## Frontend Implementation
1. **Comparison page** – Add a new page under the analytics module for multi-product comparison.
2. **Multi-select filter** – Provide a searchable dropdown to select multiple products.
3. **Comparison table** – Display key metrics for each product in a grid layout.
4. **Visualization** – Plot line or bar charts using your existing chart components to overlay product performance.

## User Flow
1. Navigate to `Analytics > Comparison`.
2. Select one or more products and optionally adjust the date range.
3. The dashboard updates with side-by-side metrics and graphs.
4. Export results if needed.

Implementing these steps will give users a clear and easy way to compare their products' performance, matching industry-leading analytics platforms.
