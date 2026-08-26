import { Filter, X, Search } from 'lucide-react';

export default function AlertFilters({ filters, setFilters, onClear, filteredCount, totalCount }) {
    return (
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                    <Filter className="w-5 h-5 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
                </div>
                <button
                    onClick={onClear}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
                >
                    <X className="w-4 h-4" />
                    <span>Limpiar Filtros</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Buscar Cliente</label>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            value={filters.cliente}
                            onChange={(e) => setFilters({ ...filters, cliente: e.target.value })}
                            placeholder="Nombre del cliente..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Alerta</label>
                    <select
                        value={filters.tipo}
                        onChange={(e) => setFilters({ ...filters, tipo: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="todos">Todos los tipos</option>
                        <option value="Umbral USD">Umbral USD</option>
                        <option value="Límite UMAs">Límite UMAs</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                        value={filters.status}
                        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="todos">Todos los status</option>
                        <option value="pendiente">Pendiente</option>
                        <option value="En revisión">En revisión</option>
                        <option value="Resuelta">Resuelta</option>
                        <option value="Verificado">Verificado</option>
                        <option value="Bloqueado">Bloqueado</option>
                    </select>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                    Mostrando <span className="font-semibold text-gray-900">{filteredCount}</span> de{' '}
                    <span className="font-semibold text-gray-900">{totalCount}</span> alertas
                </p>
            </div>
        </div>
    )
}
