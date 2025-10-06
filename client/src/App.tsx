import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import AdminLogin from "@/pages/admin-login";
import AdminDashboard from "@/pages/admin";
import IdFree from "@/pages/idfree";
import ModulesPage from "@/pages/modules";
import HuongDanLocket from "@/pages/huong-dan-locket";
import { RentalNotificationBanner } from "@/components/rental-notification-banner";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/idfree" component={IdFree} />
      <Route path="/modules" component={ModulesPage} />
      <Route path="/huong-dan-locket" component={HuongDanLocket} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin" component={AdminDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="dark">
          <RentalNotificationBanner />
          <Toaster />
          <Router />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
