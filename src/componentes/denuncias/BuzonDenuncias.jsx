import React, { useState } from 'react';
import {
    AlertTriangle,
    Filter,
    Search,
    Eye,
    Upload,
    X,
    FileText,
    User,
    Building2,
    Calendar,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    Loader
} from 'lucide-react';

const BuzonDenuncias = () => {
    const [selectedStatus, setSelectedStatus] = useState('todas');
    const [selectedCompany, setSelectedCompany] = useState('todas');
    const [searchTerm, setSearchTerm] = useState('');
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedDenuncia, setSelectedDenuncia] = useState(null);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    // Sample data
    const denuncias = [
        {
            id: 'DN001',
            titulo: 'Operación Sospechosa',
            descripcion: 'Múltiples depósitos injustificados en cuenta empresarial',
            tipo: 'Lavado de Dinero',
            denunciante: 'Carlos Ramírez',
            empresa: 'Banco Nacional',
            cliente: 'Empresa XYZ S.A.',
            monto: '$450,000 MXN',
            fecha: '2024-11-24',
            fechaActualizacion: '2024-11-26 14:30',
            status: 'investigando',
            prioridad: 'alta',
            documentos: ['reporte_inicial.pdf', 'extracto_bancario.pdf']
        },
        {
            id: 'DN002',
            titulo: 'Fraude Potencial',
            descripcion: 'Documentación inconsistente en apertura de cuenta',
            tipo: 'Fraude Documental',
            denunciante: 'Ana López',
            empresa: 'Financiera del Norte',
            cliente: 'Importadora ABC',
            monto: '$120,000 USD',
            fecha: '2024-11-23',
            fechaActualizacion: '2024-11-23 09:15',
            status: 'pendiente',
            prioridad: 'media',
            documentos: ['identificacion.pdf']
        },
        {
            id: 'DN003',
            titulo: 'Operación Estructurada',
            descripcion: 'Fraccionamiento de operaciones para evitar umbrales',
            tipo: 'Estructuración',
            denunciante: 'Miguel Torres',
            empresa: 'Banco Nacional',
            cliente: 'Juan Pérez',
            monto: '$85,000 MXN',
            fecha: '2024-11-25',
            fechaActualizacion: '2024-11-27 16:45',
            status: 'reportada',
            prioridad: 'alta',
            documentos: ['reporte_cnbv.pdf', 'transacciones.xlsx']
        },
        {
            id: 'DN004',
            titulo: 'Actividad Inusual',
            descripcion: 'Cambios repentinos en patrón de transacciones',
            tipo: 'Actividad Sospechosa',
            denunciante: 'Laura Martínez',
            empresa: 'Casa de Cambio Sur',
            cliente: 'Comercial Beta',
            monto: '$320,000 MXN',
            fecha: '2024-11-20',
            fechaActualizacion: '2024-11-26 11:20',
            status: 'verificada',
            prioridad: 'media',
            documentos: ['analisis_patrones.pdf']
        },
        {
            id: 'DN005',
            titulo: 'Origen de Fondos Dudoso',
            descripcion: 'Cliente no puede justificar origen de recursos',
            tipo: 'Origen de Fondos',
            denunciante: 'Roberto Sánchez',
            empresa: 'Financiera del Norte',
            cliente: 'María González',
            monto: '$200,000 USD',
            fecha: '2024-11-19',
            fechaActualizacion: '2024-11-21 10:00',
            status: 'rechazada',
            prioridad: 'baja',
            documentos: []
        },
    ];

    const empresas = ['Banco Nacional', 'Financiera del Norte', 'Casa de Cambio Sur'];

    const statusConfig = {
        pendiente: { label: 'Pendiente', color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Clock },
        investigando: { label: 'Investigando', color: 'bg-blue-100 text-blue-800 border-blue-200', icon: Loader },
        reportada: { label: 'Reportada', color: 'bg-purple-100 text-purple-800 border-purple-200', icon: AlertCircle },
        verificada: { label: 'Verificada', color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle },
        rechazada: { label: 'Rechazada', color: 'bg-red-100 text-red-800 border-red-200', icon: XCircle }
    };

    const prioridadConfig = {
        alta: { label: 'Alta', color: 'bg-red-600 text-white' },
        media: { label: 'Media', color: 'bg-orange-500 text-white' },
        baja: { label: 'Baja', color: 'bg-gray-500 text-white' }
    };

    // Filter denuncias
    const filteredDenuncias = denuncias.filter(denuncia => {
        const matchesStatus = selectedStatus === 'todas' || denuncia.status === selectedStatus;
        const matchesCompany = selectedCompany === 'todas' || denuncia.empresa === selectedCompany;
        const matchesSearch =
            denuncia.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            denuncia.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            denuncia.cliente.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesStatus && matchesCompany && matchesSearch;
    });

    const handleVerDetalle = (denuncia) => {
        setSelectedDenuncia(denuncia);
        setShowDetailModal(true);
    };

    const handleAtender = (denunciaId) => {
        console.log('Atendiendo denuncia:', denunciaId);
        // Aquí iría la lógica para cambiar el status
    };

    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        setUploadedFiles([...uploadedFiles, ...files]);
    };

    const handleRemoveFile = (index) => {
        const newFiles = uploadedFiles.filter((_, i) => i !== index);
        setUploadedFiles(newFiles);
    };

    const getStatusCount = (status) => {
        return denuncias.filter(d => d.status === status).length;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                                <AlertTriangle className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">Buzón de Denuncias</h1>
                                <p className="text-xs text-gray-500">Gestión y seguimiento de denuncias internas</p>
                            </div>
                        </div>
                        <div className="text-sm text-gray-600">
                            <span className="font-semibold">{filteredDenuncias.length}</span> de <span className="font-semibold">{denuncias.length}</span> denuncias
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                    {Object.entries(statusConfig).map(([key, config]) => {
                        const Icon = config.icon;
                        const count = getStatusCount(key);
                        return (
                            <div
                                key={key}
                                className="bg-white rounded-xl p-4 border-2 border-gray-200 hover:border-gray-300 transition-all cursor-pointer"
                                onClick={() => setSelectedStatus(key)}
                            >
                                <div className="flex items-center space-x-2 mb-2">
                                    <Icon className={`w-4 h-4 ${config.color.split(' ')[1]}`} />
                                    <span className="text-xs font-medium text-gray-600">{config.label}</span>
                                </div>
                                <p className="text-2xl font-bold text-gray-900">{count}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
                    <div className="flex items-center space-x-2 mb-4">
                        <Filter className="w-5 h-5 text-gray-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Buscar por ID, título o cliente..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>

                        {/* Status Filter */}
                        <div>
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                            >
                                <option value="todas">Todos los estados</option>
                                {Object.entries(statusConfig).map(([key, config]) => (
                                    <option key={key} value={key}>{config.label}</option>
                                ))}
                            </select>
                        </div>

                        {/* Company Filter */}
                        <div>
                            <select
                                value={selectedCompany}
                                onChange={(e) => setSelectedCompany(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                            >
                                <option value="todas">Todas las empresas</option>
                                {empresas.map(empresa => (
                                    <option key={empresa} value={empresa}>{empresa}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {(selectedStatus !== 'todas' || selectedCompany !== 'todas' || searchTerm) && (
                        <div className="mt-4 flex items-center justify-between">
                            <p className="text-sm text-gray-600">
                                Mostrando <span className="font-semibold">{filteredDenuncias.length}</span> resultados
                            </p>
                            <button
                                onClick={() => {
                                    setSelectedStatus('todas');
                                    setSelectedCompany('todas');
                                    setSearchTerm('');
                                }}
                                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                            >
                                Limpiar filtros
                            </button>
                        </div>
                    )}
                </div>

                {/* Denuncias List */}
                <div className="space-y-4">
                    {filteredDenuncias.length === 0 ? (
                        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                            <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No se encontraron denuncias</h3>
                            <p className="text-gray-600">Intenta ajustar los filtros de búsqueda</p>
                        </div>
                    ) : (
                        filteredDenuncias.map((denuncia) => {
                            const StatusIcon = statusConfig[denuncia.status].icon;
                            return (
                                <div
                                    key={denuncia.id}
                                    className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all p-6"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            {/* Header */}
                                            <div className="flex items-center space-x-3 mb-3">
                                                <span className="text-sm font-bold text-gray-700">{denuncia.id}</span>
                                                <span className={`px-3 py-1 text-xs font-bold rounded-full ${prioridadConfig[denuncia.prioridad].color}`}>
                                                    {prioridadConfig[denuncia.prioridad].label}
                                                </span>
                                                <span className={`px-3 py-1 text-xs font-semibold rounded-lg border ${statusConfig[denuncia.status].color} flex items-center space-x-1`}>
                                                    <StatusIcon className="w-3 h-3" />
                                                    <span>{statusConfig[denuncia.status].label}</span>
                                                </span>
                                            </div>

                                            {/* Title and Description */}
                                            <h3 className="text-lg font-bold text-gray-900 mb-2">{denuncia.titulo}</h3>
                                            <p className="text-sm text-gray-600 mb-4">{denuncia.descripcion}</p>

                                            {/* Info Grid */}
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                                <div className="flex items-start space-x-2">
                                                    <FileText className="w-4 h-4 text-gray-400 mt-0.5" />
                                                    <div>
                                                        <p className="text-xs text-gray-500">Tipo</p>
                                                        <p className="text-sm font-medium text-gray-900">{denuncia.tipo}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start space-x-2">
                                                    <User className="w-4 h-4 text-gray-400 mt-0.5" />
                                                    <div>
                                                        <p className="text-xs text-gray-500">Cliente</p>
                                                        <p className="text-sm font-medium text-gray-900">{denuncia.cliente}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start space-x-2">
                                                    <Building2 className="w-4 h-4 text-gray-400 mt-0.5" />
                                                    <div>
                                                        <p className="text-xs text-gray-500">Empresa</p>
                                                        <p className="text-sm font-medium text-gray-900">{denuncia.empresa}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start space-x-2">
                                                    <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
                                                    <div>
                                                        <p className="text-xs text-gray-500">Fecha</p>
                                                        <p className="text-sm font-medium text-gray-900">{denuncia.fecha}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Footer */}
                                            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                                <div className="flex items-center space-x-4 text-xs text-gray-500">
                                                    <span>Denunciante: <span className="font-medium text-gray-700">{denuncia.denunciante}</span></span>
                                                    <span>Monto: <span className="font-medium text-gray-700">{denuncia.monto}</span></span>
                                                    <span>Docs: <span className="font-medium text-gray-700">{denuncia.documentos.length}</span></span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="ml-6 flex flex-col space-y-2">
                                            <button
                                                onClick={() => handleVerDetalle(denuncia)}
                                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center space-x-2"
                                            >
                                                <Eye className="w-4 h-4" />
                                                <span>Ver Detalle</span>
                                            </button>
                                            {denuncia.status === 'pendiente' && (
                                                <button
                                                    onClick={() => handleAtender(denuncia.id)}
                                                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                                                >
                                                    Atender
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </main>

            {/* Detail Modal */}
            {showDetailModal && selectedDenuncia && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                    <AlertTriangle className="w-6 h-6 text-red-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Detalle de Denuncia</h2>
                                    <p className="text-sm text-gray-500">{selectedDenuncia.id}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowDetailModal(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 space-y-6">
                            {/* Status and Priority */}
                            <div className="flex items-center space-x-3">
                                <span className={`px-3 py-1 text-xs font-bold rounded-full ${prioridadConfig[selectedDenuncia.prioridad].color}`}>
                                    Prioridad: {prioridadConfig[selectedDenuncia.prioridad].label}
                                </span>
                                <span className={`px-3 py-1 text-xs font-semibold rounded-lg border ${statusConfig[selectedDenuncia.status].color} flex items-center space-x-1`}>
                                    {React.createElement(statusConfig[selectedDenuncia.status].icon, { className: "w-3 h-3" })}
                                    <span>{statusConfig[selectedDenuncia.status].label}</span>
                                </span>
                            </div>

                            {/* Title and Description */}
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{selectedDenuncia.titulo}</h3>
                                <p className="text-gray-700">{selectedDenuncia.descripcion}</p>
                            </div>

                            {/* Type of Complaint */}
                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                <div className="flex items-center space-x-2 mb-2">
                                    <FileText className="w-5 h-5 text-blue-600" />
                                    <h4 className="font-semibold text-blue-900">Tipo de Denuncia</h4>
                                </div>
                                <p className="text-blue-800 font-medium">{selectedDenuncia.tipo}</p>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Cliente Involucrado</p>
                                    <p className="font-medium text-gray-900">{selectedDenuncia.cliente}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Monto</p>
                                    <p className="font-medium text-gray-900">{selectedDenuncia.monto}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Denunciante</p>
                                    <p className="font-medium text-gray-900">{selectedDenuncia.denunciante}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Empresa</p>
                                    <p className="font-medium text-gray-900">{selectedDenuncia.empresa}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Fecha de Denuncia</p>
                                    <p className="font-medium text-gray-900">{selectedDenuncia.fecha}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Última Actualización</p>
                                    <p className="font-medium text-gray-900">{selectedDenuncia.fechaActualizacion}</p>
                                </div>
                            </div>

                            {/* Documents Section */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="font-semibold text-gray-900">Documentos Adjuntos ({selectedDenuncia.documentos.length})</h4>
                                    <button
                                        onClick={() => setShowUploadModal(true)}
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center space-x-2"
                                    >
                                        <Upload className="w-4 h-4" />
                                        <span>Subir Documentos</span>
                                    </button>
                                </div>

                                {selectedDenuncia.documentos.length > 0 ? (
                                    <div className="space-y-2">
                                        {selectedDenuncia.documentos.map((doc, index) => (
                                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                                                <div className="flex items-center space-x-3">
                                                    <FileText className="w-5 h-5 text-gray-600" />
                                                    <span className="text-sm font-medium text-gray-900">{doc}</span>
                                                </div>
                                                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                                    Descargar
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                                        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                        <p className="text-sm text-gray-600">No hay documentos adjuntos</p>
                                    </div>
                                )}
                            </div>

                            {/* Change Status */}
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-3">Cambiar Estado</h4>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {Object.entries(statusConfig).map(([key, config]) => {
                                        const Icon = config.icon;
                                        return (
                                            <button
                                                key={key}
                                                onClick={() => {
                                                    // Update status logic here
                                                    console.log('Changing status to:', key);
                                                }}
                                                className={`p-3 rounded-lg border-2 transition-all ${selectedDenuncia.status === key
                                                        ? config.color + ' border-current'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                    }`}
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <Icon className="w-4 h-4" />
                                                    <span className="text-sm font-medium">{config.label}</span>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end space-x-3">
                            <button
                                onClick={() => setShowDetailModal(false)}
                                className="px-6 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cerrar
                            </button>
                            <button
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                            >
                                Guardar Cambios
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Upload Modal */}
            {showUploadModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full">
                        {/* Upload Modal Header */}
                        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Upload className="w-6 h-6 text-blue-600" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">Subir Documentos</h2>
                            </div>
                            <button
                                onClick={() => {
                                    setShowUploadModal(false);
                                    setUploadedFiles([]);
                                }}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>

                        {/* Upload Modal Content */}
                        <div className="p-6 space-y-6">
                            {/* Drag and Drop Area */}
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition-colors">
                                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Arrastra archivos aquí</h3>
                                <p className="text-sm text-gray-600 mb-4">o haz clic para seleccionar</p>
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleFileUpload}
                                    className="hidden"
                                    id="file-upload"
                                />
                                <label
                                    htmlFor="file-upload"
                                    className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg cursor-pointer transition-colors"
                                >
                                    Seleccionar Archivos
                                </label>
                                <p className="text-xs text-gray-500 mt-3">PDF, DOC, DOCX, XLS, XLSX, PNG, JPG (máx. 10MB)</p>
                            </div>

                            {/* Uploaded Files List */}
                            {uploadedFiles.length > 0 && (
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3">Archivos seleccionados ({uploadedFiles.length})</h4>
                                    <div className="space-y-2 max-h-60 overflow-y-auto">
                                        {uploadedFiles.map((file, index) => (
                                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                                                <div className="flex items-center space-x-3">
                                                    <FileText className="w-5 h-5 text-gray-600" />
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">{file.name}</p>
                                                        <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleRemoveFile(index)}
                                                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                                                >
                                                    <X className="w-4 h-4 text-gray-600" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Upload Modal Footer */}
                        <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end space-x-3">
                            <button
                                onClick={() => {
                                    setShowUploadModal(false);
                                    setUploadedFiles([]);
                                }}
                                className="px-6 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => {
                                    // Upload logic here
                                    console.log('Uploading files:', uploadedFiles);
                                    setShowUploadModal(false);
                                    setUploadedFiles([]);
                                }}
                                disabled={uploadedFiles.length === 0}
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Subir {uploadedFiles.length > 0 && `(${uploadedFiles.length})`}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BuzonDenuncias;