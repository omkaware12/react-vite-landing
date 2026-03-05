import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import RoleLogin from "./pages/RoleLogin";
import ForgotPassword from "./pages/ForgotPassword";
import OtpVerification from "./pages/OtpVerification";
import ResetPassword from "./pages/ResetPassword";
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
import FuelDetail from "./pages/dashboard/fuel/FuelDetail";
import UpdateFuel from "./pages/dashboard/fuel/UpdateFuel";
import CreateMedicine from "./pages/dashboard/medicines/CreateMedicine";
import MedicineList from "./pages/dashboard/medicines/MedicineList";
import MedicineDetail from "./pages/dashboard/medicines/MedicineDetail";
import UpdateMedicine from "./pages/dashboard/medicines/UpdateMedicine";
import CreateMachine from "./pages/dashboard/machines/CreateMachine";
import MachineList from "./pages/dashboard/machines/MachineList";
import MachineDetail from "./pages/dashboard/machines/MachineDetail";
import UpdateMachine from "./pages/dashboard/machines/UpdateMachine";
import CreateRawMaterial from "./pages/dashboard/rawmaterial/CreateRawMaterial";
import BulkRawMaterial from "./pages/dashboard/rawmaterial/BulkRawMaterial";
import RawMaterialListAll from "./pages/dashboard/rawmaterial/RawMaterialListAll";
import RawMaterialDetail from "./pages/dashboard/rawmaterial/RawMaterialDetail";
import UpdateRawMaterial from "./pages/dashboard/rawmaterial/UpdateRawMaterial";
import TransactionSelectMaterial from "./pages/dashboard/rawmaterial/TransactionSelectMaterial";
import TransactionListAll from "./pages/dashboard/rawmaterial/TransactionListAll";
import CreateProcessStep from "./pages/dashboard/process/CreateProcessStep";
import ProcessStepList from "./pages/dashboard/process/ProcessStepList";
import ProcessStepDetail from "./pages/dashboard/process/ProcessStepDetail";
import BatchesPage from "./pages/dashboard/BatchesPage";
import CreateBatch from "./pages/dashboard/batches/CreateBatch";
import PreviewBatch from "./pages/dashboard/batches/PreviewBatch";
import BatchList from "./pages/dashboard/batches/BatchList";
import BatchDetail from "./pages/dashboard/batches/BatchDetail";
import EndBatch from "./pages/dashboard/batches/EndBatch";
import EndBatchPreview from "./pages/dashboard/batches/EndBatchPreview";
import MedicineVersions from "./pages/dashboard/medicines/MedicineVersions";
import VersionSteps from "./pages/dashboard/medicines/VersionSteps";
import MedicineMachines from "./pages/dashboard/medicines/MedicineMachines";
import JobCardDetail from "./pages/dashboard/batches/JobCardDetail";
import CreateTransaction from "./pages/dashboard/rawmaterial/CreateTransaction";
import ProfilePage from "./pages/dashboard/ProfilePage";

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
          <Route path="/role-login/:role" element={<RoleLogin />} />
          <Route path="/forgot-password/:role" element={<ForgotPassword />} />
          <Route path="/otp/:role" element={<OtpVerification />} />
          <Route path="/reset-password/:role" element={<ResetPassword />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="fuel" element={<FuelPage />} />
            <Route path="fuel/add" element={<CreateFuel />} />
            <Route path="fuel/list" element={<FuelList />} />
            <Route path="fuel/:fuelId" element={<FuelDetail />} />
            <Route path="fuel/:fuelId/edit" element={<UpdateFuel />} />
            <Route path="medicines" element={<MedicinesPage />} />
            <Route path="medicines/add" element={<CreateMedicine />} />
            <Route path="medicines/list" element={<MedicineList />} />
            <Route path="medicines/:medicineId" element={<MedicineDetail />} />
            <Route path="medicines/:medicineId/edit" element={<UpdateMedicine />} />
            <Route path="medicines/:medicineId/versions" element={<MedicineVersions />} />
            <Route path="medicines/:medicineId/versions/:versionId/steps" element={<VersionSteps />} />
            <Route path="medicines/:medicineId/machines" element={<MedicineMachines />} />
            <Route path="medicines/:medicineId/versions/:versionId/steps" element={<VersionSteps />} />
            <Route path="machines" element={<MachinesPage />} />
            <Route path="machines/add" element={<CreateMachine />} />
            <Route path="machines/list" element={<MachineList />} />
            <Route path="machines/:machineId" element={<MachineDetail />} />
            <Route path="machines/:machineId/edit" element={<UpdateMachine />} />
            <Route path="rawmaterial" element={<RawMaterialPage />} />
            <Route path="rawmaterial/add" element={<CreateRawMaterial />} />
            <Route path="rawmaterial/bulk" element={<BulkRawMaterial />} />
            <Route path="rawmaterial/list" element={<RawMaterialListAll />} />
            <Route path="rawmaterial/:materialId" element={<RawMaterialDetail />} />
            <Route path="rawmaterial/:materialId/edit" element={<UpdateRawMaterial />} />
            <Route path="rawmaterial/transaction" element={<RawMaterialTransactionPage />} />
            <Route path="rawmaterial/transaction/create" element={<CreateTransaction />} />
            <Route path="rawmaterial/transaction/select" element={<TransactionSelectMaterial />} />
            <Route path="rawmaterial/transaction/list" element={<TransactionListAll />} />
            <Route path="rawmaterial/inventory" element={<RawMaterialInventoryPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="rawmaterial/inventory" element={<RawMaterialInventoryPage />} />
            <Route path="add-rawmaterial-medicines" element={<AddRawMaterialMedicinesPage />} />
            <Route path="medicines-process" element={<ProcessStepsPage />} />
            <Route path="medicines-process/add" element={<CreateProcessStep />} />
            <Route path="medicines-process/list" element={<ProcessStepList />} />
            <Route path="medicines-process/:stepId" element={<ProcessStepDetail />} />
            <Route path="batches" element={<BatchesPage />} />
            <Route path="batches/add" element={<CreateBatch />} />
            <Route path="batches/preview" element={<PreviewBatch />} />
            <Route path="batches/list" element={<BatchList />} />
            <Route path="batches/:batchId" element={<BatchDetail />} />
            <Route path="batches/:batchId/end" element={<EndBatch />} />
            <Route path="batches/:batchId/end/preview" element={<EndBatchPreview />} />
            <Route path="batches/:batchId/jobcard" element={<JobCardDetail />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
