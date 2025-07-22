# Invoice Management Overview

This document outlines the invoice management features added to **RoyaltyX**.

## Invoice Management Components
- **Rule-based Generation**: Invoices can be generated automatically based on configured rules.
- **Fees and Royalties**: All applicable fees and royalties are included in invoice totals.
- **Multi-currency Support**: Invoices store currency codes, enabling billing in different currencies.
- **Tax Calculations**: Tax is calculated per invoice and reflected in the total amount.
- **Payment Instructions**: Each invoice records the chosen payment method so customers know how to pay.

## Invoice Dashboard
- **Overview and Listing**: Users can view a list of their invoices with statuses.
- **Generation Controls**: Admins can create invoices manually from the dashboard.
- **Status Monitoring**: Track when invoices are sent or paid.
- **Payment Tracking**: Payment method information is stored with each invoice.
- **Bulk Operations**: Future enhancements will allow batch processing of invoices.

## Invoice Template
- **Layout and Design**: Invoice PDF layout can be customised through templates.
- **Dynamic Fields**: Items, fees and totals are populated dynamically.
- **Preview Mode**: Users can preview an invoice before sending.
- **Export Options**: Invoices can be exported as PDF.
- **Custom Styling**: Templates can be extended with custom stylesheets.

## Invoice Generation Control
- **Manual Generation**: Invoices can be created manually through the API.
- **Rule Configuration**: Admins manage `InvoiceRule` objects that define percentages and currencies.
- **Batch Processing**: The system is compatible with Celery tasks for future batch invoice jobs.
- **Preview Capabilities**: API responses include calculated totals so clients can preview before finalising.
- **Error Handling**: Serializer validation ensures invalid invoices are rejected.

