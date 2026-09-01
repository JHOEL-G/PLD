export default function KVTable({ rows }) {
    return (
        <div className="divide-y divide-slate-100 rounded-md overflow-hidden border border-slate-100">
            {rows.map(([label, value], i) => (
                <div
                    key={i}
                    className={`flex items-center px-4 py-2.5 text-sm ${i % 2 === 0 ? "bg-slate-50/60" : "bg-white"
                        }`}
                >
                    <span className="w-2 h-2 rounded-full bg-slate-300 mr-3 shrink-0" />
                    <span className="w-48 shrink-0 text-slate-500">{label}</span>
                    <span className="text-slate-700 font-medium">{value || "NA"}</span>
                </div>
            ))}
        </div>
    );
}