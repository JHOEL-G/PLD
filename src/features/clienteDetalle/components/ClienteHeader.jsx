import { User } from "lucide-react";

export default function ClienteHeader({ nombre, clienteId }) {
    return (
        <div className="bg-slate-50 border-b border-slate-200">
            <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 mb-3">
                    <User size={34} />
                </div>
                <div className="text-xl font-semibold text-slate-700 tracking-wide">{nombre}</div>
                <div className="text-sm text-slate-400 mt-1">CLIENTE: {clienteId}</div>
            </div>
        </div>
    );
}