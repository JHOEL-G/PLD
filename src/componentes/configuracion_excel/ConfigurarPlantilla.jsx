import React, { useState } from 'react';
import { Save, RotateCcw, X, Plus, FileSpreadsheet, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ConfigurarPlantilla = () => {
    const [format, setFormat] = useState('excel');
    const navigate = useNavigate();
    const [columns, setColumns] = useState([
        { id: 'a', num: 1, prop: 'Nombre', type: 'java.lang.String' },
        { id: 'b', num: 2, prop: 'Fecha de Nacimiento', type: 'java.util.Date' },
        { id: 'c', num: 3, prop: 'RFC', type: 'java.lang.String' },
        { id: 'd', num: 4, prop: 'CURP', type: 'java.lang.String' },
    ]);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-in fade-in duration-500">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h2 className="text-xl font-semibold text-gray-700">Importar listas PLD</h2>
                <div className="flex space-x-2">
                    <button className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
                        <RotateCcw className="w-4 h-4" /> <span>Recargar</span>
                    </button>
                    <button className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
                        Cancelar
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm">
                        <Save className="w-4 h-4" /> <span>Guardar</span>
                    </button>
                </div>
            </div>

            <div className="p-8 space-y-8">
                {/* Selectores de Formato y Plantilla */}
                <div className="flex flex-wrap items-end gap-6">
                    <div className="flex p-1 bg-gray-100 rounded-lg">
                        <button
                            onClick={() => setFormat('excel')}
                            className={`flex items-center space-x-2 px-4 py-1.5 rounded-md text-sm transition-all ${format === 'excel' ? 'bg-white shadow-sm text-green-700' : 'text-gray-500'}`}
                        >
                            <FileSpreadsheet className="w-4 h-4" /> <span>Excel</span>
                        </button>
                        <button
                            onClick={() => setFormat('csv')}
                            className={`flex items-center space-x-2 px-4 py-1.5 rounded-md text-sm transition-all ${format === 'csv' ? 'bg-white shadow-sm text-blue-700' : 'text-gray-500'}`}
                        >
                            <FileText className="w-4 h-4" /> <span>Csv</span>
                        </button>
                    </div>

                    <div className="flex-1 min-w-[200px] space-y-1">
                        <label className="text-xs font-bold text-gray-400 uppercase">Plantilla</label>
                        <input type="text" defaultValue="PLANT PERS BLOQUEADA" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div className="w-48 space-y-1">
                        <label className="text-xs font-bold text-gray-400 uppercase">Código</label>
                        <input type="text" defaultValue="PLANTPB" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                </div>

                {/* Panel de Configuración */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Columna Izquierda: Parámetros */}
                    <div className="space-y-4 bg-gray-50 p-6 rounded-xl border border-gray-100">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-400 uppercase">Catálogo</label>
                            <select className="w-full px-3 py-2 border rounded-lg bg-white">
                                <option>BLOQUEADA</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-400 uppercase">Hoja</label>
                                <input type="number" defaultValue={1} className="w-full px-3 py-2 border rounded-lg" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-400 uppercase">Fila Inicial</label>
                                <input type="number" defaultValue={3} className="w-full px-3 py-2 border rounded-lg" />
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 py-2">
                            <input type="checkbox" id="auto" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                            <label htmlFor="auto" className="text-sm text-gray-600 font-medium">Autodetectar Final</label>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-400 uppercase">Omitir fila (Separe por ,)</label>
                            <input type="text" placeholder="," className="w-full px-3 py-2 border rounded-lg" />
                        </div>
                    </div>

                    {/* Columna Derecha: Mapeo de Columnas */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex justify-between items-center">
                            <h4 className="font-bold text-gray-500 text-sm uppercase">Mapeo de Columnas</h4>
                            <button className="p-1.5 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
                                onClick={() => navigate('/importar/pasos')}
                            >
                                <Plus className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="border rounded-xl overflow-hidden shadow-sm">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 text-gray-500 border-b">
                                    <tr>
                                        <th className="px-4 py-3 font-semibold"># Columna</th>
                                        <th className="px-4 py-3 font-semibold">Propiedad</th>
                                        <th className="px-4 py-3 font-semibold">Tipo</th>
                                        <th className="px-4 py-3 font-semibold text-center">Acción</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {columns.map((col) => (
                                        <tr key={col.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-gray-300 font-mono">{col.id}</span>
                                                    <input type="number" defaultValue={col.num} className="w-16 px-2 py-1 border rounded" />
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <select className="w-full px-2 py-1 border rounded bg-white">
                                                    <option>{col.prop}</option>
                                                </select>
                                            </td>
                                            <td className="px-4 py-3 text-xs font-mono text-gray-400">{col.type}</td>
                                            <td className="px-4 py-3 text-center">
                                                <button className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg">
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfigurarPlantilla;