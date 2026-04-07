import React, { useState } from 'react';
import { Shield, AlertTriangle, Activity, MapPin, List, FileText, Eye, Search, Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TransactionalProfileApp = () => {
    const [activeTab, setActiveTab] = useState('relevantes');
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const navigate = useNavigate();

    // Datos de ejemplo
    const [relevantesData, setRelevantesData] = useState([
        {
            id: 'OP-001',
            cliente: 'Juan Pérez García',
            clienteId: 'C001',
            tipo: 'Compraventa Inmueble',
            monto: '$2,500,000 MXN',
            fecha: '2024-11-24',
            criticidad: 'Alta',
            estatus: 'Reportada'
        },
        {
            id: 'OP-002',
            cliente: 'Empresa XYZ SA',
            clienteId: 'C002',
            tipo: 'Venta de Vehículo',
            monto: '$850,000 MXN',
            fecha: '2024-11-23',
            criticidad: 'Media',
            estatus: 'Pendiente'
        }
    ]);

    const [vulnerablesData, setVulnerablesData] = useState([
        {
            id: 'OV-001',
            titulo: 'Comercio de Joyas',
            empresa: 'Joyería del Centro SA',
            montoTotal: '$3,200,000 MXN',
            operaciones: 15,
            fechaReciente: '2024-11-24',
            riesgo: 'Alto'
        },
        {
            id: 'OV-002',
            titulo: 'Compraventa de Vehículos',
            empresa: 'AutoMéxico SA',
            montoTotal: '$5,800,000 MXN',
            operaciones: 8,
            fechaReciente: '2024-11-23',
            riesgo: 'Medio'
        },
        {
            id: 'OV-003',
            titulo: 'Servicios de Blindaje',
            empresa: 'Blindajes Pro',
            montoTotal: '$1,500,000 MXN',
            operaciones: 5,
            fechaReciente: '2024-11-22',
            riesgo: 'Alto'
        }
    ]);

    const [inusualesData, setInusualesData] = useState([
        {
            id: 'OI-001',
            titulo: 'Múltiples Depósitos',
            tipo: 'Estructuración',
            cliente: 'Carlos Ramírez',
            descripcion: '10 depósitos por $9,900 MXN c/u en 2 días',
            montoTotal: '$99,000 MXN',
            fechaDeteccion: '2024-11-24'
        },
        {
            id: 'OI-002',
            titulo: 'Cambio de Patrón',
            tipo: 'Perfil Inusual',
            cliente: 'Ana Martínez',
            descripcion: 'Incremento súbito del 400% en volumen mensual',
            montoTotal: '$2,000,000 MXN',
            fechaDeteccion: '2024-11-23'
        },
        {
            id: 'OI-003',
            titulo: 'País de Riesgo',
            tipo: 'País Alto Riesgo',
            cliente: 'Importadora ABC',
            descripcion: 'Transferencia desde Irán',
            montoTotal: '$500,000 USD',
            fechaDeteccion: '2024-11-22'
        }
    ]);

    const [paisesData, setPaisesData] = useState([
        {
            pais: 'Irán',
            nivel: 'Alto',
            operaciones: 3,
            montoTotal: '$1,500,000 USD',
            clientes: ['Importadora ABC', 'Comercial Global']
        },
        {
            pais: 'Corea del Norte',
            nivel: 'Alto',
            operaciones: 1,
            montoTotal: '$200,000 USD',
            clientes: ['Tech Solutions']
        },
        {
            pais: 'Siria',
            nivel: 'Alto',
            operaciones: 2,
            montoTotal: '$450,000 USD',
            clientes: ['Export SA', 'Trading Inc']
        }
    ]);

    const [listasData, setListasData] = useState([
        {
            tipo: 'PEP',
            nombre: 'María González López',
            coincidencia: '95%',
            fechaDeteccion: '2024-11-24',
            estatus: 'Verificado'
        },
        {
            tipo: 'OFAC',
            nombre: 'International Corp SA',
            coincidencia: '88%',
            fechaDeteccion: '2024-11-23',
            estatus: 'En Revisión'
        },
        {
            tipo: 'Lista Propia',
            nombre: 'José Hernández',
            coincidencia: '100%',
            fechaDeteccion: '2024-11-22',
            estatus: 'Bloqueado'
        }
    ]);

    const tabs = [
        { id: 'relevantes', label: 'Relevantes', icon: Shield },
        { id: 'vulnerables', label: 'Vulnerables', icon: AlertTriangle },
        { id: 'inusuales', label: 'Inusuales', icon: Activity },
        { id: 'paises', label: 'Países', icon: MapPin },
        { id: 'listas', label: 'Listas', icon: List }
    ];

    const openModal = (type) => {
        setModalType(type);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setModalType('');
    };

    const handleSubmit = (e, formData) => {
        e.preventDefault();

        switch (modalType) {
            case 'relevantes':
                setRelevantesData([...relevantesData, {
                    id: `OP-${String(relevantesData.length + 1).padStart(3, '0')}`,
                    ...formData
                }]);
                break;
            case 'vulnerables':
                setVulnerablesData([...vulnerablesData, {
                    id: `OV-${String(vulnerablesData.length + 1).padStart(3, '0')}`,
                    ...formData
                }]);
                break;
            case 'inusuales':
                setInusualesData([...inusualesData, {
                    id: `OI-${String(inusualesData.length + 1).padStart(3, '0')}`,
                    ...formData
                }]);
                break;
            case 'paises':
                setPaisesData([...paisesData, formData]);
                break;
            case 'listas':
                setListasData([...listasData, formData]);
                break;
            default:
                break;
        }

        closeModal();
    };

    const AddModal = () => {
        const [formData, setFormData] = useState({});

        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({ ...prev, [name]: value }));
        };

        const handleClientesChange = (e) => {
            const value = e.target.value;
            setFormData(prev => ({ ...prev, clientes: value.split(',').map(c => c.trim()) }));
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

        const getModalTitle = () => {
            const titles = {
                relevantes: 'Agregar Operación Relevante',
                vulnerables: 'Agregar Actividad Vulnerable',
                inusuales: 'Agregar Operación Inusual',
                paises: 'Agregar País de Alto Riesgo',
                listas: 'Agregar Coincidencia en Lista'
            };
            return titles[modalType] || 'Agregar Perfil';
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-900">{getModalTitle()}</h2>
                        <button
                            onClick={closeModal}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <form onSubmit={(e) => handleSubmit(e, formData)} className="p-6">
                        <div className="space-y-4">
                            {renderFormFields()}
                        </div>

                        <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold text-gray-900">Perfil Transaccional</h1>
                            <p className="text-sm text-gray-500">Operaciones Relevantes, Vulnerables, Inusuales, Países y Listas</p>
                        </div>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                        <FileText className="w-4 h-4" />
                        <span>Generar Reporte</span>
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white border-b border-gray-200 px-6">
                <div className="flex space-x-8">
                    {tabs.map(tab => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${activeTab === tab.id
                                    ? 'border-green-600 text-green-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{tab.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
            <div className="flex justify-end px-3 py-1">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                    onClick={() => navigate('/transactional/new')}>
                    <FileText className="w-4 h-4" />
                    <span>Crear Nuevo Registro</span>
                </button>
            </div>


            {/* Content */}
            <div className="p-6">
                {/* Relevantes */}
                {activeTab === 'relevantes' && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex-1 mr-4">
                                <div className="flex items-start space-x-3">
                                    <FileText className="w-5 h-5 text-blue-700 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-blue-900">Operaciones Relevantes</h3>
                                        <p className="text-sm text-blue-700">Operaciones superiores a los umbrales establecidos que requieren reporte ante la UIF conforme a las disposiciones aplicables.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">ID Operación</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Cliente</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tipo de Operación</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Monto</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Fecha</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Criticidad</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Estatus</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {relevantesData.map(item => (
                                        <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.id}</td>
                                            <td className="px-4 py-3">
                                                <div className="text-sm font-medium text-gray-900">{item.cliente}</div>
                                                <div className="text-xs text-gray-500">{item.clienteId}</div>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600">{item.tipo}</td>
                                            <td className="px-4 py-3 text-sm font-semibold text-gray-900">{item.monto}</td>
                                            <td className="px-4 py-3 text-sm text-gray-600">{item.fecha}</td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.criticidad === 'Alta' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {item.criticidad}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.estatus === 'Reportada' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                                                    }`}>
                                                    {item.estatus}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Vulnerables */}
                {activeTab === 'vulnerables' && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 flex-1 mr-4">
                                <div className="flex items-start space-x-3">
                                    <AlertTriangle className="w-5 h-5 text-purple-700 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-purple-900">Actividades Vulnerables</h3>
                                        <p className="text-sm text-purple-700">Operaciones realizadas en sectores considerados como actividades vulnerables según la normativa vigente (joyas, vehículos, inmuebles, etc.).</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-4">
                            {vulnerablesData.map(item => (
                                <div key={item.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start space-x-4">
                                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${item.riesgo === 'Alto' ? 'bg-red-100' : 'bg-yellow-100'
                                                }`}>
                                                <AlertTriangle className={`w-6 h-6 ${item.riesgo === 'Alto' ? 'text-red-600' : 'text-yellow-600'
                                                    }`} />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-2 mb-1">
                                                    <span className="text-sm font-medium text-gray-500">{item.id}</span>
                                                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${item.riesgo === 'Alto' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                        Riesgo {item.riesgo}
                                                    </span>
                                                </div>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.titulo}</h3>
                                                <p className="text-sm text-gray-600 mb-3">{item.empresa}</p>
                                                <div className="grid grid-cols-3 gap-4 text-sm">
                                                    <div>
                                                        <span className="text-gray-500">Monto Total:</span>
                                                        <div className="font-semibold text-gray-900">{item.montoTotal}</div>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-500">Operaciones:</span>
                                                        <div className="font-semibold text-gray-900">{item.operaciones}</div>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-500">Última Fecha:</span>
                                                        <div className="font-semibold text-gray-900">{item.fechaReciente}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                                            <Eye className="w-4 h-4" />
                                            <span>Analizar</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Inusuales */}
                {activeTab === 'inusuales' && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex-1 mr-4">
                                <div className="flex items-start space-x-3">
                                    <Activity className="w-5 h-5 text-orange-700 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-orange-900">Operaciones Inusuales</h3>
                                        <p className="text-sm text-orange-700">Operaciones que presentan patrones fuera del perfil transaccional esperado del cliente o que muestran indicios de estructuración.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-4">
                            {inusualesData.map(item => (
                                <div key={item.id} className="bg-white rounded-lg border-l-4 border-orange-500 shadow-sm p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start space-x-4 flex-1">
                                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                                <Activity className="w-6 h-6 text-orange-600" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-2 mb-1">
                                                    <span className="text-sm font-medium text-gray-500">{item.id}</span>
                                                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800">
                                                        {item.tipo}
                                                    </span>
                                                </div>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.titulo}</h3>
                                                <p className="text-sm text-gray-600 mb-1">Cliente: {item.cliente}</p>
                                                <div className="bg-orange-50 rounded p-3 mb-3">
                                                    <p className="text-sm text-gray-700">{item.descripcion}</p>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4 text-sm">
                                                    <div>
                                                        <span className="text-gray-500">Monto Total:</span>
                                                        <div className="font-semibold text-gray-900">{item.montoTotal}</div>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-500">Fecha Detección:</span>
                                                        <div className="font-semibold text-gray-900">{item.fechaDeteccion}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center space-x-2 ml-4">
                                            <Search className="w-4 h-4" />
                                            <span>Investigar</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Países */}
                {activeTab === 'paises' && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex-1 mr-4">
                                <div className="flex items-start space-x-3">
                                    <MapPin className="w-5 h-5 text-red-700 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-red-900">Países de Alto Riesgo</h3>
                                        <p className="text-sm text-red-700">Operaciones realizadas con países o jurisdicciones consideradas de alto riesgo por organismos internacionales (GAFI, OFAC).</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-4">
                            {paisesData.map((item, index) => (
                                <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                            <MapPin className="w-6 h-6 text-red-600" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <h3 className="text-xl font-semibold text-gray-900">{item.pais}</h3>
                                                <span className="px-2 py-0.5 rounded text-xs font-medium bg-red-600 text-white">
                                                    Nivel {item.nivel}
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-6 mb-4">
                                                <div>
                                                    <span className="text-sm text-gray-500">Operaciones</span>
                                                    <div className="text-2xl font-bold text-gray-900">{item.operaciones}</div>
                                                </div>
                                                <div>
                                                    <span className="text-sm text-gray-500">Monto Total</span>
                                                    <div className="text-2xl font-bold text-gray-900">{item.montoTotal}</div>
                                                </div>
                                            </div>
                                            <div>
                                                <span className="text-sm font-medium text-gray-700">Clientes Involucrados:</span>
                                                <ul className="mt-2 space-y-1">
                                                    {item.clientes.map((cliente, idx) => (
                                                        <li key={idx} className="text-sm text-gray-600 flex items-center">
                                                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                                                            {cliente}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Listas */}
                {activeTab === 'listas' && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 flex-1 mr-4">
                                <div className="flex items-start space-x-3">
                                    <List className="w-5 h-5 text-indigo-700 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-indigo-900">Coincidencias en Listas</h3>
                                        <p className="text-sm text-indigo-700">Clientes que han presentado coincidencias en listas PEP, listas negras internacionales o listas propias de la institución.</p>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => openModal('listas')}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2 whitespace-nowrap"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Agregar</span>
                            </button>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tipo de Lista</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Nombre</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Coincidencia</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Fecha Detección</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Estatus</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listasData.map((item, index) => (
                                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${item.tipo === 'PEP' ? 'bg-orange-100 text-orange-800' :
                                                    item.tipo === 'OFAC' ? 'bg-red-100 text-red-800' :
                                                        'bg-purple-100 text-purple-800'
                                                    }`}>
                                                    {item.tipo}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.nombre}</td>
                                            <td className="px-4 py-3 text-sm font-bold text-gray-900">{item.coincidencia}</td>
                                            <td className="px-4 py-3 text-sm text-gray-600">{item.fechaDeteccion}</td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.estatus === 'Verificado' ? 'bg-green-100 text-green-800' :
                                                    item.estatus === 'En Revisión' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-red-100 text-red-800'
                                                    }`}>
                                                    {item.estatus}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                                    Ver Detalle
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModal && <AddModal />}
        </div>
    );
};

export default TransactionalProfileApp;