export default function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-3 shadow-sm">
      <div className="h-14 w-14 rounded-lg bg-emerald-50 flex items-center justify-center">
        <Icon size={18} className="text-green-900" />
      </div>
      <div>
        <p className="text-xl font-bold text-gray-900">{value ?? "—"}</p>
        <p className="text-xs text-gray-600">{label}</p>
      </div>
    </div>
  );
}
