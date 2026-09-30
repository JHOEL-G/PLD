import { Eye, FileText, User, Building2, Calendar } from 'lucide-react';
import EstadoBadge from './EstadoBadge';
import PrioridadBadge from './PrioridadBadge';
import { formatFecha, formatMonto } from '../../../../utils/getFormant';

function InfoItem({ icon: Icon, iconColor, label, value }) {
    return (
        <div className="flex items-start space-x-3">
            <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm">
                <Icon className={`w-4 h-4 ${iconColor}`} />
            </div>
            <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">{label}</p>
                <p className="text-sm font-semibold text-slate-700 line-clamp-1">{value}</p>
            </div>
        </div>
    );
}

export default function DenunciaCard({ denuncia, onVerDetalle, onAtender }) {
    return (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 p-6 lg:p-8 group">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="text-sm font-black text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg tracking-wider uppercase border border-slate-100">
                            {denuncia.folio}
                        </span>
                        <PrioridadBadge prioridad={denuncia.nombrePrioridad} size="sm" />
                        <EstadoBadge estado={denuncia.nombreEstado} size="sm" />
                    </div>

                    <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-1">
                        {denuncia.tituloDenuncia}
                    </h3>
                    <p className="text-slate-600 mb-6 line-clamp-2 leading-relaxed text-sm">
                        {denuncia.descripcionDetallada}
                    </p>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-50/50 rounded-2xl p-4 border border-slate-100/50">
                        <InfoItem icon={FileText} iconColor="text-indigo-400" label="Clasificación" value={denuncia.nombreTipoDenuncia} />
                        <InfoItem icon={User} iconColor="text-emerald-400" label="Reportante" value={denuncia.clienteInvolucrada} />
                        <InfoItem icon={Building2} iconColor="text-amber-400" label="Sede/Empresa" value={denuncia.nombreEmpresaInvolucrada} />
                        <InfoItem icon={Calendar} iconColor="text-rose-400" label="Fecha Registro" value={formatFecha(denuncia.fechaCreacion)} />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-3 pt-4 lg:pt-0 border-t border-slate-100 lg:border-t-0 min-w-[140px]">
                    <div className="w-full text-center lg:text-right mb-2 lg:mb-4 bg-slate-50 lg:bg-transparent p-3 lg:p-0 rounded-xl">
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Monto Implicado</p>
                        <p className="font-black text-slate-800 text-lg">{formatMonto(denuncia.montoAproximado, denuncia.nombreMoneda)}</p>
                    </div>

                    <button
                        onClick={() => onVerDetalle(denuncia)}
                        className="w-full px-4 py-3 bg-white hover:bg-slate-50 border-2 border-slate-200 text-slate-700 hover:text-indigo-600 text-sm font-bold rounded-xl transition-all flex items-center justify-center space-x-2"
                    >
                        <Eye className="w-4 h-4" />
                        <span>Examinar</span>
                    </button>

                    {denuncia.nombreEstado === 'Pendiente' && (
                        <button
                            onClick={() => onAtender(denuncia.idDenuncias)}
                            className="w-full px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-indigo-200"
                        >
                            Iniciar Atención
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}