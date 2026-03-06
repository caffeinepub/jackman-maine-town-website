import { RouterProvider, createRouter, createRootRoute, createRoute, Outlet } from '@tanstack/react-router';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import EventsPage from './pages/EventsPage';
import RecreationPage from './pages/RecreationPage';
import ContactPage from './pages/ContactPage';
import ReportProblemPage from './pages/ReportProblemPage';
import LocalBusinessesPage from './pages/LocalBusinessesPage';
import TownOfficeDashboardPage from './pages/TownOfficeDashboardPage';

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

const rootRoute = createRootRoute({ component: Layout });

const indexRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component: HomePage });
const aboutRoute = createRoute({ getParentRoute: () => rootRoute, path: '/about', component: AboutPage });
const servicesRoute = createRoute({ getParentRoute: () => rootRoute, path: '/services', component: ServicesPage });
const eventsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/events', component: EventsPage });
const recreationRoute = createRoute({ getParentRoute: () => rootRoute, path: '/recreation', component: RecreationPage });
const contactRoute = createRoute({ getParentRoute: () => rootRoute, path: '/contact', component: ContactPage });
const reportProblemRoute = createRoute({ getParentRoute: () => rootRoute, path: '/report-problem', component: ReportProblemPage });
const localBusinessesRoute = createRoute({ getParentRoute: () => rootRoute, path: '/local-businesses', component: LocalBusinessesPage });
const townOfficeDashboardRoute = createRoute({ getParentRoute: () => rootRoute, path: '/town-office/reports', component: TownOfficeDashboardPage });

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  servicesRoute,
  eventsRoute,
  recreationRoute,
  contactRoute,
  reportProblemRoute,
  localBusinessesRoute,
  townOfficeDashboardRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
