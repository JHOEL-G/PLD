import { CheckCircle } from "lucide-react";
import { useListarOperacionCliente } from "../hooks/useListarOperacionCliente"
import { AlertCircle } from "lucide-react";
import { Circle } from "lucide-react";
import { useState } from "react";
import { Loader } from "lucide-react";
import { AlertTriangle } from "lucide-react";
import { Users } from "lucide-react";
import { Search } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

const statusConfig = {
    'Completo': { label: 'Completo', icon: CheckCircle, classes: 'bg-[#E4F3F0] text-[#0F6659]' },
    'Pendiente': { label: 'Pendiente', icon: AlertCircle, classes: 'bg-[#FBF3DB] text-[#8A6D00]' },
    'Incompleto': { label: 'Incompleto', icon: AlertCircle, classes: 'bg-[#FBE7E5] text-[#9A2A20]' }
};
const statusFallback = { label: '', icon: Circle, classes: 'bg-slate-100 text-slate-600' };

const riskConfig = {
    'Bajo': { label: 'Bajo', dot: '#0F6659' },
    'Medio': { label: 'Medio', dot: '#A67C00' },
    'Alto': { label: 'Alto', dot: '#9A2A20' }
};
const riskFallback = { label: '', dot: '#6B7280' };

export default function ListarOperacionCliente() {
    const { data: operacion, isLoading, isError, error } = useListarOperacionCliente();

    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('Todos');
    const [filterStatus, setFilterStatus] = useState('Todos');
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F7F5F0]">
                <div className="flex flex-col items-center space-y-3">
                    <Loader className="w-8 h-8 text-[#14213D] animate-spin" />
                    <p className="text-sm text-[#5b5647] font-medium">Cargando clientes...</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F7F5F0]">
                <div className="flex flex-col items-center space-y-3 text-center max-w-md px-4">
                    <AlertTriangle className="w-10 h-10 text-[#9A2A20]" />
                    <h3 className="text-lg font-bold text-[#14213D]">Error al cargar los clientes</h3>
                    <p className="text-sm text-[#5b5647]">{error?.message || 'Ocurrió un error inesperado.'}</p>
                </div>
            </div>
        );
    }

    const clients = operacion ?? [];

    const filteredClients = clients.filter(client => {
        const matchesSearch =
            client.nombreCliente?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.idCliente?.toString().toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'Todos' || client.tipoPersona === filterType;
        const matchesStatus = filterStatus === 'Todos' || client.nombreEstado === filterStatus;
        return matchesSearch && matchesType && matchesStatus;
    });

    return (
        <>
            <div className="min-h-screen font-sans text-slate-800 bg-slate-50/50 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center shadow-sm">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Operaciones</h1>
                                <p className="text-sm text-slate-500 mt-0.5">Alta y captura de clientes, expedientes y cuestionario de riesgo</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 self-end md:self-auto">
                            <div className="hidden sm:flex items-center text-xs font-medium bg-white px-3.5 py-2 rounded-xl border border-slate-200/80 shadow-sm">
                                <span className="text-slate-500 mr-2">Viendo</span>
                                <span className="font-semibold text-slate-900">{filteredClients.length}</span>
                                <span className="text-slate-300 mx-1.5">/</span>
                                <span className="text-slate-500">{clients.length}</span>
                            </div>

                            <button
                                onClick={() => navigate("/agregar-cliente")}
                                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2.5 rounded-xl font-medium text-sm shadow-md shadow-blue-500/15 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0"
                            >
                                <Plus className="w-4 h-4" />
                                Agregar Operación
                            </button>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 mb-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <div className="lg:col-span-1">
                                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Buscar cliente</label>
                                <div className="relative">
                                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        placeholder="Nombre, ID o RFC..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200/80 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Tipo de persona</label>
                                <select
                                    value={filterType}
                                    onChange={(e) => setFilterType(e.target.value)}
                                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200/80 rounded-xl text-sm text-slate-700 font-medium outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer transition-all"
                                >
                                    <option>Todos</option>
                                    <option>Persona Física</option>
                                    <option>Persona Moral</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Estatus</label>
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200/80 rounded-xl text-sm text-slate-700 font-medium outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer transition-all"
                                >
                                    <option>Todos</option>
                                    <option>Completo</option>
                                    <option>Pendiente</option>
                                    <option>Incompleto</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                        {filteredClients.length === 0 ? (
                            <div className="p-16 text-center">
                                <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                                    <Search className="w-6 h-6 text-slate-400" />
                                </div>
                                <h3 className="text-base font-semibold text-slate-900 mb-1">Sin resultados encontrados</h3>
                                <p className="text-slate-500 max-w-sm mx-auto text-sm">Prueba modificando tus filtros de búsqueda para ampliar los resultados.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                                            <th className="px-6 py-3.5">ID cliente</th>
                                            <th className="px-6 py-3.5">Nombre / Razón social</th>
                                            <th className="px-6 py-3.5">Tipo</th>
                                            <th className="px-6 py-3.5">Fecha alta</th>
                                            <th className="px-6 py-3.5">Monto</th>
                                            <th className="px-6 py-3.5">Estatus</th>
                                            <th className="px-6 py-3.5">Nivel riesgo</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {filteredClients.map((client) => {
                                            const status = statusConfig[client.nombreEstado] ?? { ...statusFallback, label: client.nombreEstado };
                                            const risk = riskConfig[client.nombreNivelRiesgo] ?? { ...riskFallback, label: client.nombreNivelRiesgo };
                                            const StatusIcon = status.icon;

                                            return (
                                                <tr key={client.idCliente} className="hover:bg-slate-50/70 transition-colors group">
                                                    <td className="px-6 py-4">
                                                        <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded-md border border-slate-200/60">
                                                            {client.idCliente}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                                                            {client.nombreCliente}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="text-sm text-slate-600">{client.tipoPersona}</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="text-sm text-slate-500">{formatFecha(client.fechaAlta)}</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="text-sm font-medium text-slate-700">
                                                            {formatMonto(client.montoOperacionMensual, client.nombreMoneda)}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${status.classes}`}>
                                                            <StatusIcon className="w-3.5 h-3.5" />
                                                            {status.label}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <span className={`w-2 h-2 rounded-full ${risk.dot}`} />
                                                            <span className="text-sm font-medium text-slate-700">{risk.label}</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    )
}
