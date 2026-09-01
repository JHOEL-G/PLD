import { Phone, ArrowLeft, Printer } from "lucide-react";

export default function TopBar({ telefono, genero, onRegresar, onImprimir }) {
    return (
        <div className="bg-white border-b border-slate-200">
            <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between text-sm text-slate-500">
                <div className="flex items-center gap-2">
                    <Phone size={14} />
                    <span className="font-medium text-slate-600">{telefono}</span>
                    <span className="ml-4 text-slate-400">Genero:</span>
                    <span className="font-medium text-slate-600">{genero}</span>
                </div>
                <div className="flex items-center gap-5">
                    <button
                        onClick={onRegresar}
                        className="flex items-center gap-1.5 text-sky-600 hover:underline"
                    >
                        <ArrowLeft size={14} /> Regresar
                    </button>
                    <button
                        onClick={onImprimir}
                        className="flex items-center gap-1.5 text-sky-600 hover:underline"
                    >
                        <Printer size={14} /> Imprimir
                    </button>
                </div>
            </div>
        </div>
    );
}