import { User } from "lucide-react";
import { store } from "@/lib/store";

const ProfilePage = () => {
  const profile = store.getUserProfile();

  const rows = [
    ["First Name", profile.firstName],
    ["Last Name", profile.lastName],
    ["Email", profile.email],
    ["Role", profile.role.charAt(0).toUpperCase() + profile.role.slice(1)],
    ["Position", profile.position],
    ["Account Status", profile.isEnabled ? "Enabled" : "Disabled"],
    ["Last Login", new Date(profile.lastLogin).toLocaleString()],
    ["Account Created At", new Date(profile.createdAt).toLocaleString()],
    ["Created By", profile.createdBy],
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">User Profile</h1>
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-[hsl(var(--primary))] flex items-center justify-center text-white">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">{profile.firstName} {profile.lastName}</h2>
            <p className="text-sm text-gray-500">{profile.email}</p>
          </div>
        </div>
        <div className="space-y-4">
          {rows.map(([label, value]) => (
            <div key={label} className="flex border-b pb-3">
              <span className="w-44 font-semibold text-gray-600 text-sm">{label}</span>
              <span className="text-sm text-gray-800">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
