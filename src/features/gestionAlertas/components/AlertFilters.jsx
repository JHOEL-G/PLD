import { Filter } from "lucide-react";

export default function AlertFilters({ statusFilter, priorityFilter, onStatusChange, onPriorityChange, resultCount, }) {
    return (
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-700">
                    <Filter className="w-4 h-4" />
                    <span className="text-sm font-medium">Filtros:</span>
                </div>

                <select
                    value={statusFilter}
                    onChange={(e) => onStatusChange(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                    <option value="todos">Todos los Estatus</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="En Revisión">En Revisión</option>
                    <option value="Resuelta">Resuelta</option>
                    <option value="Verificado">Verificado</option>
                    <option value="Bloqueado">Bloqueado</option>
                </select>

                <select
                    value={priorityFilter}
                    onChange={(e) => onPriorityChange(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                    <option value="todas">Todas las Prioridades</option>
                    <option value="CRITICA">Crítica</option>
                    <option value="ALTA">Alta</option>
                    <option value="MEDIA">Media</option>
                </select>

                <div className="ml-auto text-sm text-gray-600">
                    <span className="font-medium">{resultCount}</span> alertas
                    encontradas
                </div>
            </div>
        </div>
    )
}
