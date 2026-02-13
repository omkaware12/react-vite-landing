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

// Form & List pages
import CreateFuel from "./pages/dashboard/fuel/CreateFuel";
import FuelList from "./pages/dashboard/fuel/FuelList";
import CreateMedicine from "./pages/dashboard/medicines/CreateMedicine";
import MedicineList from "./pages/dashboard/medicines/MedicineList";
import CreateMachine from "./pages/dashboard/machines/CreateMachine";
import MachineList from "./pages/dashboard/machines/MachineList";
import CreateRawMaterial from "./pages/dashboard/rawmaterial/CreateRawMaterial";
import BulkRawMaterial from "./pages/dashboard/rawmaterial/BulkRawMaterial";
import RawMaterialListAll from "./pages/dashboard/rawmaterial/RawMaterialListAll";
import TransactionSelectMaterial from "./pages/dashboard/rawmaterial/TransactionSelectMaterial";
import CreateProcessStep from "./pages/dashboard/process/CreateProcessStep";
import ProcessStepList from "./pages/dashboard/process/ProcessStepList";

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
            <Route path="fuel/add" element={<CreateFuel />} />
            <Route path="fuel/list" element={<FuelList />} />
            <Route path="medicines" element={<MedicinesPage />} />
            <Route path="medicines/add" element={<CreateMedicine />} />
            <Route path="medicines/list" element={<MedicineList />} />
            <Route path="machines" element={<MachinesPage />} />
            <Route path="machines/add" element={<CreateMachine />} />
            <Route path="machines/list" element={<MachineList />} />
            <Route path="rawmaterial" element={<RawMaterialPage />} />
            <Route path="rawmaterial/add" element={<CreateRawMaterial />} />
            <Route path="rawmaterial/bulk" element={<BulkRawMaterial />} />
            <Route path="rawmaterial/list" element={<RawMaterialListAll />} />
            <Route path="rawmaterial/transaction" element={<RawMaterialTransactionPage />} />
            <Route path="rawmaterial/transaction/select" element={<TransactionSelectMaterial />} />
            <Route path="rawmaterial/inventory" element={<RawMaterialInventoryPage />} />
            <Route path="add-rawmaterial-medicines" element={<AddRawMaterialMedicinesPage />} />
            <Route path="medicines-process" element={<ProcessStepsPage />} />
            <Route path="medicines-process/add" element={<CreateProcessStep />} />
            <Route path="medicines-process/list" element={<ProcessStepList />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
