# Help Chat
See [Documentation Overview](DOCUMENTATION_OVERVIEW.md) for a list of all guides.

RoyaltyX provides a small support chat backed by OpenAI. Set the `OPENAI_API_KEY` environment variable in `.env` to enable it.

Send authenticated POST requests to `/support/help/chat/` with a JSON body containing `question`. The API returns the assistant reply and a `thread_id` for follow‑up messages.

