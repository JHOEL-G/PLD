import React, { useState } from 'react';
import { Save, RotateCcw, X, Plus, FileSpreadsheet, FileText, ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PROP_OPTIONS = [
    { label: 'Nombre', type: 'java.lang.String' },
    { label: 'Fecha de Nacimiento', type: 'java.util.Date' },
    { label: 'RFC', type: 'java.lang.String' },
    { label: 'CURP', type: 'java.lang.String' },
    { label: 'Apellido Paterno', type: 'java.lang.String' },
    { label: 'Apellido Materno', type: 'java.lang.String' },
    { label: 'Correo Electrónico', type: 'java.lang.String' },
    { label: 'Teléfono', type: 'java.lang.String' },
    { label: 'Fecha de Alta', type: 'java.util.Date' },
    { label: 'Monto', type: 'java.lang.Double' },
];

let idCounter = 5;

const ConfigurarPlantilla = () => {
    const [format, setFormat] = useState('excel');
    const navigate = useNavigate();
    const [columns, setColumns] = useState([
        { id: 'a', num: 1, prop: 'Nombre', type: 'java.lang.String' },
        { id: 'b', num: 2, prop: 'Fecha de Nacimiento', type: 'java.util.Date' },
        { id: 'c', num: 3, prop: 'RFC', type: 'java.lang.String' },
        { id: 'd', num: 4, prop: 'CURP', type: 'java.lang.String' },
    ]);

    const addColumn = () => {
        const newId = String(idCounter++);
        const defaultProp = PROP_OPTIONS[0];
        setColumns(prev => [
            ...prev,
            {
                id: newId,
                num: prev.length + 1,
                prop: defaultProp.label,
                type: defaultProp.type,
            },
        ]);
    };

    const removeColumn = (id) => {
        setColumns(prev => prev.filter(col => col.id !== id));
    };

    const updateColumn = (id, field, value) => {
        setColumns(prev => prev.map(col => {
            if (col.id !== id) return col;
            if (field === 'prop') {
                const match = PROP_OPTIONS.find(o => o.label === value);
                return { ...col, prop: value, type: match?.type ?? col.type };
            }
            return { ...col, [field]: value };
        }));
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-in fade-in duration-500">

            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 flex-wrap gap-3">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Regresar
                    </button>
                    <span className="text-gray-300">|</span>
                    <h2 className="text-lg font-semibold text-gray-700">Importar listas PLD</h2>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                    <button
                        onClick={() => window.location.reload()}
                        className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Recargar
                    </button>
                    <button
                        onClick={() => navigate(-1)}
                        className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
                    >
                        Cancelar
                    </button>
                    <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors">
                        <Save className="w-4 h-4" />
                        Guardar
                    </button>
                    <button
                        onClick={() => navigate('/importar/pasos')}
                        className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors"
                    >
                        Importar excel
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="p-6 space-y-6">

                {/* Formato + Plantilla + Código */}
                <div className="flex flex-wrap items-end gap-4">
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase block mb-1.5">Formato</label>
                        <div className="flex p-1 bg-gray-100 rounded-lg">
                            <button
                                onClick={() => setFormat('excel')}
                                className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm transition-all ${format === 'excel' ? 'bg-white shadow-sm text-green-700 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                <FileSpreadsheet className="w-4 h-4" />
                                Excel
                            </button>
                            <button
                                onClick={() => setFormat('csv')}
                                className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm transition-all ${format === 'csv' ? 'bg-white shadow-sm text-blue-700 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                <FileText className="w-4 h-4" />
                                CSV
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 min-w-[200px] space-y-1">
                        <label className="text-xs font-bold text-gray-400 uppercase">Plantilla</label>
                        <input
                            type="text"
                            defaultValue="PLANT PERS BLOQUEADA"
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                        />
                    </div>

                    <div className="w-40 space-y-1">
                        <label className="text-xs font-bold text-gray-400 uppercase">Código</label>
                        <input
                            type="text"
                            defaultValue="PLANTPB"
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                        />
                    </div>
                </div>

                {/* Panel de Configuración */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Parámetros */}
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

                        {/* Resumen */}
                        <div className="pt-3 mt-2 border-t border-gray-200">
                            <p className="text-xs text-gray-400 mb-2 uppercase font-bold">Resumen</p>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Columnas mapeadas</span>
                                <span className="font-semibold text-blue-600">{columns.length}</span>
                            </div>
                        </div>
                    </div>

                    {/* Mapeo de Columnas */}
                    <div className="lg:col-span-2 flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide">Mapeo de columnas</h4>
                            <button
                                onClick={addColumn}
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
                                            <tr key={col.id} className="hover:bg-blue-50/40 transition-colors group">
                                                <td className="px-4 py-2.5">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-gray-300 font-mono text-xs w-4">{index + 1}</span>
                                                        <input
                                                            type="number"
                                                            value={col.num}
                                                            min={1}
                                                            onChange={e => updateColumn(col.id, 'num', parseInt(e.target.value))}
                                                            className="w-14 px-2 py-1 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                                        />
                                                    </div>
                                                </td>
                                                <td className="px-4 py-2.5">
                                                    <select
                                                        value={col.prop}
                                                        onChange={e => updateColumn(col.id, 'prop', e.target.value)}
                                                        className="w-full px-2 py-1 border border-gray-200 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                                    >
                                                        {PROP_OPTIONS.map(opt => (
                                                            <option key={opt.label} value={opt.label}>{opt.label}</option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td className="px-4 py-2.5">
                                                    <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded">
                                                        {col.type}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-2.5 text-center">
                                                    <button
                                                        onClick={() => removeColumn(col.id)}
                                                        className="p-1.5 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors opacity-60 group-hover:opacity-100"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
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
                </div>
            </div>
        </div>
    );
};

export default ConfigurarPlantilla;