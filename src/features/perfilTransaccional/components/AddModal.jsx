import { X } from "lucide-react";
import { useState } from "react";

const TITULOS = {
    relevantes: 'Agregar Operación Relevante',
    vulnerables: 'Agregar Actividad Vulnerable',
    inusuales: 'Agregar Operación Inusual',
    paises: 'Agregar País de Alto Riesgo',
    listas: 'Agregar Coincidencia en Lista'
};

export default function AddModal({ modalType, onClose, onSubmit }) {
    const [formData, setFormData] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleClientesChange = (e) => {
        const value = e.target.value;
        setFormData(prev => ({ ...prev, clientes: value.split(',').map(c => c.trim()) }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const renderFormFields = () => {
        switch (modalType) {
            case 'relevantes':
                return (
                    <>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
                                <input
                                    type="text"
                                    name="cliente"
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">ID Cliente</label>
                                <input
                                    type="text"
                                    name="clienteId"
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Operación</label>
                            <select
                                name="tipo"
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                required
                            >
                                <option value="">Seleccionar...</option>
                                <option value="Compraventa Inmueble">Compraventa Inmueble</option>
                                <option value="Venta de Vehículo">Venta de Vehículo</option>
                                <option value="Comercio de Joyas">Comercio de Joyas</option>
                                <option value="Blindaje">Blindaje</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Monto</label>
                                <input
                                    type="text"
                                    name="monto"
                                    onChange={handleInputChange}
                                    placeholder="$0.00 MXN"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                                <input
                                    type="date"
                                    name="fecha"
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Criticidad</label>
                                <select
                                    name="criticidad"
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    required
                                >
                                    <option value="">Seleccionar...</option>
                                    <option value="Alta">Alta</option>
                                    <option value="Media">Media</option>
                                    <option value="Baja">Baja</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Estatus</label>
                                <select
                                    name="estatus"
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    required
                                >
                                    <option value="">Seleccionar...</option>
                                    <option value="Reportada">Reportada</option>
                                    <option value="Pendiente">Pendiente</option>
                                    <option value="En Revisión">En Revisión</option>
                                </select>
                            </div>
                        </div>
                    </>
                );

            case 'vulnerables':
                return (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                            <input
                                type="text"
                                name="titulo"
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Empresa</label>
                            <input
                                type="text"
                                name="empresa"
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Monto Total</label>
                                <input
                                    type="text"
                                    name="montoTotal"
                                    onChange={handleInputChange}
                                    placeholder="$0.00 MXN"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Número de Operaciones</label>
                                <input
                                    type="number"
                                    name="operaciones"
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Reciente</label>
                                <input
                                    type="date"
                                    name="fechaReciente"
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nivel de Riesgo</label>
                                <select
                                    name="riesgo"
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    required
                                >
                                    <option value="">Seleccionar...</option>
                                    <option value="Alto">Alto</option>
                                    <option value="Medio">Medio</option>
                                    <option value="Bajo">Bajo</option>
                                </select>
                            </div>
                        </div>
                    </>
                );

            case 'inusuales':
                return (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                            <input
                                type="text"
                                name="titulo"
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                                <select
                                    name="tipo"
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    required
                                >
                                    <option value="">Seleccionar...</option>
                                    <option value="Estructuración">Estructuración</option>
                                    <option value="Perfil Inusual">Perfil Inusual</option>
                                    <option value="País Alto Riesgo">País Alto Riesgo</option>
                                    <option value="Monto Inusual">Monto Inusual</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
                                <input
                                    type="text"
                                    name="cliente"
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                            <textarea
                                name="descripcion"
                                onChange={handleInputChange}
                                rows="3"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Monto Total</label>
                                <input
                                    type="text"
                                    name="montoTotal"
                                    onChange={handleInputChange}
                                    placeholder="$0.00 MXN"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Detección</label>
                                <input
                                    type="date"
                                    name="fechaDeteccion"
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>
                    </>
                );

            case 'paises':
                return (
                    <>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">País</label>
                                <input
                                    type="text"
                                    name="pais"
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nivel de Riesgo</label>
                                <select
                                    name="nivel"
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    required
                                >
                                    <option value="">Seleccionar...</option>
                                    <option value="Alto">Alto</option>
                                    <option value="Medio">Medio</option>
                                    <option value="Bajo">Bajo</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Número de Operaciones</label>
                                <input
                                    type="number"
                                    name="operaciones"
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Monto Total</label>
                                <input
                                    type="text"
                                    name="montoTotal"
                                    onChange={handleInputChange}
                                    placeholder="$0.00 USD"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Clientes Involucrados</label>
                            <input
                                type="text"
                                name="clientes"
                                onChange={handleClientesChange}
                                placeholder="Separar por comas (ej: Cliente 1, Cliente 2)"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                required
                            />
                            <p className="text-xs text-gray-500 mt-1">Ingrese los nombres separados por comas</p>
                        </div>
                    </>
                );

            case 'listas':
                return (
                    <>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Lista</label>
                                <select
                                    name="tipo"
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    required
                                >
                                    <option value="">Seleccionar...</option>
                                    <option value="PEP">PEP</option>
                                    <option value="OFAC">OFAC</option>
                                    <option value="Lista Propia">Lista Propia</option>
                                    <option value="ONU">ONU</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Porcentaje de Coincidencia</label>
                                <input
                                    type="text"
                                    name="coincidencia"
                                    onChange={handleInputChange}
                                    placeholder="95%"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Detección</label>
                                <input
                                    type="date"
                                    name="fechaDeteccion"
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Estatus</label>
                            <select
                                name="estatus"
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                required
                            >
                                <option value="">Seleccionar...</option>
                                <option value="Verificado">Verificado</option>
                                <option value="En Revisión">En Revisión</option>
                                <option value="Bloqueado">Bloqueado</option>
                                <option value="Falso Positivo">Falso Positivo</option>
                            </select>
                        </div>
                    </>
                );

            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">{TITULOS[modalType] || 'Agregar Perfil'}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleFormSubmit} className="p-6">
                    <div className="space-y-4">{renderFormFields()}</div>

                    <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
