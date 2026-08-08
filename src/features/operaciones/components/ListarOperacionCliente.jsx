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
            <div className="min-h-full font-[Inter,sans-serif] text-[#1F2130] bg-[#F7F5F0] pb-12">
                <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@500;600&display=swap');
                .font-display { font-family: 'Fraunces', serif; font-optical-sizing: auto; }
                .font-mono-tag { font-family: 'IBM Plex Mono', monospace; letter-spacing: 0.04em; }
            `}</style>

                <div className="max-w-7xl mx-auto p-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#14213D] rounded-xl flex items-center justify-center shadow-sm">
                                <Users className="w-6 h-6 text-[#E8C05A]" />
                            </div>
                            <div>
                                <h1 className="font-display text-2xl font-semibold text-[#14213D] tracking-tight leading-none">Operaciones</h1>
                                <p className="text-sm text-[#7A7563] mt-1">Alta y captura de clientes, expedientes y cuestionario de riesgo</p>
                            </div>
                        </div>
                        <div className="hidden md:flex items-center text-sm bg-white px-4 py-2 rounded-lg border border-[#E4E0D6]">
                            <span className="text-[#7A7563] mr-2">Viendo</span>
                            <span className="font-mono-tag font-semibold text-[#14213D]">{filteredClients.length}</span>
                            <span className="text-[#C8C2AE] mx-1.5">/</span>
                            <span className="font-mono-tag text-[#7A7563]">{clients.length}</span>
                        </div>
                        <button
                            onClick={() => navigate("/agregar-cliente")}
                        >
                            agregar operacion
                        </button>
                    </div>

                    {/* Búsqueda y filtros */}
                    <div className="bg-white rounded-2xl border border-[#E4E0D6] p-6 mb-6">
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-[#14213D] mb-2">Buscar cliente</label>
                            <div className="relative">
                                <Search className="w-4 h-4 text-[#A7A08A] absolute left-3.5 top-1/2 -translate-y-1/2" />
                                <input
                                    type="text"
                                    placeholder="Nombre, ID o RFC..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F3] border border-[#E4E0D6] rounded-lg focus:ring-2 focus:ring-[#14213D]/15 focus:border-[#14213D] outline-none transition-all text-sm placeholder-[#A7A08A]"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-[#14213D] mb-2">Tipo de persona</label>
                                <select
                                    value={filterType}
                                    onChange={(e) => setFilterType(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-[#FAF8F3] border border-[#E4E0D6] rounded-lg focus:ring-2 focus:ring-[#14213D]/15 focus:border-[#14213D] outline-none transition-all text-sm cursor-pointer"
                                >
                                    <option>Todos</option>
                                    <option>Persona Física</option>
                                    <option>Persona Moral</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-[#14213D] mb-2">Estatus</label>
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-[#FAF8F3] border border-[#E4E0D6] rounded-lg focus:ring-2 focus:ring-[#14213D]/15 focus:border-[#14213D] outline-none transition-all text-sm cursor-pointer"
                                >
                                    <option>Todos</option>
                                    <option>Completo</option>
                                    <option>Pendiente</option>
                                    <option>Incompleto</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Tabla */}
                    <div className="bg-white rounded-2xl border border-[#E4E0D6] overflow-hidden">
                        {filteredClients.length === 0 ? (
                            <div className="p-16 text-center">
                                <div className="w-16 h-16 bg-[#FAF8F3] rounded-full flex items-center justify-center mx-auto mb-5">
                                    <Search className="w-7 h-7 text-[#C8C2AE]" />
                                </div>
                                <h3 className="font-display text-lg font-semibold text-[#14213D] mb-1">Sin resultados a la vista</h3>
                                <p className="text-[#7A7563] max-w-sm mx-auto text-sm">Prueba modificando tus filtros de búsqueda o elimínalos para ampliar los resultados.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-[#FBFAF7] border-b border-[#E4E0D6]">
                                            <th className="px-6 py-4 text-left text-[11px] font-mono-tag font-semibold text-[#7A7563] uppercase">ID cliente</th>
                                            <th className="px-6 py-4 text-left text-[11px] font-mono-tag font-semibold text-[#7A7563] uppercase">Nombre / Razón social</th>
                                            <th className="px-6 py-4 text-left text-[11px] font-mono-tag font-semibold text-[#7A7563] uppercase">Tipo</th>
                                            <th className="px-6 py-4 text-left text-[11px] font-mono-tag font-semibold text-[#7A7563] uppercase">Fecha alta</th>
                                            <th className="px-6 py-4 text-left text-[11px] font-mono-tag font-semibold text-[#7A7563] uppercase">Monto</th>
                                            <th className="px-6 py-4 text-left text-[11px] font-mono-tag font-semibold text-[#7A7563] uppercase">Estatus</th>
                                            <th className="px-6 py-4 text-left text-[11px] font-mono-tag font-semibold text-[#7A7563] uppercase">Nivel riesgo</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#EDEAE0]">
                                        {filteredClients.map((client) => {
                                            const status = statusConfig[client.nombreEstado] ?? { ...statusFallback, label: client.nombreEstado };
                                            const risk = riskConfig[client.nombreNivelRiesgo] ?? { ...riskFallback, label: client.nombreNivelRiesgo };
                                            const StatusIcon = status.icon;

                                            return (
                                                <tr key={client.idCliente} className="hover:bg-[#FAF8F3] transition-colors">
                                                    <td className="px-6 py-4">
                                                        <span className="font-mono-tag text-sm font-semibold text-[#14213D]">{client.idCliente}</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="text-sm font-medium text-[#1F2130]">{client.nombreCliente}</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="text-sm text-[#5b5647]">{client.tipoPersona}</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="text-sm text-[#5b5647]">{formatFecha(client.fechaAlta)}</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="text-sm text-[#5b5647]">{formatMonto(client.montoOperacionMensual, client.nombreMoneda)}</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${status.classes}`}>
                                                            <StatusIcon className="w-3.5 h-3.5" />
                                                            {status.label}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: risk.dot }} />
                                                            <span className="text-sm font-medium text-[#1F2130]">{risk.label}</span>
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
