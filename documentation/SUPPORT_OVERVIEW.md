# Support System Overview

RoyaltyX includes a built‑in support ticket workflow and an AI‑powered help chat to assist users. This document summarizes the available features and REST endpoints.

## Support Tickets

Authenticated users can open support tickets to contact the team. Each ticket stores a conversation thread.

### Customer Endpoints

- `GET  /support/tickets/` – list the user's tickets
- `POST /support/tickets/` – create a new ticket
- `GET  /support/tickets/{id}/` – retrieve or update a ticket
- `POST /support/tickets/{id}/messages/` – add a message to the ticket
- `GET  /support/stats/` – summary counts for the logged‑in user

### Admin Endpoints

- `GET  /support/admin/tickets/` – list all tickets
- `GET  /support/admin/tickets/{id}/` – retrieve or update any ticket
- `POST /support/admin/tickets/{id}/assign/` – assign a ticket to a staff member
- `POST /support/admin/tickets/{id}/take/` – self‑assign the ticket
- `GET  /support/admin/stats/` – dashboard statistics

## Help Chat

The endpoint `POST /support/help/chat/` provides a lightweight OpenAI chat interface. Messages are stored in persistent threads so users and staff can continue a conversation over time.

Include `OPENAI_API_KEY` in your environment for this feature.


