import { X, Clock, ChevronDown, CheckCircle2 } from "lucide-react";

export default function CreateCoincidenceModal({ show, onClose, newCoincidence, onInputChange, onSubmit, }) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-purple-800 px-6 py-5 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">Crear Nueva Coincidencia</h2>
                    <button
                        onClick={onClose}
                        className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-5">
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 flex items-start gap-3">
                        <Clock className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium text-purple-900 mb-1">
                                Registro Automático de Fecha y Hora
                            </p>
                            <p className="text-sm text-purple-700">
                                La fecha y hora se registrarán automáticamente al crear la coincidencia
                            </p>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Nombre Consultado <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={newCoincidence.nombreConsultado}
                            onChange={(e) => onInputChange("nombreConsultado", e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none text-gray-900"
                            placeholder="Ingrese el nombre o razón social..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Listas Consultadas <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={newCoincidence.listasConsultadas}
                            onChange={(e) => onInputChange("listasConsultadas", e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none text-gray-900"
                            placeholder="Ej: PEP, Negras, Propias"
                        />
                        <p className="text-xs text-gray-500 mt-1">Separe múltiples listas con comas</p>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Usuario <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={newCoincidence.usuario}
                            onChange={(e) => onInputChange("usuario", e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none text-gray-900"
                            placeholder="Nombre del usuario que realiza la consulta"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Resultado <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <select
                                value={newCoincidence.resultado}
                                onChange={(e) => onInputChange("resultado", e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none appearance-none text-gray-900 bg-white cursor-pointer"
                            >
                                <option value="sin">Sin coincidencias</option>
                                <option value="pep">Coincidencia PEP</option>
                                <option value="negra">Coincidencia Lista Negra</option>
                                <option value="propia">Coincidencia Lista Propia</option>
                            </select>
                            <ChevronDown
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                                size={20}
                            />
                        </div>
                    </div>
                </div>

                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onSubmit}
                        className="px-5 py-2.5 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200 flex items-center gap-2"
                    >
                        <CheckCircle2 size={18} />
                        Crear Coincidencia
                    </button>
                </div>
            </div>
        </div>
    )
}
