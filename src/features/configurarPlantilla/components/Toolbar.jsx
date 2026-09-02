import { Save, RotateCcw, ArrowLeft, ArrowRight } from 'lucide-react';

export default function Toolbar({ onBack, onReload, onCancel, onSave, onImportExcel }) {
    return (
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 flex-wrap gap-3">
            <div className="flex items-center gap-3">
                <button
                    onClick={onBack}
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
                    onClick={onReload}
                    className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <RotateCcw className="w-4 h-4" />
                    Recargar
                </button>
                <button
                    onClick={onCancel}
                    className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
                >
                    Cancelar
                </button>
                <button
                    onClick={onSave}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
                >
                    <Save className="w-4 h-4" />
                    Guardar
                </button>
                <button
                    onClick={onImportExcel}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors"
                >
                    Importar excel
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}
