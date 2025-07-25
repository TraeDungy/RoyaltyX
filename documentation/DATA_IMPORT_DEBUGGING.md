# Data Import Debugging
See [Documentation Overview](DOCUMENTATION_OVERVIEW.md) for a list of all guides.

This guide explains how to troubleshoot issues with manual file imports.

## Logging

The data import utilities log unexpected exceptions instead of silently
ignoring them. When a report fails to process or a date cannot be parsed,
check the backend logs for messages like:

```
ISO date parse failed for '2024/13/01': ValueError: month must be in 1..12
Failed to derive date from report: IndexError('list index out of range')
```

Enable debug logging in development by setting:

```bash
export DJANGO_LOG_LEVEL=DEBUG
```

Logs can then be viewed in the console or your configured log handler.

## Common Problems

- **Malformed dates** – Ensure columns like `Period Start` use a supported
  format (e.g. `YYYY-MM-DD` or `MM/DD/YYYY`).
- **Missing headers** – If the upload fails, compare your file against the
  required column list in [Manual Data Upload](MANUAL_DATA_UPLOAD.md).

If a dataset enters the `error` state with a message like `Missing columns:`,
compare your file's headers against the lists in the upload guide. Provide a
`column_mapping` via the dataset API to map your headers to the required
canonical names.

If issues persist, check the logs for stack traces or other error messages to
pinpoint where parsing failed.

