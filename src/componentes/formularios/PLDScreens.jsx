import React, { useState } from 'react';
import { ChevronDown, User, List, Database, Check, Trash2, AlertTriangle } from 'lucide-react';

const LISTAS_CONFIG = [
    { id: 'personasPoliticamenteExpuestas', label: 'Personas Políticamente Expuestas' },
    { id: 'lpbNacional', label: 'LPB Nacional' },
    { id: 'lpbInternacionalPersonas', label: 'LPB Internacional Personas' },
    { id: 'lpbInternacionalEntidades', label: 'LPB Internacional Entidades' },
    { id: 'listaOfac', label: 'Lista OFAC' },
    { id: 'listaPgr', label: 'Lista PGR' },
    { id: 'lista69Bis', label: 'Lista 69 BIS' },
    { id: 'pepsExtranjeros', label: 'PEPS Extranjeros' },
    { id: 'pepsYEmpresasOtroRiesgo', label: 'PEPS y Empresas Otro Riesgo' },
    { id: 'pepsNac', label: 'PEPS Nac' },
    { id: 'bloqueada', label: 'Bloqueada' },
    { id: 'listaVenc', label: 'Lista VENC' },
    { id: 'listaNuevaStori', label: 'Lista Nueva Stori' },
    { id: 'listaPpe', label: 'Lista PPE' },
    { id: 'listaPepint', label: 'Lista PEPINT' },
];

// Modal reutilizable
const Modal = ({ isOpen, onClose, icon, title, message, actions }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-8 w-[380px] text-center">
                <div className="flex justify-center mb-4">{icon}</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 mb-6">{message}</p>
                <div className="flex gap-3 justify-center">{actions}</div>
            </div>
        </div>
    );
};

const PLDScreens = () => {
    const [activeTab, setActiveTab] = useState('registro');
    const [formData, setFormData] = useState({
        nombreCompleto: '', rfcCurp: '', fechaNacimiento: '',
        alias: '', fechaListado: '', acuerdo: '', nombreDocumento: '',
    });
    const [listasData, setListasData] = useState(
        LISTAS_CONFIG.reduce((acc, curr) => ({ ...acc, [curr.id]: false }), {})
    );

    // Estado de modales
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleToggleChange = (id) => {
        setListasData(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleSave = () => {
        // Tu lógica de guardado aquí
        setShowSaveModal(true);
    };
    const handleDelete = () => {
        // Tu lógica de eliminación aquí
        setShowDeleteModal(false);
    };
    const handleCancel = () => {
        // Tu lógica de cancelación aquí
        setShowCancelModal(false);
        setFormData({ nombreCompleto: '', rfcCurp: '', fechaNacimiento: '', alias: '', fechaListado: '', acuerdo: '', nombreDocumento: '' });
    };
    const handleEdit = () => {
        // Tu lógica de edición aquí
        setActiveTab('registro');
    };

    const InputField = ({ label, name, type = "text", placeholder }) => (
        <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-600">
                {label} <span className="text-red-500">*</span>
            </label>
            <input
                type={type} name={name} value={formData[name] || ''}
                onChange={handleInputChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder={placeholder}
            />
        </div>
    );

    const RenderToggle = ({ id, label }) => (
        <div className="flex flex-col items-start space-y-2 group">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider group-hover:text-blue-600 transition-colors">
                {label}
            </label>
            <button
                type="button" onClick={() => handleToggleChange(id)}
                className={`${listasData[id] ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
            >
                <span className={`${listasData[id] ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`} />
            </button>
        </div>
    );

    const navItems = [
        { id: 'registro', label: 'Registro PLD', Icon: User },
        { id: 'listas', label: 'Listas PLD', Icon: List },
    ];

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-8 bg-gray-50 min-h-screen">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white">
                    <h2 className="text-lg font-medium text-gray-700">
                        Registro <span className="text-gray-400 font-normal">PLD</span>
                    </h2>
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                </div>

                <div className="flex flex-col md:flex-row">
                    {/* Sidebar */}
                    <div className="w-full md:w-64 bg-gray-50 border-r border-gray-100 p-4 space-y-2">
                        {navItems.map(({ id, label, Icon }) => (
                            <button key={id} onClick={() => setActiveTab(id)}
                                className={`w-full flex items-center space-x-3 px-4 py-2 text-sm rounded-lg transition-colors ${activeTab === id ? 'font-semibold text-white bg-blue-600 shadow-md shadow-blue-100' : 'text-gray-500 hover:bg-gray-100'}`}
                            >
                                <Icon className="w-4 h-4" />
                                <span>{label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Contenido */}
                    <div className="flex-1 p-8 min-h-[400px]">
                        {activeTab === 'registro' && (
                            <div>
                                <h3 className="text-xl font-semibold text-blue-700 mb-8 border-b border-blue-50 pb-2">
                                    Información General de Registro
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputField label="Nombre Completo" name="nombreCompleto" placeholder="Ingresa nombre completo" />
                                    <InputField label="RFC o CURP" name="rfcCurp" placeholder="RFC o CURP" />
                                    <InputField label="Fecha de Nacimiento" name="fechaNacimiento" type="date" />
                                    <InputField label="Alias" name="alias" placeholder="Alias" />
                                    <InputField label="Fecha de Listado" name="fechaListado" type="date" />
                                    <InputField label="Acuerdo" name="acuerdo" placeholder="Acuerdo" />
                                    <InputField label="Nombre del Documento" name="nombreDocumento" placeholder="Nombre del Documento" />
                                </div>
                            </div>
                        )}
                        {activeTab === 'listas' && (
                            <div>
                                <h3 className="text-xl font-semibold text-blue-700 mb-8 border-b border-blue-50 pb-2">
                                    Listas PLD
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                                    {LISTAS_CONFIG.map((lista) => (
                                        <RenderToggle key={lista.id} id={lista.id} label={lista.label} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Barra de acciones */}
                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                    <button onClick={() => setShowDeleteModal(true)}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors">
                        <Trash2 className="w-4 h-4" /> Eliminar
                    </button>
                    <button onClick={handleEdit}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors">
                        Editar
                    </button>
                    <button onClick={() => setShowCancelModal(true)}
                        className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                        Cancelar
                    </button>
                    <button onClick={handleSave}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                        Guardar
                    </button>
                </div>
            </div>

            {/* Modal: Guardado exitoso */}
            <Modal
                isOpen={showSaveModal}
                onClose={() => setShowSaveModal(false)}
                icon={
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                        <Check className="w-6 h-6 text-green-600" />
                    </div>
                }
                title="Registro guardado"
                message="El registro PLD se ha guardado correctamente."
                actions={
                    <button onClick={() => setShowSaveModal(false)}
                        className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                        Aceptar
                    </button>
                }
            />

            {/* Modal: Confirmar eliminación */}
            <Modal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                icon={
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                        <Trash2 className="w-6 h-6 text-red-600" />
                    </div>
                }
                title="¿Eliminar registro?"
                message="Esta acción no se puede deshacer. ¿Confirmas que deseas eliminar este registro PLD?"
                actions={<>
                    <button onClick={() => setShowDeleteModal(false)}
                        className="px-5 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100">
                        Cancelar
                    </button>
                    <button onClick={handleDelete}
                        className="px-5 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700">
                        Eliminar
                    </button>
                </>}
            />

            {/* Modal: Confirmar cancelación */}
            <Modal
                isOpen={showCancelModal}
                onClose={() => setShowCancelModal(false)}
                icon={
                    <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                        <AlertTriangle className="w-6 h-6 text-yellow-600" />
                    </div>
                }
                title="¿Cancelar cambios?"
                message="Los cambios no guardados se perderán. ¿Deseas continuar?"
                actions={<>
                    <button onClick={() => setShowCancelModal(false)}
                        className="px-5 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100">
                        Seguir editando
                    </button>
                    <button onClick={handleCancel}
                        className="px-5 py-2 text-sm font-medium text-white bg-yellow-500 rounded-lg hover:bg-yellow-600">
                        Sí, cancelar
                    </button>
                </>}
            />
        </div>
    );
};

export default PLDScreens;