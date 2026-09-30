import { AlertTriangle, X, FileText, User, Building2, Clock, Upload } from 'lucide-react';
import EstadoBadge from './EstadoBadge';
import PrioridadBadge from './PrioridadBadge';
import { formatFecha, formatMonto } from '../../../../utils/getFormant';
import { statusConfig } from '../../utils/Denunciaconfig';

function DatoItem({ label, icon: Icon, value }) {
    return (
        <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{label}</p>
            <p className="font-bold text-slate-800 flex items-center gap-2">
                <Icon className="w-4 h-4 text-slate-400" />
                {value}
            </p>
        </div>
    );
}

export default function DetalleDenunciaModal({ denuncia, onClose, onOpenUpload, onCambiarEstado }) {
    if (!denuncia) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4 sm:p-6">
            <div className="bg-white rounded-[2rem] max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200 overflow-hidden border border-slate-100">

                <div className="flex-none bg-white border-b border-slate-100 px-8 py-6 flex items-center justify-between sticky top-0 z-10">
                    <div className="flex items-center space-x-5">
                        <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center border border-rose-100/50">
                            <AlertTriangle className="w-7 h-7 text-rose-500" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Expediente de Denuncia</h2>
                            <div className="flex items-center gap-3 mt-1">
                                <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">{denuncia.folio}</span>
                                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                <span className="text-sm font-medium text-slate-400">{formatFecha(denuncia.fechaCreacion)}</span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-3 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-2xl transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/30">

                    <div className="flex flex-wrap items-center gap-3">
                        <PrioridadBadge prioridad={denuncia.nombrePrioridad} />
                        <EstadoBadge estado={denuncia.nombreEstado} />
                    </div>

                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <h3 className="text-2xl font-bold text-slate-800 mb-4 leading-tight">{denuncia.tituloDenuncia}</h3>
                        <div className="prose prose-slate max-w-none">
                            <p className="text-slate-600 leading-relaxed text-base whitespace-pre-wrap">{denuncia.descripcionDetallada}</p>
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
                            <p className="text-indigo-800 font-semibold text-lg">{denuncia.nombreTipoDenuncia}</p>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-3xl p-6 grid grid-cols-2 gap-6 shadow-sm md:col-span-2">
                            <DatoItem label="Reportante Oculto" icon={User} value={denuncia.clienteInvolucrada} />
                            <DatoItem label="Entidad / Empresa" icon={Building2} value={denuncia.nombreEmpresaInvolucrada} />
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Monto Declarado</p>
                                <p className="font-black text-emerald-600 text-lg">
                                    {formatMonto(denuncia.montoAproximado, denuncia.nombreMoneda)}
                                </p>
                            </div>
                            <DatoItem
                                label="Última Modificación"
                                icon={Clock}
                                value={denuncia.fechaActualizacion ? formatFecha(denuncia.fechaActualizacion) : 'Sin cambios'}
                            />
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <div>
                                <h4 className="font-bold text-slate-800 text-lg">Evidencia Documental</h4>
                                <p className="text-sm text-slate-500">Archivos y anexos adjuntos al caso</p>
                            </div>
                            <button
                                onClick={onOpenUpload}
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
                                const isActive = denuncia.nombreEstado === key;
                                const [bgClass, textClass, borderClass] = config.color.split(' ');
                                return (
                                    <button
                                        key={key}
                                        onClick={() => onCambiarEstado(key)}
                                        className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center text-center gap-3
                                        ${isActive
                                                ? `${borderClass} ${bgClass} ${textClass} bg-opacity-20`
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
                        onClick={onClose}
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
}