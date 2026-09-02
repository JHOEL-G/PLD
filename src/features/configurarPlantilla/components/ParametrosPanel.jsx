import React from 'react'

export default function ParametrosPanel({ columnsCount }) {
    return (
        <div className="space-y-4 bg-gray-50 p-5 rounded-xl border border-gray-100">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide">Parámetros</h4>

            <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Catálogo</label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                    <option>BLOQUEADA</option>
                    <option>ACTIVA</option>
                    <option>REVISIÓN</option>
                </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase">Hoja</label>
                    <input
                        type="number"
                        defaultValue={1}
                        min={1}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase">Fila inicial</label>
                    <input
                        type="number"
                        defaultValue={3}
                        min={1}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2 py-1">
                <input
                    type="checkbox"
                    id="auto"
                    defaultChecked
                    className="w-4 h-4 text-blue-600 rounded accent-blue-600"
                />
                <label htmlFor="auto" className="text-sm text-gray-600 font-medium">Autodetectar final</label>
            </div>

            <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Omitir filas (separar por ,)</label>
                <input
                    type="text"
                    placeholder="ej: 1,2,5"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>

            <div className="pt-3 mt-2 border-t border-gray-200">
                <p className="text-xs text-gray-400 mb-2 uppercase font-bold">Resumen</p>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Columnas mapeadas</span>
                    <span className="font-semibold text-blue-600">{columnsCount}</span>
                </div>
            </div>
        </div>
    )
}
