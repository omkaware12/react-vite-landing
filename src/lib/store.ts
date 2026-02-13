// Simple localStorage-based store for dashboard data

export interface FuelEntry {
  id: number;
  fuelType: string;
  costPerUnit: number;
  unit: string;
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
  gasConsumption: number;
}

export interface RawMaterialEntry {
  id: number;
  name: string;
  type: string;
  unit: string;
}

export interface RawMaterialTransaction {
  id: number;
  materialName: string;
  category: string;
  quantity: number;
  unit: string;
  supplier: string;
}

export interface ProcessStep {
  id: number;
  name: string;
  description: string;
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
  addFuel: (f: Omit<FuelEntry, "id">) => {
    const items = getStore<FuelEntry>("fuels");
    items.push({ ...f, id: items.length + 1 });
    setStore("fuels", items);
  },

  getMedicines: () => getStore<MedicineEntry>("medicines"),
  addMedicine: (m: Omit<MedicineEntry, "id">) => {
    const items = getStore<MedicineEntry>("medicines");
    items.push({ ...m, id: items.length + 1 });
    setStore("medicines", items);
  },

  getMachines: () => getStore<MachineEntry>("machines"),
  addMachine: (m: Omit<MachineEntry, "id">) => {
    const items = getStore<MachineEntry>("machines");
    items.push({ ...m, id: items.length + 1 });
    setStore("machines", items);
  },

  getRawMaterials: () => getStore<RawMaterialEntry>("rawmaterials"),
  addRawMaterial: (r: Omit<RawMaterialEntry, "id">) => {
    const items = getStore<RawMaterialEntry>("rawmaterials");
    items.push({ ...r, id: items.length + 1 });
    setStore("rawmaterials", items);
  },

  getTransactions: () => getStore<RawMaterialTransaction>("transactions"),
  addTransaction: (t: Omit<RawMaterialTransaction, "id">) => {
    const items = getStore<RawMaterialTransaction>("transactions");
    items.push({ ...t, id: items.length + 1 });
    setStore("transactions", items);
  },

  getProcessSteps: () => getStore<ProcessStep>("processsteps"),
  addProcessStep: (p: Omit<ProcessStep, "id">) => {
    const items = getStore<ProcessStep>("processsteps");
    items.push({ ...p, id: items.length + 1 });
    setStore("processsteps", items);
  },
};
