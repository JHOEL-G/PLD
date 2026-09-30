import { AlertTriangle, Shield } from 'lucide-react';

export default function PageHeader({ visibleCount, totalCount, onNuevaDenuncia }) {
    return (
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
                        <span className="font-bold text-slate-800">{visibleCount}</span>
                        <span className="text-slate-400 mx-1">/</span>
                        <span className="font-bold text-slate-800">{totalCount}</span>
                    </div>
                    <button
                        onClick={onNuevaDenuncia}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-lg active:scale-95"
                    >
                        <Shield className="w-4 h-4 text-emerald-400" />
                        Nueva Denuncia
                    </button>
                </div>
            </div>
        </div>
    );
}