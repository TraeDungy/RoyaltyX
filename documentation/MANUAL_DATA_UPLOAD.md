# Manual Data Upload Workflow

This guide explains how to import sales and impression data into RoyaltyX using the manual uploader. Use this process when you receive monthly reports from platforms that aren't integrated through an API.

## Uploading Files
1. Go to `/sources/manual-import` in the web interface.
2. Drag and drop a CSV or Excel (`.xlsx` or `.xls`) file into the upload area.
3. The uploader creates a **File** and a **Dataset** record and starts processing automatically.

RoyaltyX attempts to detect the period from the filename or the first row's `Period Start` value. If detection fails you'll be prompted to provide the month and year after the upload completes.

## Required Columns
The processor recognises multiple header variants. At minimum include the following columns:

### Impressions
- `Title` (or `program_name`, `Title Name`)
- `impressions`
- `Period Start`
- `Period End`

### Sales / Rentals
- `Title`
- `Consumption Type`
- `Unit Price`
- `Unit Price Currency`
- `Quantity`
- `Is Refund`
- `Royalty Amount`
- `Royalty Currency`
- `Period Start`
- `Period End`

If a header uses a different name you can provide a mapping after the file finishes processing. The system stores this mapping as an **Import Template** so future files with the same headers are processed automatically.

## Reprocessing a Dataset
If processing fails due to missing columns, you can supply a JSON mapping to correct the header names. The dataset will reprocess using the new mapping and update the stored template.

## Analytics and Reports
Successful uploads create `ProductSale` and `ProductImpressions` records. Analytics pages and PDF reports aggregate these records on demand, so new data becomes visible as soon as processing completes.

