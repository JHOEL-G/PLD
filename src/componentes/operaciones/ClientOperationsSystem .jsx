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

        </div>
    );
};

export default ClientOperations;