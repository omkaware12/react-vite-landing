import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import DashboardLayout from "./components/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import FuelPage from "./pages/dashboard/FuelPage";
import MedicinesPage from "./pages/dashboard/MedicinesPage";
import MachinesPage from "./pages/dashboard/MachinesPage";
import RawMaterialPage from "./pages/dashboard/RawMaterialPage";
import RawMaterialTransactionPage from "./pages/dashboard/RawMaterialTransactionPage";
import RawMaterialInventoryPage from "./pages/dashboard/RawMaterialInventoryPage";
import AddRawMaterialMedicinesPage from "./pages/dashboard/AddRawMaterialMedicinesPage";
import ProcessStepsPage from "./pages/dashboard/ProcessStepsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="fuel" element={<FuelPage />} />
            <Route path="medicines" element={<MedicinesPage />} />
            <Route path="machines" element={<MachinesPage />} />
            <Route path="rawmaterial" element={<RawMaterialPage />} />
            <Route path="rawmaterial/transaction" element={<RawMaterialTransactionPage />} />
            <Route path="rawmaterial/inventory" element={<RawMaterialInventoryPage />} />
            <Route path="add-rawmaterial-medicines" element={<AddRawMaterialMedicinesPage />} />
            <Route path="medicines-process" element={<ProcessStepsPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
