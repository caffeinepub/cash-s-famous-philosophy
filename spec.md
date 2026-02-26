# Specification

## Summary
**Goal:** Fix the backend so all quotes persist correctly after deployment by ensuring they are properly hardcoded in `backend/main.mo`.

**Planned changes:**
- Audit `backend/main.mo` and ensure the `getQuotes` query contains all quotes: the original quotes plus "If teachers teach, why don't doctors doct?", "If time flies, where does it land?", and "If you wait faster, are you technically arriving sooner?"
- Remove any duplicate or conflicting quote list definitions in the backend actor that could cause older versions to override the latest list during deployment

**User-visible outcome:** After deployment, all quotes (including the three recently added ones) are visible and none disappear.
