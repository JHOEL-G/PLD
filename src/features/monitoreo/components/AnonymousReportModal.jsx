import { Mail } from "lucide-react";
import { useState } from "react";

const initialForm = { title: '', description: '', client: '', severity: 'MEDIA' };

export default function AnonymousReportModal({ onClose, onSubmit }) {
    const [report, setReport] = useState(initialForm);

    const handleChange = (field) => (e) => {
        setReport({ ...report, [field]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(report);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                <Mail className="w-6 h-6 text-red-600" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Buzón de Denuncias Anónimas</h2>
                                <p className="text-sm text-gray-600">Su identidad permanecerá confidencial</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-start space-x-2">
                            <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <p className="text-sm text-yellow-800">
                                Este formulario es completamente anónimo. No se registrará información que pueda identificarle.
                            </p>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Título de la Denuncia <span className="text-red-600">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            value={report.title}
                            onChange={handleChange('title')}
                            placeholder="Ej: Operación Sospechosa de Lavado de Dinero"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Descripción Detallada <span className="text-red-600">*</span>
                        </label>
                        <textarea
                            required
                            value={report.description}
                            onChange={handleChange('description')}
                            placeholder="Describa los hechos con el mayor detalle posible..."
                            rows="6"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Cliente Involucrado (Opcional)</label>
                        <input
                            type="text"
                            value={report.client}
                            onChange={handleChange('client')}
                            placeholder="Nombre del cliente si lo conoce"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nivel de Severidad <span className="text-red-600">*</span>
                        </label>
                        <select
                            value={report.severity}
                            onChange={handleChange('severity')}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        >
                            <option value="BAJA">Baja - Situación menor</option>
                            <option value="MEDIA">Media - Requiere atención</option>
                            <option value="ALTA">Alta - Situación grave</option>
                            <option value="CRITICA">Crítica - Requiere acción inmediata</option>
                        </select>
                    </div>

                    <div className="flex space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                        >
                            Enviar Denuncia
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
