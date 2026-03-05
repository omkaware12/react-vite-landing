// Simple localStorage-based store for dashboard data

export interface FuelEntry {
  id: number;
  fuelType: string;
  costPerUnit: number;
  unit: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export interface MedicineEntry {
  id: number;
  name: string;
  type: string;
  form: string;
  strength: number;
  unit: string;
  description: string;
}

export interface MachineEntry {
  id: number;
  name: string;
  fuelType: string;
  electricityType: string;
  motorConsumptionInHp: number;
  heaterConsumptionInKw: number;
  gasConsumptionInKgs: number;
  electricityUnitPerHour: number;
  electricityCostPerMachineHour: number;
  gasCostPerMachineHour: number;
  totalMachineCostPerHour: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface RawMaterialEntry {
  id: number;
  name: string;
  type: string;
  unit: string;
}

export interface RawMaterialTransaction {
  id: number;
  rawMaterialId: number;
  materialName: string;
  category: string;
  quantity: number;
  remainingQuantity: number;
  pricePerUnit: number;
  unit: string;
  supplier: string;
  type: "IN" | "OUT";
  referenceId?: string;
  date?: string;
  batchNumber?: string;
  createdBy?: string;
  createdAt: string;
}

export interface RawMaterialInventory {
  id: number;
  rawMaterialId: number;
  rawMaterialName: string;
  availableQuantity: number;
  lastUpdatedAt: string;
}

export interface MedicineMachine {
  id: number;
  medicineId: number;
  machineId: number;
  quantity: number;
  unit: "minutes" | "hours";
  convertedHours: number;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  position: string;
  isEnabled: boolean;
  lastLogin: string;
  createdAt: string;
  createdBy: string;
}

export interface ProcessStep {
  id: number;
  name: string;
  description: string;
  pricePerUnit: number;
  unit: "minute" | "hour";
}

export interface MedicineVersion {
  id: number;
  medicineId: number;
  versionName: string;
  steps: VersionStep[];
}

export interface VersionStep {
  medicineProcessStepId: number;
  stepOrder: number;
  repeatCount: number;
  quantity: number;
}

export interface BatchRawMaterial {
  rawMaterialId: number;
  rawMaterialName: string;
  requiredQuantity: number;
  consumedQuantity: number;
  pricePerUnit: number;
  totalCost: number;
}

export interface BatchMachine {
  machineId: number;
  machineName: string;
  timeUsed: number;
  costPerTimeUnit: number;
  totalCost: number;
}

export interface BatchProcessStep {
  processStepId: number;
  stepName: string;
  stepOrder: number;
  repeatCount: number;
  totalQuantity: number;
  pricePerUnit: number;
  totalCost: number;
  unit: "minute" | "hour";
}

export interface PackingDetail {
  packingId: string;
  numberOfPackages: number;
}

export type JobCardStepStatus = "PENDING" | "COMPLETED" | "FAILED";

export interface JobCardRawMaterial {
  rawMaterialId: number;
  rawMaterialName: string;
  quantityUsed: number;
  cost: number;
}

export interface JobCardMachine {
  machineId: number;
  machineName: string;
  timeUsed: number;
  cost: number;
}

export interface JobCardProcessStep {
  processStepId: number;
  stepName: string;
  stepOrder: number;
  timeRequired: number;
  cost: number;
  status: JobCardStepStatus;
  failureRemark?: string;
}

export interface JobCard {
  id: number;
  batchId: number;
  batchNumber: string;
  totalRawMaterialCost: number;
  totalMachineCost: number;
  totalProcessCost: number;
  grandTotalCost: number;
  createdAt: string;
  rawMaterials: JobCardRawMaterial[];
  machines: JobCardMachine[];
  processSteps: JobCardProcessStep[];
}

export interface BatchEntry {
  id: number;
  batchNumber: string;
  medicineId: number;
  medicineName: string;
  medicineDescription: string;
  versionId: number;
  versionName: string;
  quantity: number;
  unit: string;
  status: "In Progress" | "Success" | "Failed";
  rawMaterials: BatchRawMaterial[];
  machines: BatchMachine[];
  processSteps: BatchProcessStep[];
  totalMaterialCost: number;
  totalMachineCost: number;
  totalLabourCost: number;
  totalBatchCost: number;
  productionDate: string;
  createdAt: string;
  producedQuantity?: number;
  packingDetails?: PackingDetail[];
  remark?: string;
  completionDate?: string;
}

export interface MedicineRawMaterial {
  id: number;
  medicineId: number;
  rawMaterialId: number;
  quantity: number;
}

// Helper to get or init inventory for a raw material
function getOrCreateInventory(rawMaterialId: number, rawMaterialName: string): RawMaterialInventory {
  const items = getStore<RawMaterialInventory>("inventory");
  let inv = items.find((i) => i.rawMaterialId === rawMaterialId);
  if (!inv) {
    inv = { id: items.length + 1, rawMaterialId, rawMaterialName, availableQuantity: 0, lastUpdatedAt: new Date().toISOString() };
    items.push(inv);
    setStore("inventory", items);
  }
  return inv;
}

function updateInventoryQuantity(rawMaterialId: number, delta: number) {
  const items = getStore<RawMaterialInventory>("inventory");
  const idx = items.findIndex((i) => i.rawMaterialId === rawMaterialId);
  if (idx !== -1) {
    items[idx].availableQuantity += delta;
    items[idx].lastUpdatedAt = new Date().toISOString();
    setStore("inventory", items);
  }
}

function getStore<T>(key: string): T[] {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
}

function setStore<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data));
}

export const store = {
  getFuels: () => getStore<FuelEntry>("fuels"),
  addFuel: (f: Omit<FuelEntry, "id" | "createdAt" | "updatedAt" | "createdBy" | "updatedBy">) => {
    const items = getStore<FuelEntry>("fuels");
    const now = new Date().toISOString();
    items.push({ ...f, id: items.length + 1, createdAt: now, updatedAt: now, createdBy: "Admin", updatedBy: "Admin" });
    setStore("fuels", items);
  },
  updateFuel: (id: number, updates: Partial<FuelEntry>) => {
    const items = getStore<FuelEntry>("fuels");
    const idx = items.findIndex((f) => f.id === id);
    if (idx !== -1) {
      items[idx] = { ...items[idx], ...updates, updatedAt: new Date().toISOString(), updatedBy: "Admin" };
      setStore("fuels", items);
    }
  },
  deleteFuel: (id: number) => {
    const items = getStore<FuelEntry>("fuels").filter((f) => f.id !== id);
    setStore("fuels", items);
  },

  getMedicines: () => getStore<MedicineEntry>("medicines"),
  addMedicine: (m: Omit<MedicineEntry, "id">) => {
    const items = getStore<MedicineEntry>("medicines");
    items.push({ ...m, id: items.length + 1 });
    setStore("medicines", items);
  },
  updateMedicine: (id: number, updates: Partial<MedicineEntry>) => {
    const items = getStore<MedicineEntry>("medicines");
    const idx = items.findIndex((m) => m.id === id);
    if (idx !== -1) {
      items[idx] = { ...items[idx], ...updates };
      setStore("medicines", items);
    }
  },
  deleteMedicine: (id: number) => {
    const items = getStore<MedicineEntry>("medicines").filter((m) => m.id !== id);
    setStore("medicines", items);
  },

  getMachines: () => getStore<MachineEntry>("machines"),
  addMachine: (m: Omit<MachineEntry, "id" | "createdAt" | "updatedAt">) => {
    const items = getStore<MachineEntry>("machines");
    const now = new Date().toISOString();
    items.push({ ...m, id: items.length + 1, createdAt: now, updatedAt: now });
    setStore("machines", items);
  },
  updateMachine: (id: number, updates: Partial<MachineEntry>) => {
    const items = getStore<MachineEntry>("machines");
    const idx = items.findIndex((m) => m.id === id);
    if (idx !== -1) {
      items[idx] = { ...items[idx], ...updates, updatedAt: new Date().toISOString() };
      setStore("machines", items);
    }
  },
  deleteMachine: (id: number) => {
    const items = getStore<MachineEntry>("machines").filter((m) => m.id !== id);
    setStore("machines", items);
  },

  getRawMaterials: () => getStore<RawMaterialEntry>("rawmaterials"),
  addRawMaterial: (r: Omit<RawMaterialEntry, "id">) => {
    const items = getStore<RawMaterialEntry>("rawmaterials");
    items.push({ ...r, id: items.length + 1 });
    setStore("rawmaterials", items);
  },
  updateRawMaterial: (id: number, updates: Partial<RawMaterialEntry>) => {
    const items = getStore<RawMaterialEntry>("rawmaterials");
    const idx = items.findIndex((r) => r.id === id);
    if (idx !== -1) {
      items[idx] = { ...items[idx], ...updates };
      setStore("rawmaterials", items);
    }
  },
  deleteRawMaterial: (id: number) => {
    const items = getStore<RawMaterialEntry>("rawmaterials").filter((r) => r.id !== id);
    setStore("rawmaterials", items);
  },

  getTransactions: () => getStore<RawMaterialTransaction>("transactions"),
  addTransaction: (t: Omit<RawMaterialTransaction, "id">) => {
    // ensure inventory exists
    const rm = getStore<RawMaterialEntry>("rawmaterials").find((r) => r.id === t.rawMaterialId);
    const inv = getOrCreateInventory(t.rawMaterialId, t.materialName);
    const remaining = t.type === "IN" ? inv.availableQuantity + t.quantity : inv.availableQuantity - t.quantity;
    const items = getStore<RawMaterialTransaction>("transactions");
    items.push({ ...t, id: items.length + 1, remainingQuantity: remaining, createdAt: new Date().toISOString() });
    setStore("transactions", items);
    updateInventoryQuantity(t.rawMaterialId, t.type === "IN" ? t.quantity : -t.quantity);
  },

  getInventory: () => getStore<RawMaterialInventory>("inventory"),
  getInventoryByMaterial: (rawMaterialId: number) => {
    const items = getStore<RawMaterialInventory>("inventory");
    return items.find((i) => i.rawMaterialId === rawMaterialId) || null;
  },

  getProcessSteps: () => getStore<ProcessStep>("processsteps"),
  addProcessStep: (p: Omit<ProcessStep, "id">) => {
    const items = getStore<ProcessStep>("processsteps");
    items.push({ ...p, id: items.length + 1 });
    setStore("processsteps", items);
  },
  deleteProcessStep: (id: number) => {
    const items = getStore<ProcessStep>("processsteps").filter((p) => p.id !== id);
    setStore("processsteps", items);
  },

  getVersions: () => getStore<MedicineVersion>("medicineversions"),
  addVersion: (v: Omit<MedicineVersion, "id">) => {
    const items = getStore<MedicineVersion>("medicineversions");
    items.push({ ...v, id: items.length + 1 });
    setStore("medicineversions", items);
  },
  addStepToVersion: (versionId: number, step: VersionStep) => {
    const items = getStore<MedicineVersion>("medicineversions");
    const idx = items.findIndex((v) => v.id === versionId);
    if (idx !== -1) {
      items[idx].steps.push(step);
      setStore("medicineversions", items);
    }
  },

  getBatches: () => getStore<BatchEntry>("batches"),
  addBatch: (b: Omit<BatchEntry, "id">) => {
    const items = getStore<BatchEntry>("batches");
    const id = items.length + 1;
    items.push({ ...b, id });
    setStore("batches", items);
    return id;
  },
  updateBatch: (id: number, updates: Partial<BatchEntry>) => {
    const items = getStore<BatchEntry>("batches");
    const idx = items.findIndex((b) => b.id === id);
    if (idx !== -1) {
      items[idx] = { ...items[idx], ...updates };
      setStore("batches", items);
    }
  },

  getJobCards: () => getStore<JobCard>("jobcards"),
  addJobCard: (j: Omit<JobCard, "id">) => {
    const items = getStore<JobCard>("jobcards");
    const id = items.length + 1;
    items.push({ ...j, id });
    setStore("jobcards", items);
    return id;
  },
  updateJobCard: (id: number, updates: Partial<JobCard>) => {
    const items = getStore<JobCard>("jobcards");
    const idx = items.findIndex((j) => j.id === id);
    if (idx !== -1) {
      items[idx] = { ...items[idx], ...updates };
      setStore("jobcards", items);
    }
  },

  // Medicine-RawMaterial BOM
  getMedicineRawMaterials: () => getStore<MedicineRawMaterial>("medicinerawmaterials"),
  addMedicineRawMaterial: (m: Omit<MedicineRawMaterial, "id">) => {
    const items = getStore<MedicineRawMaterial>("medicinerawmaterials");
    const existing = items.findIndex((x) => x.medicineId === m.medicineId && x.rawMaterialId === m.rawMaterialId);
    if (existing !== -1) {
      items[existing].quantity = m.quantity;
    } else {
      items.push({ ...m, id: items.length + 1 });
    }
    setStore("medicinerawmaterials", items);
  },
  updateMedicineRawMaterial: (id: number, quantity: number) => {
    const items = getStore<MedicineRawMaterial>("medicinerawmaterials");
    const idx = items.findIndex((m) => m.id === id);
    if (idx !== -1) {
      items[idx].quantity = quantity;
      setStore("medicinerawmaterials", items);
    }
  },
  deleteMedicineRawMaterial: (id: number) => {
    const items = getStore<MedicineRawMaterial>("medicinerawmaterials").filter((m) => m.id !== id);
    setStore("medicinerawmaterials", items);
  },

  // Medicine-Machine assignments
  getMedicineMachines: () => getStore<MedicineMachine>("medicinemachines"),
  addMedicineMachine: (m: Omit<MedicineMachine, "id">) => {
    const items = getStore<MedicineMachine>("medicinemachines");
    const existing = items.findIndex((x) => x.medicineId === m.medicineId && x.machineId === m.machineId);
    if (existing !== -1) {
      items[existing] = { ...items[existing], ...m };
    } else {
      items.push({ ...m, id: items.length + 1 });
    }
    setStore("medicinemachines", items);
  },
  updateMedicineMachine: (id: number, updates: Partial<MedicineMachine>) => {
    const items = getStore<MedicineMachine>("medicinemachines");
    const idx = items.findIndex((m) => m.id === id);
    if (idx !== -1) {
      items[idx] = { ...items[idx], ...updates };
      setStore("medicinemachines", items);
    }
  },
  deleteMedicineMachine: (id: number) => {
    const items = getStore<MedicineMachine>("medicinemachines").filter((m) => m.id !== id);
    setStore("medicinemachines", items);
  },

  // User profile
  getUserProfile: (): UserProfile => {
    const stored = localStorage.getItem("userProfile");
    if (stored) return JSON.parse(stored);
    return {
      firstName: "Rohti",
      lastName: "Admin",
      email: "rohti@company.com",
      role: localStorage.getItem("userRole") || "admin",
      position: "Production Manager",
      isEnabled: true,
      lastLogin: new Date().toISOString(),
      createdAt: "2025-01-01T00:00:00.000Z",
      createdBy: "System",
    };
  },
};
