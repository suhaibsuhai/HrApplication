# HR SaaS Enterprise Starter

A scalable React + Vite starter structure for an HR SaaS application.

This setup is intentionally built as an enterprise-style foundation. The modules are scaffolded for future development, but they are isolated so you can grow each business area independently later.

---

## How to Run

```bash
npm install
npm run dev
```

Open the local URL shown in your terminal, usually:

```txt
http://localhost:5173
```

Production build:

```bash
npm run build
npm run preview
```


## Current Layout Behavior

The shell is designed so the application chrome stays stable while users work inside modules:

```txt
Fixed Header
├── Logo / Product Name
├── Current Module
└── Search / Notifications / Theme / Settings / Admin

Fixed Body Area
├── Sidebar Navigation
│   └── Hamburger toggle at the top-right of the sidebar
└── Scrollable Main Content
```

Important implementation details:

- `body` and `#root` are locked to full viewport height.
- `.app-shell` uses `height: 100vh` and `overflow: hidden`.
- `.app-header` has a fixed height and never scrolls.
- `.sidebar` fills the remaining viewport height and does not scroll with page content.
- `.main-content` is the only primary scroll container with `overflow-y: auto`.

This is a common enterprise SaaS shell pattern because navigation and global actions stay visible while each module controls its own content area.

---

## Application Structure

```txt
src/
├── app/
│   ├── App.jsx
│   └── providers/
│       └── ThemeProvider.jsx
│
├── assets/
│
├── config/
│   └── navigation.config.js
│
├── hooks/
│
├── layouts/
│   └── MainLayout.jsx
│
├── modules/
│   ├── dashboard/
│   │   └── DashboardModule.jsx
│   ├── employees/
│   │   └── EmployeesModule.jsx
│   ├── payroll/
│   │   └── PayrollModule.jsx
│   ├── recruitment/
│   │   └── RecruitmentModule.jsx
│   └── performance/
│       └── PerformanceModule.jsx
│
├── services/
│
├── shared/
│   ├── components/
│   └── navigation/
│       ├── Header.jsx
│       └── Sidebar.jsx
│
├── store/
│
├── styles/
│   └── global.css
│
├── utils/
│
└── main.jsx
```

---

## Architecture Pattern

This project uses a **modular enterprise frontend architecture**.

The application is separated into clear layers:

### 1. App Layer

Location:

```txt
src/app/
```

Purpose:

- Owns the root application setup.
- Registers global providers.
- Controls active module state.
- Connects layout, navigation, and modules.

Current files:

```txt
App.jsx
providers/ThemeProvider.jsx
```

---

### 2. Layout Layer

Location:

```txt
src/layouts/
```

Purpose:

- Defines reusable page shells.
- Keeps layout separate from business logic.
- Current layout uses:
  - fixed full-width top header containing the HR logo and product title
  - fixed left navigation sidebar with the hamburger toggle in the sidebar top-right corner
  - scrollable main content area only

Current file:

```txt
MainLayout.jsx
```

---

### 3. Module Layer

Location:

```txt
src/modules/
```

Purpose:

Each business domain gets its own module folder.

Examples:

```txt
dashboard
employees
payroll
recruitment
performance
```

This pattern allows every module to grow independently later with its own:

```txt
components/
pages/
services/
hooks/
constants/
utils/
types/
```

Recommended future example:

```txt
src/modules/employees/
├── components/
├── pages/
├── services/
├── hooks/
├── constants/
└── EmployeesModule.jsx
```

---

### 4. Shared Layer

Location:

```txt
src/shared/
```

Purpose:

For reusable UI and cross-module components.

Examples:

```txt
shared/navigation/Header.jsx
shared/navigation/Sidebar.jsx
shared/components/Button.jsx
shared/components/Modal.jsx
shared/components/DataTable.jsx
```

Rule:

Only put something in `shared` when more than one module needs it.

---

### 5. Config Layer

Location:

```txt
src/config/
```

Purpose:

Keeps application configuration separate from UI components.

Current example:

```txt
navigation.config.js
```

The sidebar is config-driven. To add a future module, update this file and register the component in `App.jsx`.

---

### 6. Services Layer

Location:

```txt
src/services/
```

Purpose:

For API clients and infrastructure-level services.

Future examples:

```txt
apiClient.js
authService.js
storageService.js
notificationService.js
```

---

### 7. Store Layer

Location:

```txt
src/store/
```

Purpose:

For global state management when the application grows.

Recommended future tools:

- Zustand for lightweight SaaS apps
- Redux Toolkit for large enterprise workflows
- React Query for server state

---

### 8. Hooks Layer

Location:

```txt
src/hooks/
```

Purpose:

For reusable application-level React hooks.

Examples:

```txt
useDebounce.js
usePermissions.js
usePagination.js
useCurrentUser.js
```

Module-specific hooks should stay inside their own module folder.

---

### 9. Utils Layer

Location:

```txt
src/utils/
```

Purpose:

For pure helper functions.

Examples:

```txt
formatDate.js
formatCurrency.js
validateEmail.js
```

---

## Current Layout Behavior

The current UI includes:

- Full-width header from left to right.
- Hamburger button in the header.
- Sidebar collapse/expand behavior.
- Settings moved from sidebar to header.
- Dark/light theme toggle in header.
- Config-driven sidebar navigation.
- Isolated module placeholders.

---

## Theme System

Theme is handled globally through:

```txt
src/app/providers/ThemeProvider.jsx
```

The selected theme is saved in localStorage.

CSS variables are defined in:

```txt
src/styles/global.css
```

This allows scalable dark/light mode support without rewriting component styles.

---

## Adding a New Module

Example: Add an Attendance module.

### 1. Create the module folder

```txt
src/modules/attendance/AttendanceModule.jsx
```

### 2. Add a component

```jsx
export default function AttendanceModule() {
  return <h2>Attendance</h2>;
}
```

### 3. Register it in navigation

Update:

```txt
src/config/navigation.config.js
```

### 4. Register it in App.jsx

```jsx
import AttendanceModule from '../modules/attendance/AttendanceModule.jsx';

const moduleRegistry = {
  attendance: AttendanceModule,
};
```

---

## Recommended Future Enhancements

For real enterprise development, add these later:

- React Router for real URL-based routing
- Authentication and protected routes
- Role-based access control
- API client layer
- React Query for server data
- Form library such as React Hook Form
- Table/data-grid component
- Toast notification system
- Error boundary
- Loading states and skeleton UI
- Unit tests
- ESLint and Prettier

---

## Design Principle

This starter follows this principle:

```txt
Keep the core app stable.
Let modules grow independently.
Keep shared code reusable.
Keep configuration separate from UI.
```

This makes the application easier to maintain as it grows into a full SaaS product.
