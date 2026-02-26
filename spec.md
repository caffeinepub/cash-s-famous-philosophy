# Specification

## Summary
**Goal:** Automatically retry failed quote fetches on mobile so transient network failures resolve without user intervention.

**Planned changes:**
- Update the `useGetQuotes` hook to retry failed requests at least 3 times using exponential backoff via React Query's retry configuration
- Update `QuotesPage.tsx` to keep showing the loading skeleton while retries are in progress, only displaying the error UI after all retry attempts are exhausted

**User-visible outcome:** On mobile, if quotes fail to load initially, the app silently retries in the background while showing a loading skeleton. The error screen only appears if all retries fail, eliminating most intermittent loading failures without any user action.
