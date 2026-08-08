import { useState } from "react";
import { useListarBuzonDenuncia } from "../hooks/useListarBuzonDenuncia"
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
    Loader,
    Shield
} from 'lucide-react';
import { formatFecha, formatMonto } from "../../../utils/getFormant";
import { useNavigate } from "react-router-dom";

const statusConfig = {
    'Pendiente': { label: 'Pendiente', color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Clock },
    'Investigando': { label: 'Investigando', color: 'bg-blue-100 text-blue-800 border-blue-200', icon: Loader },
    'Reportada': { label: 'Reportada', color: 'bg-purple-100 text-purple-800 border-purple-200', icon: AlertCircle },
    'Verificada': { label: 'Verificada', color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle },
    'Rechazada': { label: 'Rechazada', color: 'bg-red-100 text-red-800 border-red-200', icon: XCircle }
};
const statusFallback = { label: '', color: 'bg-gray-100 text-gray-800 border-gray-200', icon: AlertCircle };

const prioridadConfig = {
    'Crítica': { label: 'Crítica', color: 'bg-red-700 text-white' },
    'Alta': { label: 'Alta', color: 'bg-red-600 text-white' },
    'Media': { label: 'Media', color: 'bg-orange-500 text-white' },
    'Baja': { label: 'Baja', color: 'bg-gray-500 text-white' }
};
const prioridadFallback = { label: '', color: 'bg-gray-400 text-white' };

export default function ListarBuzonDenuncia() {
    const { data: denuncias, isLoading, isError, error } = useListarBuzonDenuncia();
    const [selectedStatus, setSelectedStatus] = useState('todas');
    const [selectedCompany, setSelectedCompany] = useState('todas');
    const [searchTerm, setSearchTerm] = useState('');
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedDenuncia, setSelectedDenuncia] = useState(null);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center space-y-3">
                    <Loader className="w-8 h-8 text-blue-600 animate-spin" />
                    <p className="text-sm text-gray-600">Cargando denuncias...</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center space-y-3 text-center max-w-md px-4">
                    <AlertTriangle className="w-10 h-10 text-red-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Error al cargar las denuncias</h3>
                    <p className="text-sm text-gray-600">{error?.message || 'Ocurrió un error inesperado.'}</p>
                </div>
            </div>
        );
    }

    const listaDenuncias = denuncias ?? [];

    const empresas = [...new Set(listaDenuncias.map(d => d.nombreEmpresaInvolucrada).filter(Boolean))];

    const filteredDenuncias = listaDenuncias.filter(denuncia => {
        const matchesStatus = selectedStatus === 'todas' || denuncia.nombreEstado === selectedStatus;
        const matchesCompany = selectedCompany === 'todas' || denuncia.nombreEmpresaInvolucrada === selectedCompany;
        const matchesSearch =
            denuncia.tituloDenuncia?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            denuncia.folio?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            denuncia.clienteInvolucrada?.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesStatus && matchesCompany && matchesSearch;
    });

    const handleVerDetalle = (denuncia) => {
        setSelectedDenuncia(denuncia);
        setShowDetailModal(true);
        // Nota: el listado no trae documentos. Si necesitas mostrarlos reales,
        // llama aquí serviceBuzonDenuncia.getObtener(denuncia.idDenuncias)
        // y guarda el detalle completo en el estado antes de abrir el modal.
    };

    const handleAtender = (idDenuncias) => {
        console.log('Atendiendo denuncia:', idDenuncias);
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

    const getStatusCount = (statusLabel) => {
        return listaDenuncias.filter(d => d.nombreEstado === statusLabel).length;
    };

    return (
        <div className="min-h-full font-sans text-slate-900 pb-12">

            { }
            <div className="sticky top-0 z-40 backdrop-blur-md border-b pt-6 pb-4">
                <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md pt-6 pb-4">
                        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/20">
                                        <AlertTriangle className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Centro de Denuncias</h1>
                                        <p className="text-sm font-medium text-slate-500">Gestión confidencial de reportes internos</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="hidden md:flex text-sm bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
                                        <span className="text-slate-500 mr-2">Viendo:</span>
                                        <span className="font-bold text-slate-800">{filteredDenuncias.length}</span>
                                        <span className="text-slate-400 mx-1">/</span>
                                        <span className="font-bold text-slate-800">{listaDenuncias.length}</span>
                                    </div>
                                    <button
                                        onClick={() => navigate('/agregar')}
                                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-lg active:scale-95"
                                    >
                                        <Shield className="w-4 h-4 text-emerald-400" />
                                        Nueva Denuncia
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 pt-[120px]">
                    { }
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                        {Object.entries(statusConfig).map(([key, config]) => {
                            const Icon = config.icon;
                            const count = getStatusCount(key);
                            const isSelected = selectedStatus === key;

                            return (
                                <div
                                    key={key}
                                    onClick={() => setSelectedStatus(isSelected ? 'todas' : key)}
                                    className={`relative overflow-hidden rounded-2xl p-5 border-2 transition-all duration-300 cursor-pointer group
                                    ${isSelected
                                            ? 'border-indigo-500 bg-indigo-50 shadow-md scale-[1.02]'
                                            : 'bg-white border-slate-100 hover:border-slate-300 hover:shadow-lg hover:-translate-y-1'
                                        }`}
                                >
                                    <div className="flex items-center space-x-3 mb-3">
                                        <div className={`p-2 rounded-xl ${config.color.split(' ')[0]} ${config.color.split(' ')[1]}`}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">{config.label}</span>
                                    </div>
                                    <p className="text-3xl font-black text-slate-800">{count}</p>
                                </div>
                            );
                        })}
                    </div>

                    { }
                    <div className="bg-white rounded-3xl border border-slate-200 p-6 mb-8 shadow-sm">
                        <div className="flex items-center space-x-2 mb-6">
                            <div className="p-2 bg-slate-50 rounded-lg">
                                <Filter className="w-5 h-5 text-indigo-500" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-800">Refinar Búsqueda</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Folio, título o involucrado..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all text-sm font-medium placeholder-slate-400"
                                />
                            </div>

                            <div>
                                <select
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all text-sm font-medium cursor-pointer text-slate-700 appearance-none"
                                    style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: `right .5rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.5em 1.5em`, paddingRight: `2.5rem` }}
                                >
                                    <option value="todas">Todos los estados</option>
                                    {Object.entries(statusConfig).map(([key, config]) => (
                                        <option key={key} value={key}>{config.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <select
                                    value={selectedCompany}
                                    onChange={(e) => setSelectedCompany(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all text-sm font-medium cursor-pointer text-slate-700 appearance-none"
                                    style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: `right .5rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.5em 1.5em`, paddingRight: `2.5rem` }}
                                >
                                    <option value="todas">Todas las empresas</option>
                                    {empresas.map(empresa => (
                                        <option key={empresa} value={empresa}>{empresa}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {(selectedStatus !== 'todas' || selectedCompany !== 'todas' || searchTerm) && (
                            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                                <p className="text-sm text-slate-500 font-medium">
                                    Encontramos <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md">{filteredDenuncias.length}</span> coincidencias
                                </p>
                                <button
                                    onClick={() => {
                                        setSelectedStatus('todas');
                                        setSelectedCompany('todas');
                                        setSearchTerm('');
                                    }}
                                    className="text-sm text-indigo-600 hover:text-indigo-800 font-bold transition-colors flex items-center gap-1 bg-indigo-50 px-3 py-1.5 rounded-lg"
                                >
                                    <X className="w-4 h-4" /> Limpiar
                                </button>
                            </div>
                        )}
                    </div>

                    { }
                    <div className="space-y-5">
                        {filteredDenuncias.length === 0 ? (
                            <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center shadow-sm">
                                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Search className="w-10 h-10 text-slate-300" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">Sin resultados a la vista</h3>
                                <p className="text-slate-500 max-w-sm mx-auto">Prueba modificando tus filtros de búsqueda o elimina algunos para ampliar los resultados.</p>
                            </div>
                        ) : (
                            filteredDenuncias.map((denuncia) => {
                                const status = statusConfig[denuncia.nombreEstado] ?? { ...statusFallback, label: denuncia.nombreEstado };
                                const prioridad = prioridadConfig[denuncia.nombrePrioridad] ?? { ...prioridadFallback, label: denuncia.nombrePrioridad };
                                const StatusIcon = status.icon;

                                return (
                                    <div
                                        key={denuncia.idDenuncias}
                                        className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 p-6 lg:p-8 group"
                                    >
                                        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                                            <div className="flex-1">
                                                {/* Cabecera Tarjeta */}
                                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                                    <span className="text-sm font-black text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg tracking-wider uppercase border border-slate-100">
                                                        {denuncia.folio}
                                                    </span>
                                                    <span className={`px-3 py-1.5 text-xs font-bold rounded-lg ${prioridad.color}`}>
                                                        Prioridad {prioridad.label}
                                                    </span>
                                                    <span className={`px-3 py-1.5 text-xs font-bold rounded-lg border ${status.color} flex items-center space-x-1.5`}>
                                                        <StatusIcon className="w-3.5 h-3.5" />
                                                        <span>{status.label}</span>
                                                    </span>
                                                </div>

                                                {/* Info Principal */}
                                                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-1">
                                                    {denuncia.tituloDenuncia}
                                                </h3>
                                                <p className="text-slate-600 mb-6 line-clamp-2 leading-relaxed text-sm">
                                                    {denuncia.descripcionDetallada}
                                                </p>

                                                {/* Grid Datos Estilizado */}
                                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-50/50 rounded-2xl p-4 border border-slate-100/50">
                                                    <div className="flex items-start space-x-3">
                                                        <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm">
                                                            <FileText className="w-4 h-4 text-indigo-400" />
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Clasificación</p>
                                                            <p className="text-sm font-semibold text-slate-700 line-clamp-1">{denuncia.nombreTipoDenuncia}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start space-x-3">
                                                        <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm">
                                                            <User className="w-4 h-4 text-emerald-400" />
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Reportante</p>
                                                            <p className="text-sm font-semibold text-slate-700 line-clamp-1">{denuncia.clienteInvolucrada}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start space-x-3">
                                                        <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm">
                                                            <Building2 className="w-4 h-4 text-amber-400" />
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Sede/Empresa</p>
                                                            <p className="text-sm font-semibold text-slate-700 line-clamp-1">{denuncia.nombreEmpresaInvolucrada}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start space-x-3">
                                                        <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm">
                                                            <Calendar className="w-4 h-4 text-rose-400" />
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Fecha Registro</p>
                                                            <p className="text-sm font-semibold text-slate-700">{formatFecha(denuncia.fechaCreacion)}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            { }
                                            <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-3 pt-4 lg:pt-0 border-t border-slate-100 lg:border-t-0 min-w-[140px]">
                                                <div className="w-full text-center lg:text-right mb-2 lg:mb-4 bg-slate-50 lg:bg-transparent p-3 lg:p-0 rounded-xl">
                                                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Monto Implicado</p>
                                                    <p className="font-black text-slate-800 text-lg">{formatMonto(denuncia.montoAproximado, denuncia.nombreMoneda)}</p>
                                                </div>

                                                <button
                                                    onClick={() => handleVerDetalle(denuncia)}
                                                    className="w-full px-4 py-3 bg-white hover:bg-slate-50 border-2 border-slate-200 text-slate-700 hover:text-indigo-600 text-sm font-bold rounded-xl transition-all flex items-center justify-center space-x-2"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                    <span>Examinar</span>
                                                </button>

                                                {denuncia.nombreEstado === 'Pendiente' && (
                                                    <button
                                                        onClick={() => handleAtender(denuncia.idDenuncias)}
                                                        className="w-full px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-indigo-200"
                                                    >
                                                        Iniciar Atención
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                { }
                {showDetailModal && selectedDenuncia && (() => {
                    const status = statusConfig[selectedDenuncia.nombreEstado] ?? { ...statusFallback, label: selectedDenuncia.nombreEstado };
                    const prioridad = prioridadConfig[selectedDenuncia.nombrePrioridad] ?? { ...prioridadFallback, label: selectedDenuncia.nombrePrioridad };
                    const StatusIcon = status.icon;

                    return (
                        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4 sm:p-6">
                            <div className="bg-white rounded-[2rem] max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200 overflow-hidden border border-slate-100">

                                {/* Modal Header */}
                                <div className="flex-none bg-white border-b border-slate-100 px-8 py-6 flex items-center justify-between sticky top-0 z-10">
                                    <div className="flex items-center space-x-5">
                                        <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center border border-rose-100/50">
                                            <AlertTriangle className="w-7 h-7 text-rose-500" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Expediente de Denuncia</h2>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">{selectedDenuncia.folio}</span>
                                                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                                <span className="text-sm font-medium text-slate-400">{formatFecha(selectedDenuncia.fechaCreacion)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setShowDetailModal(false)}
                                        className="p-3 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-2xl transition-colors"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                {/* Modal Body */}
                                <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/30">

                                    <div className="flex flex-wrap items-center gap-3">
                                        <span className={`px-4 py-2 text-xs font-bold rounded-xl ${prioridad.color}`}>
                                            PRIORIDAD {prioridad.label.toUpperCase()}
                                        </span>
                                        <span className={`px-4 py-2 text-xs font-bold rounded-xl border ${status.color} flex items-center space-x-2`}>
                                            <StatusIcon className="w-4 h-4" />
                                            <span>ESTADO: {status.label.toUpperCase()}</span>
                                        </span>
                                    </div>

                                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                                        <h3 className="text-2xl font-bold text-slate-800 mb-4 leading-tight">{selectedDenuncia.tituloDenuncia}</h3>
                                        <div className="prose prose-slate max-w-none">
                                            <p className="text-slate-600 leading-relaxed text-base whitespace-pre-wrap">{selectedDenuncia.descripcionDetallada}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="bg-indigo-50/50 border border-indigo-100/50 rounded-3xl p-6 md:col-span-1">
                                            <div className="flex items-center space-x-3 mb-4">
                                                <div className="p-2 bg-indigo-100 rounded-xl">
                                                    <FileText className="w-5 h-5 text-indigo-600" />
                                                </div>
                                                <h4 className="font-bold text-indigo-900 text-sm uppercase tracking-wider">Categoría</h4>
                                            </div>
                                            <p className="text-indigo-800 font-semibold text-lg">{selectedDenuncia.nombreTipoDenuncia}</p>
                                        </div>

                                        <div className="bg-white border border-slate-200 rounded-3xl p-6 grid grid-cols-2 gap-6 shadow-sm md:col-span-2">
                                            <div>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Reportante Oculto</p>
                                                <p className="font-bold text-slate-800 flex items-center gap-2">
                                                    <User className="w-4 h-4 text-slate-400" />
                                                    {selectedDenuncia.clienteInvolucrada}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Entidad / Empresa</p>
                                                <p className="font-bold text-slate-800 flex items-center gap-2">
                                                    <Building2 className="w-4 h-4 text-slate-400" />
                                                    {selectedDenuncia.nombreEmpresaInvolucrada}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Monto Declarado</p>
                                                <p className="font-black text-emerald-600 text-lg">
                                                    {formatMonto(selectedDenuncia.montoAproximado, selectedDenuncia.nombreMoneda)}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Última Modificación</p>
                                                <p className="font-bold text-slate-800 flex items-center gap-2">
                                                    <Clock className="w-4 h-4 text-slate-400" />
                                                    {/* Asumiendo que existe formatFechaHora, de lo contrario cambiar por formatFecha */}
                                                    {selectedDenuncia.fechaActualizacion ? formatFecha(selectedDenuncia.fechaActualizacion) : 'Sin cambios'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                            <div>
                                                <h4 className="font-bold text-slate-800 text-lg">Evidencia Documental</h4>
                                                <p className="text-sm text-slate-500">Archivos y anexos adjuntos al caso</p>
                                            </div>
                                            <button
                                                onClick={() => setShowUploadModal(true)}
                                                className="px-5 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-sm font-bold rounded-xl transition-colors flex items-center justify-center space-x-2"
                                            >
                                                <Upload className="w-4 h-4" />
                                                <span>Anexar Documento</span>
                                            </button>
                                        </div>

                                        <div className="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-100">
                                                <FileText className="w-8 h-8 text-slate-300" />
                                            </div>
                                            <p className="text-sm font-bold text-slate-600">El expediente no contiene archivos aún</p>
                                        </div>
                                    </div>

                                    <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                                        <h4 className="font-bold text-slate-800 mb-5 text-lg">Gestión de Estado</h4>
                                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                                            {Object.entries(statusConfig).map(([key, config]) => {
                                                const Icon = config.icon;
                                                const isActive = selectedDenuncia.nombreEstado === key;
                                                return (
                                                    <button
                                                        key={key}
                                                        onClick={() => console.log('Cambiar estado a:', key)}
                                                        className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center text-center gap-3
                                                        ${isActive
                                                                ? `${config.color.split(' ')[2]} ${config.color.split(' ')[0]} ${config.color.split(' ')[1]} bg-opacity-20`
                                                                : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50 text-slate-500'
                                                            }`}
                                                    >
                                                        <Icon className={`w-6 h-6 ${isActive ? '' : 'text-slate-400'}`} />
                                                        <span className="text-xs font-bold uppercase tracking-wider">{config.label}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-none bg-white border-t border-slate-100 px-8 py-5 flex justify-end space-x-4">
                                    <button
                                        onClick={() => setShowDetailModal(false)}
                                        className="px-6 py-3 bg-white border-2 border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-colors"
                                    >
                                        Cerrar Expediente
                                    </button>
                                    <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md shadow-indigo-200 transition-all">
                                        Actualizar Caso
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })()}

                { }
                {showUploadModal && (
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
                        <div className="bg-white rounded-[2rem] max-w-xl w-full shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">

                            <div className="border-b border-slate-100 px-8 py-6 flex items-center justify-between bg-slate-50/50">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600">
                                        <Upload className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-xl font-bold text-slate-800">Anexar Documentación</h2>
                                </div>
                                <button
                                    onClick={() => { setShowUploadModal(false); setUploadedFiles([]); }}
                                    className="p-2 hover:bg-slate-200 rounded-xl transition-colors text-slate-400"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-8 space-y-6">
                                <div className="border-2 border-dashed border-slate-300 bg-slate-50/50 rounded-3xl p-10 text-center hover:bg-indigo-50/50 hover:border-indigo-300 transition-colors group cursor-pointer relative">
                                    <input
                                        type="file"
                                        multiple
                                        onChange={handleFileUpload}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        id="file-upload"
                                    />
                                    <Upload className="w-12 h-12 text-slate-300 group-hover:text-indigo-400 mx-auto mb-4 transition-colors" />
                                    <h3 className="text-lg font-bold text-slate-700 mb-1">Arrastra tus archivos aquí</h3>
                                    <p className="text-sm text-slate-500 mb-6">o haz clic para explorar tu equipo</p>
                                    <label
                                        htmlFor="file-upload"
                                        className="inline-block px-8 py-3 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl shadow-sm cursor-pointer group-hover:border-indigo-200 group-hover:text-indigo-600 transition-colors relative z-20"
                                    >
                                        Examinar Archivos
                                    </label>
                                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-6">Formatos: PDF, DOCX, JPG, PNG (máx. 10MB)</p>
                                </div>

                                {uploadedFiles.length > 0 && (
                                    <div>
                                        <h4 className="font-bold text-slate-800 mb-4 text-sm flex items-center justify-between">
                                            Cola de subida
                                            <span className="bg-indigo-100 text-indigo-700 py-1 px-3 rounded-full text-xs">{uploadedFiles.length}</span>
                                        </h4>
                                        <div className="space-y-3 max-h-56 overflow-y-auto pr-2">
                                            {uploadedFiles.map((file, index) => (
                                                <div key={index} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                                                    <div className="flex items-center space-x-4 overflow-hidden">
                                                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                                            <FileText className="w-5 h-5 text-indigo-500" />
                                                        </div>
                                                        <div className="truncate">
                                                            <p className="text-sm font-bold text-slate-700 truncate">{file.name}</p>
                                                            <p className="text-xs font-medium text-slate-400 mt-0.5">{(file.size / 1024).toFixed(2)} KB</p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => handleRemoveFile(index)}
                                                        className="p-2 hover:bg-rose-50 text-slate-400 hover:text-rose-500 rounded-xl transition-colors flex-shrink-0"
                                                    >
                                                        <X className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="bg-slate-50/50 border-t border-slate-100 px-8 py-5 flex justify-end space-x-4">
                                <button
                                    onClick={() => { setShowUploadModal(false); setUploadedFiles([]); }}
                                    className="px-6 py-3 bg-white border-2 border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={() => {
                                        console.log('Subiendo...', uploadedFiles);
                                        setShowUploadModal(false);
                                        setUploadedFiles([]);
                                    }}
                                    disabled={uploadedFiles.length === 0}
                                    className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-indigo-200"
                                >
                                    Iniciar Subida
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>

    )
}
