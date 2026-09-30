import React from 'react';
import { Loader2, AlertTriangle, RefreshCw, ShieldAlert } from 'lucide-react';

export const DataStateHandler = ({
    isLoading,
    isError,
    error,
    loadingMessage = 'Cargando datos del sistema...',
    errorMessage = 'No se pudo establecer conexión con el servidor.',
    onRetry,
    fullScreen = true,
    children,
}) => {
    const containerClasses = fullScreen
        ? 'min-h-[65vh] flex items-center justify-center p-6'
        : 'w-full py-16 flex items-center justify-center p-6';

    if (isLoading) {
        return (
            <div className={containerClasses}>
                <div className="relative flex flex-col items-center justify-center p-8 max-w-sm rounded-3xl bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_20px_50px_rgba(59,130,246,0.12)] transition-all animate-in fade-in zoom-in-95 duration-300">

                    {/* Anillos de Resplandor Neón */}
                    <div className="relative flex items-center justify-center mb-6">
                        <div className="absolute w-20 h-20 rounded-full bg-blue-500/20 blur-xl animate-pulse" />
                        <div className="absolute w-16 h-16 rounded-full border border-blue-400/40 animate-ping opacity-75" />
                        <div className="absolute w-12 h-12 rounded-full border-2 border-indigo-500/30 animate-spin border-t-transparent" />

                        {/* Núcleo Central del Icono */}
                        <div className="relative p-4 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 shadow-lg shadow-blue-500/30 text-white">
                            <Loader2 className="w-7 h-7 animate-spin" />
                        </div>
                    </div>

                    {/* Texto con Estilo Futurista */}
                    <div className="space-y-1.5 text-center">
                        <p className="text-sm font-bold bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-900 bg-clip-text text-transparent tracking-wide">
                            {loadingMessage}
                        </p>
                        <div className="flex items-center justify-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" />
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]" />
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-bounce [animation-delay:0.4s]" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className={containerClasses}>
                <div className="relative flex flex-col items-center text-center max-w-md p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-rose-100 shadow-[0_20px_50px_rgba(244,63,94,0.12)] animate-in fade-in zoom-in-95 duration-300 overflow-hidden">

                    {/* Luz de Fondo Roja Neón */}
                    <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-rose-500/10 blur-2xl" />
                    <div className="absolute -bottom-12 -left-12 w-32 h-32 rounded-full bg-rose-500/10 blur-2xl" />

                    {/* Icono de Alerta con Efecto Neón */}
                    <div className="relative mb-5">
                        <div className="absolute inset-0 rounded-2xl bg-rose-500/20 blur-lg animate-pulse" />
                        <div className="relative p-4 rounded-2xl bg-gradient-to-tr from-rose-600 to-pink-500 shadow-lg shadow-rose-500/30 text-white border border-white/20">
                            <ShieldAlert className="w-7 h-7" />
                        </div>
                    </div>

                    {/* Detalle del Error */}
                    <div className="space-y-2 mb-6">
                        <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                            Error del Sistema
                        </h3>
                        <p className="text-xs font-medium text-slate-500 max-w-xs leading-relaxed">
                            {error?.message || errorMessage}
                        </p>
                    </div>

                    {/* Botón Acción Futurista */}
                    {onRetry && (
                        <button
                            onClick={onRetry}
                            type="button"
                            className="group relative inline-flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-rose-600 via-rose-500 to-pink-500 shadow-md shadow-rose-500/20 hover:shadow-lg hover:shadow-rose-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                        >
                            <RefreshCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500 ease-out" />
                            <span>Reintentar Conexión</span>
                        </button>
                    )}
                </div>
            </div>
        );
    }

    return children || null;
};