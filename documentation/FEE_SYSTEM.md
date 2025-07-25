# Fee System Overview
See [Documentation Overview](DOCUMENTATION_OVERVIEW.md) for a list of all guides.


RoyaltyX supports a flexible fee system for charging producers and products. Fees are defined per project and can be grouped together for easier management.

## Fee Types

`FeeType` records the name and description of a fee. Examples include "Platform Fee" or "Distribution Fee".

## Fee Groups

`FeeGroup` represents a collection of fee rules. Projects can create multiple groups and assign them to products or producers. Groups help apply several related fees at once.

## Fee Rules

A `FeeRule` links a fee type to a project (and optionally a group) with the following options:

- **rate** – percentage rate to apply. Optional when using a fixed amount.
- **fixed_amount** – flat amount to deduct.
- **is_percent** – whether to treat `rate` as a percentage.
- **display_on_reports** – show the deduction as a separate line in reports when `True`.

Rules can belong to a fee group to apply a series of deductions together.

## Fee Adjustments

Whenever a fee is applied, a `FeeAdjustment` is stored referencing the rule and amount. Analytics and reports sum these adjustments to show the total deductions.

## Visibility in Reports

`FeeReportView` returns totals for all fees that have `display_on_reports=True`. Hidden fees are aggregated into a single "Hidden Fees" line so totals remain accurate without exposing details.

## Workflow

1. **Create fee types** via `/fees/types/`.
2. **Create fee groups** via `/fees/groups/`.
3. **Add fee rules** assigning each to a project and, optionally, a group.
4. When revenue events are processed, apply the active rules and record `FeeAdjustment` entries.
5. Reports and analytics read these adjustments to show deductions, respecting the visibility settings.
