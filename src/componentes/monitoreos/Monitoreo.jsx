import React, { useState, useEffect } from 'react';
import { Activity, DollarSign, Bell, AlertTriangle, RefreshCw, FileText, Mail, Filter, X, Search, Edit3, CheckCircle, XCircle, Clock, FileSearch } from 'lucide-react';

const Monitoreo = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [showAnonymousForm, setShowAnonymousForm] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [selectedAlert, setSelectedAlert] = useState(null);
    const [newStatus, setNewStatus] = useState("");
    const [statusNotes, setStatusNotes] = useState("");

    // Filtros para alertas
    const [alertFilters, setAlertFilters] = useState({
        cliente: '',
        tipo: 'todos',
        status: 'todos'
    });

    // Formulario de denuncia anónima
    const [anonymousReport, setAnonymousReport] = useState({
        title: '',
        description: '',
        client: '',
        severity: 'MEDIA'
    });

    // Sample data
    const [alerts, setAlerts] = useState([
        { id: 'IN01', type: 'Umbral USD', client: 'Juan Pérez', amount: '$25,000 USD', equivalent: '$431,250 MXN', date: '2024-11-24', status: 'pendiente', action: 'Ver Detalle' },
        { id: 'IN02', type: 'Límite UMAs', client: 'Empresa ABC', amount: '4,500 UMAs', equivalent: 'M$8,565 MXN', date: '2024-11-24', status: 'En revisión', action: 'Ver Detalle' },
        { id: 'IN03', type: 'Umbral USD', client: 'María González', amount: '$15,000 USD', equivalent: '$258,750 MXN', date: '2024-11-25', status: 'Resuelta', action: 'Ver Detalle' },
        { id: 'IN04', type: 'Límite UMAs', client: 'Carlos Ramírez', amount: '3,200 UMAs', equivalent: 'M$6,874 MXN', date: '2024-11-26', status: 'pendiente', action: 'Ver Detalle' },
    ]);

    const [denuncias, setDenuncias] = useState([
        { id: 'DN01', status: 'ALTA', phase: 'Investigación', title: 'Operación Sospechosa', description: 'Múltiples depósitos injustificados', client: 'Carlos Ramírez', date: '2024-11-24' },
        { id: 'DN02', status: 'CRITICA', phase: 'Reportada', title: 'Fraude Potencial', description: 'Documentación inconsistente', client: 'Importadora XYZ', date: '2024-11-23' },
    ]);

    const [expedientes, setExpedientes] = useState([
        { id: 'E001', client: 'Juan Pérez', type: 'Persona Física', docs: '8 docs', lastUpdate: '2024-11-24', expiration: '2025-05-15', status: 'Completo' },
        { id: 'E002', client: 'Empresa ABC SA', type: 'Persona Moral', docs: '12 docs', lastUpdate: '2024-11-20', expiration: '2025-03-20', status: 'Completo' },
        { id: 'E003', client: 'María González', type: 'Persona Física', docs: '6 docs', lastUpdate: '2024-11-15', expiration: '2024-12-10', status: 'Incompleto' },
        { id: 'E004', client: 'Roberto Silva', type: 'Persona Física', docs: '5 docs', lastUpdate: '2024-10-05', expiration: '2024-11-20', status: 'Completo' },
        { id: 'E005', client: 'Tech Corp SA', type: 'Persona Moral', docs: '10 docs', lastUpdate: '2024-09-15', expiration: '2024-11-15', status: 'Completo' },
    ]);

    // Función para verificar si un expediente está vencido
    const checkExpedienteStatus = (expiration, currentStatus) => {
        const today = new Date();
        const expirationDate = new Date(expiration);

        if (expirationDate < today && currentStatus === 'Completo') {
            return 'Vencido';
        }
        return currentStatus;
    };

    // Actualizar status de expedientes al montar el componente
    useEffect(() => {
        const updatedExpedientes = expedientes.map(exp => ({
            ...exp,
            status: checkExpedienteStatus(exp.expiration, exp.status)
        }));
        setExpedientes(updatedExpedientes);
    }, []);

    // Filtrar alertas
    const filteredAlerts = alerts.filter(alert => {
        const matchCliente = alert.client.toLowerCase().includes(alertFilters.cliente.toLowerCase());
        const matchTipo = alertFilters.tipo === 'todos' || alert.type === alertFilters.tipo;
        const matchStatus = alertFilters.status === 'todos' || alert.status === alertFilters.status;

        return matchCliente && matchTipo && matchStatus;
    });

    // Contar denuncias pendientes
    const denunciasPendientes = denuncias.filter(d =>
        d.phase === 'Investigación' || d.phase === 'Reportada'
    ).length;

    // Función para enviar denuncia anónima
    const handleAnonymousSubmit = (e) => {
        e.preventDefault();

        const newDenuncia = {
            id: `DN${String(denuncias.length + 1).padStart(2, '0')}`,
            status: anonymousReport.severity,
            phase: 'Investigación',
            title: anonymousReport.title,
            description: anonymousReport.description,
            client: anonymousReport.client || 'Anónimo',
            date: new Date().toISOString().split('T')[0]
        };

        setDenuncias([...denuncias, newDenuncia]);
        setShowAnonymousForm(false);
        setAnonymousReport({
            title: '',
            description: '',
            client: '',
            severity: 'MEDIA'
        });

        alert('Denuncia anónima enviada exitosamente');
    };

    // Función para limpiar filtros
    const clearFilters = () => {
        setAlertFilters({
            cliente: '',
            tipo: 'todos',
            status: 'todos'
        });
    };

    // Función para abrir modal de cambio de status
    const handleOpenStatusModal = (alert) => {
        setSelectedAlert(alert);
        setNewStatus(alert.status);
        setStatusNotes("");
        setShowStatusModal(true);
    };

    // Función para cambiar el status de una alerta
    const handleStatusChange = () => {
        if (!selectedAlert || !newStatus) return;

        const updatedAlerts = alerts.map((alert) => {
            if (alert.id === selectedAlert.id) {
                return {
                    ...alert,
                    status: newStatus,
                    lastUpdate: new Date().toISOString().split("T")[0],
                    notes: statusNotes,
                };
            }
            return alert;
        });

        setAlerts(updatedAlerts);
        setShowStatusModal(false);
        setSelectedAlert(null);
        setNewStatus("");
        setStatusNotes("");
    };

    // Función para obtener el estilo de badge según el status
    const getStatusBadgeClass = (status) => {
        switch (status.toLowerCase()) {
            case 'pendiente':
                return 'bg-yellow-100 text-yellow-800';
            case 'en revisión':
                return 'bg-blue-100 text-blue-800';
            case 'resuelta':
                return 'bg-green-100 text-green-800';
            case 'verificado':
                return 'bg-blue-100 text-blue-800';
            case 'bloqueado':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Función para obtener el icono según el status
    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'verificado':
                return <CheckCircle className="w-3 h-3 inline mr-1" />;
            case 'bloqueado':
                return <XCircle className="w-3 h-3 inline mr-1" />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                            <Activity className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">Monitoreo</h1>
                            <p className="text-xs text-gray-500">Actualización de Dólar y UMA, Alertas, Denuncias, Expedientes</p>
                        </div>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        <span>Exportar Datos</span>
                    </button>
                </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex space-x-8">
                        <button
                            onClick={() => setActiveTab('dashboard')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'dashboard'
                                ? 'border-orange-500 text-orange-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            <span className="flex items-center space-x-2">
                                <DollarSign className="w-4 h-4" />
                                <span>Dólar y UMA</span>
                            </span>
                        </button>
                        <button
                            onClick={() => setActiveTab('alerts')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'alerts'
                                ? 'border-orange-500 text-orange-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            <span className="flex items-center space-x-2">
                                <Bell className="w-4 h-4" />
                                <span>Alertas</span>
                            </span>
                        </button>
                        <button
                            onClick={() => setActiveTab('denuncias')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors relative ${activeTab === 'denuncias'
                                ? 'border-orange-500 text-orange-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            <span className="flex items-center space-x-2">
                                <AlertTriangle className="w-4 h-4" />
                                <span>Denuncias</span>
                                {denunciasPendientes > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                        {denunciasPendientes}
                                    </span>
                                )}
                            </span>
                        </button>
                        <button
                            onClick={() => setActiveTab('expedientes')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'expedientes'
                                ? 'border-orange-500 text-orange-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            <span className="flex items-center space-x-2">
                                <FileText className="w-4 h-4" />
                                <span>Expedientes</span>
                            </span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Dashboard Tab */}
                {activeTab === 'dashboard' && (
                    <div className="space-y-6">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-blue-100 rounded-lg">
                                            <Activity className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Operaciones Hoy</p>
                                            <p className="text-3xl font-bold text-gray-900 mt-1">156</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-green-100 rounded-lg">
                                            <DollarSign className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Monto Total</p>
                                            <p className="text-3xl font-bold text-gray-900 mt-1">$12,450,000 <span className="text-base font-medium">MXN</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-orange-100 rounded-lg">
                                            <Bell className="w-6 h-6 text-orange-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Alertas Activas</p>
                                            <p className="text-3xl font-bold text-gray-900 mt-1">23</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer hover:border-red-300" onClick={() => setActiveTab('denuncias')}>
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-red-100 rounded-lg relative">
                                            <AlertTriangle className="w-6 h-6 text-red-600" />
                                            {denunciasPendientes > 0 && (
                                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                                    {denunciasPendientes}
                                                </span>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Denuncias Pendientes</p>
                                            <p className="text-3xl font-bold text-gray-900 mt-1">{denunciasPendientes}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Exchange Rate Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* USD Card */}
                            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                            <DollarSign className="w-5 h-5 text-green-600" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900">Tipo de Cambio USD</h3>
                                    </div>
                                    <button className="text-blue-600 hover:text-blue-700">
                                        <RefreshCw className="w-5 h-5" />
                                    </button>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Valor Actual (MXN por USD)</p>
                                    <p className="text-4xl font-bold text-gray-900 mb-4">17.25</p>
                                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                                        <div>
                                            <p>Última Actualización:</p>
                                            <p className="font-medium text-gray-700">Fuentes</p>
                                        </div>
                                        <div className="text-right">
                                            <p>24/10/2024 09:00</p>
                                            <p className="font-medium text-gray-700">Banco de México</p>
                                        </div>
                                    </div>
                                    <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors">
                                        Actualizar Tipo de Cambio
                                    </button>
                                </div>
                            </div>

                            {/* UMA Card */}
                            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <Activity className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900">Valor UMA</h3>
                                    </div>
                                    <button className="text-blue-600 hover:text-blue-700">
                                        <RefreshCw className="w-5 h-5" />
                                    </button>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Valor Diario (MXN)</p>
                                    <p className="text-4xl font-bold text-gray-900 mb-4">108.57</p>
                                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                                        <div>
                                            <p>Última Actualización:</p>
                                            <p className="font-medium text-gray-700">Vigencia</p>
                                        </div>
                                        <div className="text-right">
                                            <p>09/01/2024</p>
                                            <p className="font-medium text-gray-700">Año 2024</p>
                                        </div>
                                    </div>
                                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors">
                                        Actualizar Valor UMA
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Info Box */}
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                            <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0">
                                    <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-blue-900 mb-1">Información Importante</h4>
                                    <p className="text-sm text-blue-800">Los valores actualizados se aplican automáticamente a todas las operaciones y cálculos del sistema. Asegúrese de verificar los valores antes de actualizar.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Alerts Tab */}
                {activeTab === 'alerts' && (
                    <div className="space-y-6">
                        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                            <div className="flex items-start space-x-3">
                                <Bell className="w-5 h-5 text-orange-600 mt-0.5" />
                                <div>
                                    <h4 className="text-sm font-semibold text-orange-900 mb-1">Alertas de Monitoreo</h4>
                                    <p className="text-sm text-orange-800">Avisos generados automáticamente por operaciones que superan los umbrales configurados en dólares o UMAs.</p>
                                </div>
                            </div>
                        </div>

                        {/* Filtros */}
                        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-2">
                                    <Filter className="w-5 h-5 text-gray-600" />
                                    <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
                                </div>
                                <button
                                    onClick={clearFilters}
                                    className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
                                >
                                    <X className="w-4 h-4" />
                                    <span>Limpiar Filtros</span>
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Filtro de Cliente */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Buscar Cliente
                                    </label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            value={alertFilters.cliente}
                                            onChange={(e) => setAlertFilters({ ...alertFilters, cliente: e.target.value })}
                                            placeholder="Nombre del cliente..."
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                {/* Filtro de Tipo */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tipo de Alerta
                                    </label>
                                    <select
                                        value={alertFilters.tipo}
                                        onChange={(e) => setAlertFilters({ ...alertFilters, tipo: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="todos">Todos los tipos</option>
                                        <option value="Umbral USD">Umbral USD</option>
                                        <option value="Límite UMAs">Límite UMAs</option>
                                    </select>
                                </div>

                                {/* Filtro de Status */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Status
                                    </label>
                                    <select
                                        value={alertFilters.status}
                                        onChange={(e) => setAlertFilters({ ...alertFilters, status: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="todos">Todos los status</option>
                                        <option value="pendiente">Pendiente</option>
                                        <option value="En revisión">En revisión</option>
                                        <option value="Resuelta">Resuelta</option>
                                        <option value="Verificado">Verificado</option>
                                        <option value="Bloqueado">Bloqueado</option>
                                    </select>
                                </div>
                            </div>

                            {/* Resultados */}
                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <p className="text-sm text-gray-600">
                                    Mostrando <span className="font-semibold text-gray-900">{filteredAlerts.length}</span> de <span className="font-semibold text-gray-900">{alerts.length}</span> alertas
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equivalente MXN</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estatus</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredAlerts.map((alert) => (
                                            <tr key={alert.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{alert.id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{alert.type}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{alert.client}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{alert.amount}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{alert.equivalent}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{alert.date}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(alert.status)}`}>
                                                        {getStatusIcon(alert.status)}
                                                        {alert.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => handleOpenStatusModal(alert)}
                                                            className="text-orange-600 hover:text-orange-800 font-medium flex items-center space-x-1"
                                                        >
                                                            <Edit3 className="w-3 h-3" />
                                                            <span>Cambiar</span>
                                                        </button>
                                                        <span className="text-gray-300">|</span>
                                                        <button className="text-blue-600 hover:text-blue-800 font-medium">Ver</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Denuncias Tab */}
                {activeTab === 'denuncias' && (
                    <div className="space-y-6">
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                            <div className="flex items-start justify-between">
                                <div className="flex items-start space-x-3">
                                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                                    <div>
                                        <h4 className="text-sm font-semibold text-red-900 mb-1">Registro de Denuncias</h4>
                                        <p className="text-sm text-red-800">Denuncias internas sobre operaciones sospechosas, fraudes potenciales o actividades inusuales detectadas.</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowAnonymousForm(true)}
                                    className="ml-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center space-x-2 whitespace-nowrap"
                                >
                                    <Mail className="w-4 h-4" />
                                    <span>Buzón Anónimo</span>
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {denuncias.map((denuncia) => (
                                <div key={denuncia.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start space-x-4 flex-1">
                                            <div className="flex-shrink-0">
                                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                                    <AlertTriangle className="w-6 h-6 text-red-600" />
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-2 mb-2">
                                                    <span className="text-sm font-semibold text-gray-600">{denuncia.id}</span>
                                                    <span className={`px-2 py-1 text-xs font-bold rounded ${denuncia.status === 'BAJA' ? 'bg-yellow-500 text-white' :
                                                        denuncia.status === 'MEDIA' ? 'bg-orange-500 text-white' :
                                                            denuncia.status === 'ALTA' ? 'bg-orange-600 text-white' :
                                                                'bg-red-600 text-white'
                                                        }`}>
                                                        {denuncia.status}
                                                    </span>
                                                    <span className={`px-2 py-1 text-xs font-medium rounded ${denuncia.phase === 'Investigación' ? 'bg-orange-100 text-orange-800' : 'bg-purple-100 text-purple-800'
                                                        }`}>
                                                        {denuncia.phase}
                                                    </span>
                                                </div>
                                                <h3 className="text-lg font-bold text-gray-900 mb-1">{denuncia.title}</h3>
                                                <p className="text-sm text-gray-600 mb-3">{denuncia.description}</p>
                                                <div className="grid grid-cols-2 gap-4 text-sm">
                                                    <div>
                                                        <p className="text-gray-500">Cliente:</p>
                                                        <p className="font-medium text-gray-900">{denuncia.client}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-500">Fecha de Denuncia:</p>
                                                        <p className="font-medium text-gray-900">{denuncia.date}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="ml-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                                            Ver Detalle
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Expedientes Tab */}
                {activeTab === 'expedientes' && (
                    <div className="space-y-6">
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                            <div className="flex items-start space-x-3">
                                <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
                                <div>
                                    <h4 className="text-sm font-semibold text-blue-900 mb-1">Expedientes Digitales</h4>
                                    <p className="text-sm text-blue-800">Seguimiento del estado de expedientes de clientes, documentación requerida y fechas de vencimiento.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Expediente</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documentos</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Última Actualización</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vencimiento</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estatus</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {expedientes.map((exp) => {
                                            const today = new Date();
                                            const expirationDate = new Date(exp.expiration);
                                            const isExpired = expirationDate < today && exp.status !== 'Incompleto';
                                            const daysUntilExpiration = Math.ceil((expirationDate - today) / (1000 * 60 * 60 * 24));
                                            const isExpiringSoon = daysUntilExpiration <= 30 && daysUntilExpiration > 0;

                                            return (
                                                <tr key={exp.id} className={`hover:bg-gray-50 transition-colors ${isExpired ? 'bg-red-50' : ''}`}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{exp.id}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{exp.client}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{exp.type}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{exp.docs}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{exp.lastUpdate}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                        <div className="flex flex-col">
                                                            <span className={`${isExpired ? 'text-red-600 font-semibold' : isExpiringSoon ? 'text-orange-600 font-semibold' : 'text-gray-600'}`}>
                                                                {exp.expiration}
                                                            </span>
                                                            {isExpiringSoon && !isExpired && (
                                                                <span className="text-xs text-orange-600 mt-1">
                                                                    Vence en {daysUntilExpiration} días
                                                                </span>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${isExpired ? 'bg-red-100 text-red-800' :
                                                            exp.status === 'Completo' ? 'bg-green-100 text-green-800' :
                                                                'bg-yellow-100 text-yellow-800'
                                                            }`}>
                                                            {isExpired ? 'Vencido' : exp.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Leyenda de colores */}
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                            <h4 className="text-sm font-semibold text-gray-900 mb-3">Leyenda de Status</h4>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                <div className="flex items-center space-x-2">
                                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        Completo
                                    </span>
                                    <span className="text-xs text-gray-600">Expediente vigente</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                        Incompleto
                                    </span>
                                    <span className="text-xs text-gray-600">Falta documentación</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                        Vencido
                                    </span>
                                    <span className="text-xs text-gray-600">Requiere actualización</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-orange-600 font-semibold">⚠</span>
                                    <span className="text-xs text-gray-600">Vence en menos de 30 días</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Modal de Buzón Anónimo */}
            {showAnonymousForm && (
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
                                <button
                                    onClick={() => setShowAnonymousForm(false)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        <form onSubmit={handleAnonymousSubmit} className="p-6 space-y-4">
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
                                    value={anonymousReport.title}
                                    onChange={(e) => setAnonymousReport({ ...anonymousReport, title: e.target.value })}
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
                                    value={anonymousReport.description}
                                    onChange={(e) => setAnonymousReport({ ...anonymousReport, description: e.target.value })}
                                    placeholder="Describa los hechos con el mayor detalle posible..."
                                    rows="6"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Cliente Involucrado (Opcional)
                                </label>
                                <input
                                    type="text"
                                    value={anonymousReport.client}
                                    onChange={(e) => setAnonymousReport({ ...anonymousReport, client: e.target.value })}
                                    placeholder="Nombre del cliente si lo conoce"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nivel de Severidad <span className="text-red-600">*</span>
                                </label>
                                <select
                                    value={anonymousReport.severity}
                                    onChange={(e) => setAnonymousReport({ ...anonymousReport, severity: e.target.value })}
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
                                    onClick={() => setShowAnonymousForm(false)}
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
            )}

            {/* Modal de Cambio de Status */}
            {showStatusModal && selectedAlert && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                        <Edit3 className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">
                                            Cambiar Status de Alerta
                                        </h2>
                                        <p className="text-sm text-gray-600">
                                            {selectedAlert.id} - {selectedAlert.client}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowStatusModal(false)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Información de la Alerta */}
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                <h3 className="font-semibold text-gray-900 mb-2">
                                    {selectedAlert.type}
                                </h3>
                                <p className="text-sm text-gray-600 mb-3">
                                    Monto: {selectedAlert.amount} ({selectedAlert.equivalent})
                                </p>
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    <div>
                                        <span className="text-gray-500">Cliente: </span>
                                        <span className="font-medium text-gray-900">{selectedAlert.client}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Status Actual: </span>
                                        <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusBadgeClass(selectedAlert.status)}`}>
                                            {selectedAlert.status}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Selector de Nuevo Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Nuevo Status <span className="text-red-600">*</span>
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => setNewStatus("pendiente")}
                                        className={`p-4 border-2 rounded-lg transition-all ${newStatus === "pendiente"
                                            ? "border-yellow-500 bg-yellow-50"
                                            : "border-gray-200 hover:border-gray-300"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Clock className="w-5 h-5 text-yellow-600" />
                                            <div className="text-left">
                                                <p className="font-semibold text-gray-900">Pendiente</p>
                                                <p className="text-xs text-gray-500">
                                                    Requiere revisión
                                                </p>
                                            </div>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => setNewStatus("En revisión")}
                                        className={`p-4 border-2 rounded-lg transition-all ${newStatus === "En revisión"
                                            ? "border-blue-500 bg-blue-50"
                                            : "border-gray-200 hover:border-gray-300"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <FileSearch className="w-5 h-5 text-blue-600" />
                                            <div className="text-left">
                                                <p className="font-semibold text-gray-900">
                                                    En Revisión
                                                </p>
                                                <p className="text-xs text-gray-500">En proceso</p>
                                            </div>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => setNewStatus("Verificado")}
                                        className={`p-4 border-2 rounded-lg transition-all ${newStatus === "Verificado"
                                            ? "border-blue-500 bg-blue-50"
                                            : "border-gray-200 hover:border-gray-300"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <CheckCircle className="w-5 h-5 text-blue-600" />
                                            <div className="text-left">
                                                <p className="font-semibold text-gray-900">
                                                    Verificado
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Cliente validado
                                                </p>
                                            </div>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => setNewStatus("Bloqueado")}
                                        className={`p-4 border-2 rounded-lg transition-all ${newStatus === "Bloqueado"
                                            ? "border-gray-500 bg-gray-50"
                                            : "border-gray-200 hover:border-gray-300"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <XCircle className="w-5 h-5 text-gray-600" />
                                            <div className="text-left">
                                                <p className="font-semibold text-gray-900">Bloqueado</p>
                                                <p className="text-xs text-gray-500">
                                                    Acceso suspendido
                                                </p>
                                            </div>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => setNewStatus("Resuelta")}
                                        className={`p-4 border-2 rounded-lg transition-all col-span-2 ${newStatus === "Resuelta"
                                            ? "border-green-500 bg-green-50"
                                            : "border-gray-200 hover:border-gray-300"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3 justify-center">
                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                            <div className="text-center">
                                                <p className="font-semibold text-gray-900">Resuelta</p>
                                                <p className="text-xs text-gray-500">
                                                    Alerta cerrada
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </div>

                            {/* Notas */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Notas del Cambio (Opcional)
                                </label>
                                <textarea
                                    value={statusNotes}
                                    onChange={(e) => setStatusNotes(e.target.value)}
                                    placeholder="Ingrese cualquier observación relevante sobre este cambio de status..."
                                    rows="4"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                            </div>

                            {/* Información adicional según el status */}
                            {newStatus === "Verificado" && (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <div className="flex items-start space-x-2">
                                        <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm font-semibold text-blue-900 mb-1">
                                                Cliente Verificado
                                            </p>
                                            <p className="text-sm text-blue-800">
                                                Esta acción marcará al cliente como verificado y
                                                permitirá sus operaciones normalmente.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {newStatus === "Bloqueado" && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                    <div className="flex items-start space-x-2">
                                        <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm font-semibold text-red-900 mb-1">
                                                Cliente Bloqueado
                                            </p>
                                            <p className="text-sm text-red-800">
                                                Esta acción bloqueará las operaciones del cliente hasta
                                                nueva revisión. Se notificará al área correspondiente.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Botones de acción */}
                            <div className="flex space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowStatusModal(false)}
                                    className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="button"
                                    onClick={handleStatusChange}
                                    disabled={!newStatus}
                                    className={`flex-1 px-4 py-3 font-medium rounded-lg transition-colors ${newStatus
                                        ? "bg-orange-600 hover:bg-orange-700 text-white"
                                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        }`}
                                >
                                    Confirmar Cambio
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Monitoreo;