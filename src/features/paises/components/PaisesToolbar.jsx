import { Search } from "lucide-react";
import { Copy } from "lucide-react";
import { Plus } from "lucide-react";

const EXPORT_BUTTONS = ['Copy', 'CSV', 'EXCEL', 'PDF', 'Imprimir'];

export default function PaisesToolbar({ onAdd }) {
    return (
        <div className="flex flex-wrap justify-between items-center p-4 gap-4">
            <div className="flex border border-gray-300 rounded divide-x divide-gray-300 overflow-hidden">
                {EXPORT_BUTTONS.map((btn) => (
                    <button key={btn} className="px-3 py-1.5 text-[11px] bg-white hover:bg-gray-50 text-gray-600">
                        {btn}
                    </button>
                ))}
            </div>
            <div className="flex items-center gap-2">
                <button
                    onClick={onAdd}
                    className="bg-[#337ab7] hover:bg-[#286090] text-white px-3 py-1.5 rounded text-[11px] flex items-center gap-1 transition-colors"
                >
                    <Plus size={14} strokeWidth={3} /> Agregar
                </button>
                <button className="bg-[#337ab7] hover:bg-[#286090] text-white px-3 py-1.5 rounded text-[11px] flex items-center gap-1 transition-colors">
                    <Copy size={12} /> Todas las listas
                </button>
                <button className="border border-gray-300 hover:bg-gray-50 text-gray-600 px-3 py-1.5 rounded text-[11px] flex items-center gap-1 transition-colors">
                    <Search size={12} /> Consultar clientes en esta lista
                </button>
            </div>
        </div>
    )
}
