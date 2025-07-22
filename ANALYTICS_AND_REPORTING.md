# Analytics & Reporting Guide

## Overview
RoyaltyX includes an analytics module that tracks performance across all
connected platforms and products. Results are visualized on the dashboard and
returned via the API for custom reports.

## Available Metrics

### total_impressions
Number of times your content has been viewed.

### total_impression_revenue
Estimated ad revenue calculated from impression counts and eCPM values.

### total_sales_count
Total number of product sales, including rentals and purchases.

### total_royalty_revenue
Revenue earned from sales transactions (royalties).

### rentals_count / rentals_revenue
Count and revenue of product rentals.

### purchases_count / purchases_revenue
Count and revenue of direct purchases.

### product_count
Number of active products. Included in project-level analytics.

### source_analytics
Per source statistics (e.g., YouTube, Twitch) with the above metrics for each
platform.

### time_stats
Metrics grouped by the selected granularity (`hourly`, `daily`, `monthly` or
`yearly`). Each entry includes impressions, impression revenue, sales, rentals
and royalty revenue for that period.

## Interpreting Results
- Compare impressions and sales to gauge conversion rates.
- Examine impression revenue versus royalty revenue to see which stream drives
  more income.
- Use time based charts to spot trends or seasonality in your business.
- Check the source analytics table to identify high performing platforms.

## Accessing Analytics

Project-level analytics:
```bash
GET /analytics/?period_start=YYYY-MM-DD&period_end=YYYY-MM-DD
```

Product-level analytics:
```bash
GET /analytics/<product_id>/?period_start=YYYY-MM-DD&period_end=YYYY-MM-DD
```

Date parameters are optional. When omitted, results cover the last year by
default.
