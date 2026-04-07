import React, { useState } from 'react';
import { ChevronDown, User, List, Database } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

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

const PLDScreens = () => {
    const [activeTab, setActiveTab] = useState('registro'); // 'registro', 'listas', o 'datos'
    const [formData, setFormData] = useState({
        nombreCompleto: '',
        rfcCurp: '',
        fechaNacimiento: '',
    });
    const navigate = useNavigate();
    const location = useLocation();

    const [listasData, setListasData] = useState(
        LISTAS_CONFIG.reduce((acc, curr) => ({ ...acc, [curr.id]: false }), {})
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleToggleChange = (id) => {
        setListasData(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const goBack = () => {
        console.log("Ejecutando navegación de salida...");
        navigate(setActiveTab('noResults'));

        setTimeout(() => {
            if (window.location.pathname.includes('transactional')) {
                navigate('/');
            }
        }, 100);
    };

    // Componentes de UI Reutilizables
    const InputField = ({ label, name, type = "text", placeholder }) => (
        <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-600">
                {label} <span className="text-red-500">*</span>
            </label>
            <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder={placeholder}
            />
        </div>
    );

    const RenderToggle = ({ id, label }) => (
        <div className="flex flex-col items-start space-y-2 group">
            <label htmlFor={id} className="text-xs font-semibold text-gray-500 uppercase tracking-wider group-hover:text-blue-600 transition-colors">
                {label}
            </label>
            <button
                type="button"
                onClick={() => handleToggleChange(id)}
                className={`${listasData[id] ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
            >
                <span className={`${listasData[id] ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`} />
            </button>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-8 bg-gray-50 min-h-screen">

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Header Superior Común */}
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white">
                    <h2 className="text-lg font-medium text-gray-700">
                        Registro <span className="text-gray-400 font-normal">PLD</span>
                    </h2>
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                </div>

                <div className="flex flex-col md:flex-row">
                    {/* Menú Lateral */}
                    <div className="w-full md:w-64 bg-gray-50 border-r border-gray-100 p-4 space-y-2">
                        <button
                            onClick={() => setActiveTab('registro')}
                            className={`w-full flex items-center space-x-3 px-4 py-2 text-sm rounded-lg transition-colors ${activeTab === 'registro' ? 'font-semibold text-white bg-blue-600 shadow-md shadow-blue-100' : 'text-gray-500 hover:bg-gray-100'}`}
                        >
                            <User className="w-4 h-4" />
                            <span>Registro PLD</span>
                        </button>

                        <button
                            onClick={() => setActiveTab('listas')}
                            className={`w-full flex items-center space-x-3 px-4 py-2 text-sm rounded-lg transition-colors ${activeTab === 'listas' ? 'font-semibold text-white bg-blue-600 shadow-md shadow-blue-100' : 'text-gray-500 hover:bg-gray-100'}`}
                        >
                            <List className="w-4 h-4" />
                            <span>Listas PLD</span>
                        </button>

                        <button
                            onClick={() => setActiveTab('datos')}
                            className={`w-full flex items-center space-x-3 px-4 py-2 text-sm rounded-lg transition-colors ${activeTab === 'datos' ? 'font-semibold text-white bg-blue-600 shadow-md shadow-blue-100' : 'text-gray-500 hover:bg-gray-100'}`}
                        >
                            <Database className="w-4 h-4" />
                            <span>Datos PLD</span>
                        </button>
                    </div>

                    {/* Contenido Dinámico (Cambia según activeTab) */}
                    <div className="flex-1 p-8 min-h-[400px]">
                        {activeTab === 'registro' && (
                            <div className="animate-in fade-in duration-300">
                                <h3 className="text-xl font-semibold text-blue-700 mb-8 border-b border-blue-50 pb-2">
                                    Información General de Registro
                                </h3>
                                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputField label="Nombre Completo" name="nombreCompleto" placeholder="Ingresa nombre completo" />
                                    <InputField label="RFC o CURP" name="rfcCurp" placeholder="RFC o CURP" />
                                    <InputField label="Fecha de Nacimiento" name="fechaNacimiento" type="date" />
                                </form>
                            </div>
                        )}

                        {activeTab === 'listas' && (
                            <div className="animate-in fade-in duration-300">
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

                        {activeTab === 'datos' && (
                            <div className="flex items-center justify-center h-full text-gray-400">
                                <p>Contenido de Datos PLD (Próximamente)</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
            <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                onClick={goBack} // Ejecuta la función directamente
            >
                guardar
            </button>

            <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                onClick={goBack} // Ejecuta la función directamente
            >
                cancelar
            </button>
        </div>
    );
};

export default PLDScreens;