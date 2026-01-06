# Admin Dashboard Setup & Requirements

## Project Overview
Building a separate admin-side dashboard for this project while maintaining the existing user-side dashboard.

## Key Principles
1. **Complete Separation**: Admin and user files/components are completely separate - NO conflicts
2. **No User Side Changes**: User dashboard remains untouched unless explicitly instructed
3. **Reference Only**: User side elements are used as reference for design/patterns only
4. **Security & Auth**: Separate components and authentication for admin vs user for security
5. **Development Isolation**: Admin and user dev servers run independently

## Development Commands

### Admin Side
```
npm run admin-dev
```
Runs admin dashboard on localhost (separate port or dedicated dev setup)

### User Side
```
npm run user-dev
```
Runs user dashboard on localhost:3000 (current setup)

## File Structure Strategy

### Current User Side Structure
- `/app/(protected)/` - Protected user routes
- `/app/(auth)/` - User auth routes
- `/src/components/` - User components
- `/src/admin/` - Already exists (for admin reference)

### New Admin Side Structure (To be created)
- `/app/(admin)/` - Already exists, will be used for admin routes
- `/src/admin/components/` - Admin-specific components (separate from user)
- `/src/admin/utils/` - Admin utilities
- `/src/admin/hooks/` - Admin custom hooks
- `/src/admin/context/` - Admin auth/context (separate)

## Important Notes
- Admin authentication is completely separate from user authentication
- Admin components do NOT share with user components
- Admin routes are protected differently than user routes
- Use user dashboard as visual/UX reference only - don't copy code into user files
- Any future changes will be explicitly requested and approved before implementation

## Current Status
- User dashboard: Active and running on localhost:3000
- Admin dashboard: To be built with complete separation
