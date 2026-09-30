import { Filter, Search, X } from 'lucide-react';
import { statusConfig } from '../../utils/Denunciaconfig';

const selectArrowStyle = {
    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
    backgroundPosition: 'right .5rem center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '1.5em 1.5em',
    paddingRight: '2.5rem'
};

export default function FiltrosPanel({
    searchTerm, onSearchChange,
    selectedStatus, onStatusChange,
    selectedCompany, onCompanyChange,
    empresas, resultCount, onReset
}) {
    const hasActiveFilters = selectedStatus !== 'todas' || selectedCompany !== 'todas' || searchTerm;

    return (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 mb-8 shadow-sm">
            <div className="flex items-center space-x-2 mb-6">
                <div className="p-2 bg-slate-50 rounded-lg">
                    <Filter className="w-5 h-5 text-indigo-500" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Refinar Búsqueda</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Folio, título o involucrado..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all text-sm font-medium placeholder-slate-400"
                    />
                </div>

                <select
                    value={selectedStatus}
                    onChange={(e) => onStatusChange(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all text-sm font-medium cursor-pointer text-slate-700 appearance-none"
                    style={selectArrowStyle}
                >
                    <option value="todas">Todos los estados</option>
                    {Object.entries(statusConfig).map(([key, config]) => (
                        <option key={key} value={key}>{config.label}</option>
                    ))}
                </select>

                <select
                    value={selectedCompany}
                    onChange={(e) => onCompanyChange(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all text-sm font-medium cursor-pointer text-slate-700 appearance-none"
                    style={selectArrowStyle}
                >
                    <option value="todas">Todas las empresas</option>
                    {empresas.map(empresa => (
                        <option key={empresa} value={empresa}>{empresa}</option>
                    ))}
                </select>
            </div>

            {hasActiveFilters && (
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <p className="text-sm text-slate-500 font-medium">
                        Encontramos <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md">{resultCount}</span> coincidencias
                    </p>
                    <button
                        onClick={onReset}
                        className="text-sm text-indigo-600 hover:text-indigo-800 font-bold transition-colors flex items-center gap-1 bg-indigo-50 px-3 py-1.5 rounded-lg"
                    >
                        <X className="w-4 h-4" /> Limpiar
                    </button>
                </div>
            )}
        </div>
    );
}