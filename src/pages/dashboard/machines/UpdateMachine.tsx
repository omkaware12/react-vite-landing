import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { store } from "@/lib/store";
import { toast } from "@/hooks/use-toast";

const UpdateMachine = () => {
  const navigate = useNavigate();
  const { machineId } = useParams();
  const machine = store.getMachines().find((m) => m.id === Number(machineId));

  const [motorConsumptionInHp, setMotor] = useState(machine ? String(machine.motorConsumptionInHp) : "");
  const [heaterConsumptionInKw, setHeater] = useState(machine ? String(machine.heaterConsumptionInKw) : "");
  const [gasConsumptionInKgs, setGas] = useState(machine ? String(machine.gasConsumptionInKgs) : "");

  if (!machine) {
    return (
      <div>
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[hsl(174,60%,30%)] mb-6 w-fit">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <p className="text-center text-gray-400 mt-12">Machine not found.</p>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const motor = parseFloat(motorConsumptionInHp) || 0;
    const heater = parseFloat(heaterConsumptionInKw) || 0;
    const gas = parseFloat(gasConsumptionInKgs) || 0;

    // Recalculate costs
    const electricityUnitPerHour = (motor * 0.746) + heater;
    const electricityCostPerMachineHour = electricityUnitPerHour * 8; // assumed rate
    const gasFuel = store.getFuels().find((f) => f.fuelType === "GAS");
    const gasCostPerMachineHour = gas * (gasFuel?.costPerUnit ?? 0);
    const totalMachineCostPerHour = electricityCostPerMachineHour + gasCostPerMachineHour;

    store.updateMachine(machine.id, {
      motorConsumptionInHp: motor,
      heaterConsumptionInKw: heater,
      gasConsumptionInKgs: gas,
      electricityUnitPerHour,
      electricityCostPerMachineHour,
      gasCostPerMachineHour,
      totalMachineCostPerHour,
    });
    toast({ title: "Machine updated successfully" });
    navigate(`/dashboard/machines/${machine.id}`);
  };

  return (
    <div className="min-h-[80vh] flex flex-col">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[hsl(174,60%,30%)] mb-8 w-fit">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
      <div className="flex-1 flex items-start justify-center">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-lg space-y-6">
          <h2 className="text-2xl font-bold text-[hsl(174,60%,30%)] text-center">Update Machine</h2>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Machine Name</label>
            <input type="text" value={machine.name} disabled className="w-full border rounded-lg px-4 py-3 text-sm bg-gray-100 text-gray-500 cursor-not-allowed" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Fuel Type</label>
            <input type="text" value={machine.fuelType} disabled className="w-full border rounded-lg px-4 py-3 text-sm bg-gray-100 text-gray-500 cursor-not-allowed" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Electricity Type</label>
            <input type="text" value={machine.electricityType || "—"} disabled className="w-full border rounded-lg px-4 py-3 text-sm bg-gray-100 text-gray-500 cursor-not-allowed" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Motor Consumption (HP)</label>
            <input type="number" step="0.01" value={motorConsumptionInHp} onChange={(e) => setMotor(e.target.value)} className="w-full border rounded-lg px-4 py-3 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Heater Consumption (KW)</label>
            <input type="number" step="0.01" value={heaterConsumptionInKw} onChange={(e) => setHeater(e.target.value)} className="w-full border rounded-lg px-4 py-3 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Gas Consumption (Kgs)</label>
            <input type="number" step="0.01" value={gasConsumptionInKgs} onChange={(e) => setGas(e.target.value)} className="w-full border rounded-lg px-4 py-3 text-sm" />
          </div>
          <button type="submit" className="w-full bg-[hsl(174,60%,30%)] text-white py-3 rounded-lg font-semibold hover:bg-[hsl(174,60%,25%)] transition-colors">
            Update Machine
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateMachine;
