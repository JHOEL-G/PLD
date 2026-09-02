import { Plus } from 'lucide-react';
import ColumnRow from './ColumnRow';

export default function ColumnMappingTable({ columns, onAdd, onUpdate, onRemove }) {
    return (
        <div className="lg:col-span-2 flex flex-col gap-3">
            <div className="flex justify-between items-center">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide">Mapeo de columnas</h4>
                <button
                    onClick={onAdd}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                >
                    <Plus className="w-3.5 h-3.5" />
                    Agregar columna
                </button>
            </div>

            <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                        <tr>
                            <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wide"># Col</th>
                            <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wide">Propiedad</th>
                            <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wide">Tipo</th>
                            <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wide text-center">Acción</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {columns.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-4 py-8 text-center text-gray-400 text-sm">
                                    No hay columnas mapeadas. Agrega una para comenzar.
                                </td>
                            </tr>
                        ) : (
                            columns.map((col, index) => (
                                <ColumnRow
                                    key={col.id}
                                    column={col}
                                    index={index}
                                    onUpdate={onUpdate}
                                    onRemove={onRemove}
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {columns.length > 0 && (
                <p className="text-xs text-gray-400 text-right">
                    {columns.length} columna{columns.length !== 1 ? 's' : ''} configurada{columns.length !== 1 ? 's' : ''}
                </p>
            )}
        </div>
    )
}
