# Specification

## Summary
**Goal:** Add a Town Office Staff Dashboard page where authenticated admin/staff users can view and manage all submitted problem reports.

**Planned changes:**
- Create a new `TownOfficeDashboardPage` at `frontend/src/pages/TownOfficeDashboardPage.tsx` that fetches and displays all problem reports using the existing `useGetProblemReports` hook, showing problem type, location, description, reporter name, contact info, and submission date on each card, with a delete button for admins
- Non-admin or unauthenticated users see a restricted-access message instead of the reports
- Page is styled consistently with the Northern Maine wilderness theme (forest greens, slate grays, amber accents)
- Register the new page as a route at `/town-office/reports` in `frontend/src/App.tsx`
- Add a "Town Office Dashboard" link to the desktop and mobile navigation menus in `Navigation.tsx` and to the quick links in `Footer.tsx`

**User-visible outcome:** Admin/staff users can navigate to `/town-office/reports` to see all submitted problem reports and delete individual ones; non-admins see a restricted-access message.
