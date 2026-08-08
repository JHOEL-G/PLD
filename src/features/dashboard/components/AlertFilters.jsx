import { Search } from "lucide-react";
import { ChevronDown } from "lucide-react";

export default function AlertFilters({ filters, onFilterChange }) {
    return (
        <div className="bg-white rounded-lg shadow p-4">
            <div className="flex flex-wrap items-center gap-3">
                <select
                    className="border border-gray-300 rounded px-3 py-2 text-sm outline-none"
                    value={filters.status}
                    onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
                >
                    <option>Pendientes</option>
                    <option>En Revisión</option>
                    <option>Críticas</option>
                </select>

                <button className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded text-sm font-medium">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                    ALTA
                    <ChevronDown className="w-4 h-4" />
                </button>

                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Buscar por Cliente, Monto..."
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                </div>

                <button className="bg-blue-700 text-white p-2 rounded hover:bg-blue-800 transition-colors">
                    <Search className="w-5 h-5" />
                </button>
            </div>
        </div>
    )
}
