import { MinusCircle, Printer } from "lucide-react";

export default function ListaBloqueada({ label }) {
    return (
        <div className="flex items-center justify-between px-4 py-2.5 text-sm text-slate-600">
            <div className="flex items-center gap-2">
                <MinusCircle size={15} className="text-emerald-500" />
                <span>{label}</span>
            </div>
            <Printer size={14} className="text-slate-400" />
        </div>
    );
}