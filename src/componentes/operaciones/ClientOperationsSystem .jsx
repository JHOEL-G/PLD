import React, { useState } from 'react';
import { CheckCircle, AlertCircle, Circle, X, Upload, Info } from 'lucide-react';

// Mock data for initial clients
const initialClients = [
    {
        id: 'C001',
        name: 'Juan Pérez García',
        type: 'Persona Física',
        dateAdded: '2024-11-20',
        monthlyOperations: 'Menor a $100,000',
        status: 'Completo',
        riskLevel: 'Bajo'
    },
    {
        id: 'C002',
        name: 'Empresa XYZ SA de CV',
        type: 'Persona Moral',
        dateAdded: '2024-11-18',
        monthlyOperations: 'Menor a $100,000',
        status: 'Pendiente',
        riskLevel: 'Medio'
    },
    {
        id: 'C003',
        name: 'María González López',
        type: 'Persona Física',
        dateAdded: '2024-11-15',
        monthlyOperations: 'Menor a $100,000',
        status: 'Completo',
        riskLevel: 'Bajo'
    },
    {
        id: 'C004',
        name: 'Constructora ABC SA',
        type: 'Persona Moral',
        dateAdded: '2024-11-10',
        monthlyOperations: 'Menor a $100,000',
        status: 'Incompleto',
        riskLevel: 'Alto'
    }
];

const ClientOperations = () => {
    const [clients, setClients] = useState(initialClients);
    const [showNewClientModal, setShowNewClientModal] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('Todos');
    const [filterStatus, setFilterStatus] = useState('Todos');

    // Form state
    const [formData, setFormData] = useState({
        personType: '',
        rfc: '',
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        fechaNacimiento: '',
        curp: '',
        nacionalidad: 'Mexicana',
        actividadEconomica: '',
        tipoIdentificacion: 'INE / IFE',
        numeroIdentificacion: '',
        vigencia: '',
        isPEP: false,
        monthlyOperations: 'Menor a $100,000',
        origenRecursos: '',
        operatesInCash: 'No',
        documents: {
            comprobanteDomicilio: null,
            actaConstitutiva: null,
            poderNotarial: null
        }
    });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleNextStep = () => {
        if (currentStep < 4) setCurrentStep(currentStep + 1);
    };

    const handlePrevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const handleSaveClient = () => {
        // Calculate risk level based on questionnaire
        let riskLevel = 'Bajo';
        if (formData.isPEP || formData.monthlyOperations !== 'Menor a $100,000') {
            riskLevel = 'Medio';
        }
        if (formData.operatesInCash === 'Sí, frecuentemente') {
            riskLevel = 'Alto';
        }

        const newClient = {
            id: `C${String(clients.length + 1).padStart(3, '0')}`,
            name: formData.personType === 'Persona Física'
                ? `${formData.nombre} ${formData.apellidoPaterno} ${formData.apellidoMaterno}`
                : formData.nombre,
            type: formData.personType,
            dateAdded: new Date().toISOString().split('T')[0],
            status: 'Completo',
            riskLevel
        };

        setClients([...clients, newClient]);
        setShowNewClientModal(false);
        setCurrentStep(1);
        setFormData({
            personType: '',
            rfc: '',
            nombre: '',
            apellidoPaterno: '',
            apellidoMaterno: '',
            fechaNacimiento: '',
            curp: '',
            nacionalidad: 'Mexicana',
            actividadEconomica: '',
            tipoIdentificacion: 'INE / IFE',
            numeroIdentificacion: '',
            vigencia: '',
            isPEP: false,
            monthlyOperations: 'Menor a $100,000',
            origenRecursos: '',
            operatesInCash: 'No',
            documents: {
                comprobanteDomicilio: null,
                actaConstitutiva: null,
                poderNotarial: null
            }
        });
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Completo':
                return <CheckCircle className="w-4 h-4" />;
            case 'Pendiente':
                return <AlertCircle className="w-4 h-4" />;
            case 'Incompleto':
                return <AlertCircle className="w-4 h-4" />;
            default:
                return <Circle className="w-4 h-4" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completo':
                return 'bg-emerald-50 text-emerald-700';
            case 'Pendiente':
                return 'bg-amber-50 text-amber-700';
            case 'Incompleto':
                return 'bg-red-50 text-red-700';
            default:
                return 'bg-gray-50 text-gray-700';
        }
    };

    const getRiskColor = (level) => {
        switch (level) {
            case 'Bajo':
                return 'bg-emerald-500';
            case 'Medio':
                return 'bg-amber-500';
            case 'Alto':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    const filteredClients = clients.filter(client => {
        const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'Todos' || client.type === filterType;
        const matchesStatus = filterStatus === 'Todos' || client.status === filterStatus;
        return matchesSearch && matchesType && matchesStatus;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 font-sans">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        
        body {
          font-family: 'DM Sans', sans-serif;
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.5);
        }
        
        .step-indicator {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .step-indicator.active {
          transform: scale(1.05);
        }
        
        .fade-in {
          animation: fadeIn 0.4s ease-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .hover-lift {
          transition: all 0.2s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.15);
        }
        
        input:focus, select:focus, textarea:focus {
          outline: none;
          border-color: #4F46E5;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }
        
        .status-badge {
          transition: all 0.2s ease;
        }
        
        .status-badge:hover {
          transform: scale(1.05);
        }
      `}</style>

            {/* Main Dashboard */}
            <div className="p-8 max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8 fade-in">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-2xl flex items-center justify-center shadow-lg">
                            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Operaciones</h1>
                            <p className="text-gray-600 text-sm mt-1">Alta y Captura de Clientes, Expedientes y Cuestionario de Riesgo</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowNewClientModal(true)}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 flex items-center gap-2"
                    >
                        <span className="text-xl">+</span>
                        Nuevo Cliente
                    </button>
                </div>

                {/* Search and Filters */}
                <div className="glass-card rounded-2xl p-6 shadow-xl mb-6 fade-in">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Buscar Cliente</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Nombre, ID o RFC..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full px-4 py-3 pl-11 border border-gray-200 rounded-xl transition-all"
                                />
                                <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo de Persona</label>
                                <select
                                    value={filterType}
                                    onChange={(e) => setFilterType(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl transition-all"
                                >
                                    <option>Todos</option>
                                    <option>Persona Física</option>
                                    <option>Persona Moral</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Estatus</label>
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl transition-all"
                                >
                                    <option>Todos</option>
                                    <option>Completo</option>
                                    <option>Pendiente</option>
                                    <option>Incompleto</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Clients Table */}
                <div className="glass-card rounded-2xl overflow-hidden shadow-xl fade-in">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">ID Cliente</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Nombre / Razón Social</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Tipo</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Fecha Alta</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Monto</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Estatus</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Nivel Riesgo</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredClients.map((client, index) => (
                                    <tr
                                        key={client.id}
                                        className="hover:bg-blue-50/50 transition-colors cursor-pointer hover-lift"
                                        style={{ animationDelay: `${index * 50}ms` }}
                                    >
                                        <td className="px-6 py-4">
                                            <span className="font-mono font-semibold text-gray-900">{client.id}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">{client.name}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-600">{client.type}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-600">{client.dateAdded}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-600">{client.monthlyOperations}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`status-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold ${getStatusColor(client.status)}`}>
                                                {getStatusIcon(client.status)}
                                                {client.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2.5 h-2.5 rounded-full ${getRiskColor(client.riskLevel)}`}></div>
                                                <span className="text-sm font-medium text-gray-700">{client.riskLevel}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* New Client Modal */}
            {showNewClientModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 fade-in">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
                        {/* Modal Header */}
                        <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 px-8 py-6 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-white">Alta de Nuevo Cliente</h2>
                            <button
                                onClick={() => {
                                    setShowNewClientModal(false);
                                    setCurrentStep(1);
                                }}
                                className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Step Indicators */}
                        <div className="px-8 py-6 bg-gray-50 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                {[
                                    { num: 1, label: 'Datos Generales' },
                                    { num: 2, label: 'Identificación' },
                                    { num: 3, label: 'Cuestionario' },
                                    { num: 4, label: 'Documentos' }
                                ].map((step, idx) => (
                                    <React.Fragment key={step.num}>
                                        <div className={`step-indicator flex items-center gap-3 ${currentStep === step.num ? 'active' : ''}`}>
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${currentStep >= step.num
                                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                                                : 'bg-gray-200 text-gray-500'
                                                }`}>
                                                {step.num}
                                            </div>
                                            <span className={`font-semibold text-sm ${currentStep >= step.num ? 'text-gray-900' : 'text-gray-400'
                                                }`}>
                                                {step.label}
                                            </span>
                                        </div>
                                        {idx < 3 && (
                                            <div className={`flex-1 h-0.5 mx-2 transition-all ${currentStep > step.num ? 'bg-indigo-600' : 'bg-gray-200'
                                                }`}></div>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>

                        {/* Form Content */}
                        <div className="px-8 py-6 overflow-y-auto max-h-[50vh]">
                            {/* Step 1: General Data */}
                            {currentStep === 1 && (
                                <div className="space-y-5 fade-in">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Tipo de Persona <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            value={formData.personType}
                                            onChange={(e) => handleInputChange('personType', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl transition-all"
                                        >
                                            <option value="">Seleccione...</option>
                                            <option>Persona Física</option>
                                            <option>Persona Moral</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            RFC <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="XAXX010101000"
                                            value={formData.rfc}
                                            onChange={(e) => handleInputChange('rfc', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Nombre Completo <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.nombre}
                                            onChange={(e) => handleInputChange('nombre', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl transition-all"
                                        />
                                    </div>

                                    {formData.personType === 'Persona Física' && (
                                        <>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Apellido Paterno <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.apellidoPaterno}
                                                    onChange={(e) => handleInputChange('apellidoPaterno', e.target.value)}
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl transition-all"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Apellido Materno</label>
                                                <input
                                                    type="text"
                                                    value={formData.apellidoMaterno}
                                                    onChange={(e) => handleInputChange('apellidoMaterno', e.target.value)}
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl transition-all"
                                                />
                                            </div>
                                        </>
                                    )}

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Fecha de Nacimiento <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="dd/mm/aaaa"
                                            value={formData.fechaNacimiento}
                                            onChange={(e) => handleInputChange('fechaNacimiento', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">CURP</label>
                                        <input
                                            type="text"
                                            value={formData.curp}
                                            onChange={(e) => handleInputChange('curp', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Nivel de Riesgo <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            value={formData.riskLevel}
                                            onChange={(e) => handleInputChange('riskLevel', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl transition-all"
                                        >
                                            <option value="">Seleccione...</option>
                                            <option>Bajo</option>
                                            <option>Medio</option>
                                            <option>Alto</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Nacionalidad <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            value={formData.nacionalidad}
                                            onChange={(e) => handleInputChange('nacionalidad', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl transition-all"
                                        >
                                            <option>Mexicana</option>
                                            <option>Estadounidense</option>
                                            <option>Canadiense</option>
                                            <option>Otra</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Actividad Económica <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            value={formData.actividadEconomica}
                                            onChange={(e) => handleInputChange('actividadEconomica', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl transition-all"
                                        >
                                            <option value="">Seleccione...</option>
                                            <option>Comercio</option>
                                            <option>Servicios</option>
                                            <option>Construcción</option>
                                            <option>Manufactura</option>
                                            <option>Tecnología</option>
                                            <option>Otra</option>
                                        </select>
                                    </div>

                                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">
                                        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                        <p className="text-sm text-blue-800">
                                            Los campos marcados con <span className="text-red-500 font-semibold">*</span> son obligatorios para continuar con el registro.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Identification */}
                            {currentStep === 2 && (
                                <div className="space-y-5 fade-in">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Identificación Oficial</h3>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Tipo de Identificación <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            value={formData.tipoIdentificacion}
                                            onChange={(e) => handleInputChange('tipoIdentificacion', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl transition-all"
                                        >
                                            <option>INE / IFE</option>
                                            <option>Pasaporte</option>
                                            <option>Licencia de Conducir</option>
                                            <option>Cédula Profesional</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Número de Identificación <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.numeroIdentificacion}
                                            onChange={(e) => handleInputChange('numeroIdentificacion', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Vigencia <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="dd/mm/aaaa"
                                            value={formData.vigencia}
                                            onChange={(e) => handleInputChange('vigencia', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Cargar Identificación <span className="text-red-500">*</span>
                                        </label>
                                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-indigo-400 transition-colors cursor-pointer bg-gray-50">
                                            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                            <p className="text-sm text-gray-600 font-medium mb-1">Click para cargar o arrastra el archivo</p>
                                            <p className="text-xs text-gray-500">PDF, JPG o PNG (máx. 5MB)</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Questionnaire */}
                            {currentStep === 3 && (
                                <div className="space-y-6 fade-in">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-3">
                                            1. ¿Es persona políticamente expuesta (PEP)?
                                        </label>
                                        <div className="space-y-2">
                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    checked={formData.isPEP === true}
                                                    onChange={() => handleInputChange('isPEP', true)}
                                                    className="w-4 h-4 text-indigo-600"
                                                />
                                                <span className="text-gray-700">Sí</span>
                                            </label>
                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    checked={formData.isPEP === false}
                                                    onChange={() => handleInputChange('isPEP', false)}
                                                    className="w-4 h-4 text-indigo-600"
                                                />
                                                <span className="text-gray-700">No</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-3">
                                            2. Monto aproximado de operaciones mensuales
                                        </label>
                                        <select
                                            value={formData.monthlyOperations}
                                            onChange={(e) => handleInputChange('monthlyOperations', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl transition-all"
                                        >
                                            <option>Menor a $100,000</option>
                                            <option>$100,000 - $500,000</option>
                                            <option>$500,000 - $1,000,000</option>
                                            <option>Mayor a $1,000,000</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-3">
                                            3. Origen de los recursos
                                        </label>
                                        <textarea
                                            placeholder="Describa el origen..."
                                            value={formData.origenRecursos}
                                            onChange={(e) => handleInputChange('origenRecursos', e.target.value)}
                                            rows={3}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl transition-all resize-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-3">
                                            4. ¿Realiza operaciones en efectivo?
                                        </label>
                                        <div className="space-y-2">
                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    checked={formData.operatesInCash === 'Sí, frecuentemente'}
                                                    onChange={() => handleInputChange('operatesInCash', 'Sí, frecuentemente')}
                                                    className="w-4 h-4 text-indigo-600"
                                                />
                                                <span className="text-gray-700">Sí, frecuentemente</span>
                                            </label>
                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    checked={formData.operatesInCash === 'Ocasionalmente'}
                                                    onChange={() => handleInputChange('operatesInCash', 'Ocasionalmente')}
                                                    className="w-4 h-4 text-indigo-600"
                                                />
                                                <span className="text-gray-700">Ocasionalmente</span>
                                            </label>
                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    checked={formData.operatesInCash === 'No'}
                                                    onChange={() => handleInputChange('operatesInCash', 'No')}
                                                    className="w-4 h-4 text-indigo-600"
                                                />
                                                <span className="text-gray-700">No</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
                                        <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                        <p className="text-sm text-amber-800">
                                            El sistema calculará automáticamente el nivel de riesgo basado en las respuestas del cuestionario.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Step 4: Documents */}
                            {currentStep === 4 && (
                                <div className="space-y-5 fade-in">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Expediente Digital</h3>

                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="block text-sm font-semibold text-gray-700">
                                                Comprobante de Domicilio
                                            </label>
                                            <span className="text-xs font-semibold text-red-500 bg-red-50 px-2 py-1 rounded">Requerido</span>
                                        </div>
                                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-indigo-400 transition-colors cursor-pointer bg-gray-50">
                                            <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                                            <p className="text-sm text-gray-600 font-medium">Cargar archivo</p>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="block text-sm font-semibold text-gray-700">
                                                Acta Constitutiva (Persona Moral)
                                            </label>
                                            <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">Opcional</span>
                                        </div>
                                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-indigo-400 transition-colors cursor-pointer bg-gray-50">
                                            <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                                            <p className="text-sm text-gray-600 font-medium">Cargar archivo</p>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="block text-sm font-semibold text-gray-700">
                                                Poder Notarial
                                            </label>
                                            <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">Opcional</span>
                                        </div>
                                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-indigo-400 transition-colors cursor-pointer bg-gray-50">
                                            <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                                            <p className="text-sm text-gray-600 font-medium">Cargar archivo</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="block text-sm font-semibold text-gray-700">
                                                RFC
                                            </label>
                                            <span className="text-xs font-semibold text-red-500 bg-red-50 px-2 py-1 rounded">Requerido</span>
                                        </div>
                                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-indigo-400 transition-colors cursor-pointer bg-gray-50">
                                            <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                                            <p className="text-sm text-gray-600 font-medium">Cargar archivo</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="block text-sm font-semibold text-gray-700">
                                                Identificación Oficial
                                            </label>
                                            <span className="text-xs font-semibold text-red-500 bg-red-50 px-2 py-1 rounded">Requerido</span>
                                        </div>
                                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-indigo-400 transition-colors cursor-pointer bg-gray-50">
                                            <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                                            <p className="text-sm text-gray-600 font-medium">Cargar archivo</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="px-8 py-6 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                            <button
                                onClick={handlePrevStep}
                                disabled={currentStep === 1}
                                className="px-6 py-2.5 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Anterior
                            </button>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => {
                                        setShowNewClientModal(false);
                                        setCurrentStep(1);
                                    }}
                                    className="px-6 py-2.5 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                                >
                                    Cancelar
                                </button>

                                {currentStep < 4 ? (
                                    <button
                                        onClick={handleNextStep}
                                        className="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                                    >
                                        Siguiente
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleSaveClient}
                                        className="px-6 py-2.5 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200 flex items-center gap-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Guardar Cliente
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClientOperations;