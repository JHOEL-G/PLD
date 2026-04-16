import React, { useState, useRef } from 'react';
import { Upload, ListChecks, Database, FileUp, Settings2, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

const mockRows = [
    { id: 1, nombre: 'Juan Pérez García', rfc: 'PEGJ800101AAA', lista: 'PLANT PERS BLOQUEADAS', status: 'ok' },
    { id: 2, nombre: 'María López Torres', rfc: 'LOTM750512BBB', lista: 'PLANT PERS BLOQUEADAS', status: 'ok' },
    { id: 3, nombre: 'Roberto Sánchez', rfc: 'SARR920305CCC', lista: 'PLANT PERS BLOQUEADAS', status: 'warn' },
    { id: 4, nombre: 'Ana Martínez', rfc: '—', lista: 'PLANT PERS BLOQUEADAS', status: 'error' },
    { id: 5, nombre: 'Carlos Ruiz Díaz', rfc: 'RUDC881230DDD', lista: 'PLANT PERS BLOQUEADAS', status: 'ok' },
];

const statusBadge = {
    ok: { label: 'Válido', classes: 'bg-emerald-100 text-emerald-800' },
    warn: { label: 'RFC incompleto', classes: 'bg-yellow-100 text-yellow-800' },
    error: { label: 'Sin ID', classes: 'bg-red-100 text-red-800' },
};

const steps = [
    { id: 1, label: 'Subir archivo', icon: FileUp },
    { id: 2, label: 'Detalle de datos', icon: ListChecks },
    { id: 3, label: 'Subir datos', icon: Database },
];

export default function ImportarPasos() {
    const [step, setStep] = useState(1);
    const [fileName, setFileName] = useState('');
    const [progress, setProgress] = useState(0);
    const [logs, setLogs] = useState([]);
    const [done, setDone] = useState(false);
    const intervalRef = useRef(null);

    const handleFile = (e) => {
        if (e.target.files?.[0]) setFileName(e.target.files[0].name);
    };

    const startUpload = () => {
        setProgress(0); setLogs([]); setDone(false);
        const logLines = [
            '[00:00] Conectando con base de datos PLD...',
            '[00:01] Validando estructura de plantilla...',
            '[00:02] Procesando lote 1/5 (50 registros)...',
            '[00:03] Procesando lote 2/5 (50 registros)...',
            '[00:04] Procesando lote 3/5 (50 registros)...',
            '[00:05] Procesando lote 4/5 (50 registros)...',
            '[00:06] Procesando lote 5/5 (47 registros)...',
            '[00:07] Omitiendo 4 registros con errores...',
            '[00:08] Finalizando transacción...',
            '[00:09] ¡Importación exitosa!',
        ];
        let idx = 0;
        intervalRef.current = setInterval(() => {
            idx++;
            setProgress(idx * 10);
            setLogs(prev => [...prev, logLines[idx - 1]]);
            if (idx >= 10) {
                clearInterval(intervalRef.current);
                setTimeout(() => setDone(true), 500);
            }
        }, 500);
    };

    const goStep = (next) => {
        if (next === 3) startUpload();
        setStep(next);
    };

    const reset = () => {
        setStep(1); setFileName(''); setProgress(0); setLogs([]); setDone(false);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-700">Importar listas PLD</h2>
                <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium">
                    <Settings2 className="w-4 h-4" /> Configurar plantilla
                </button>
            </div>

            <div className="p-10 space-y-10">
                {/* Stepper */}
                <div className="flex items-center justify-center max-w-xl mx-auto">
                    {steps.map((s, i) => {
                        const Icon = s.icon;
                        const isActive = step === s.id;
                        const isDone = step > s.id;
                        return (
                            <React.Fragment key={s.id}>
                                <div className="flex flex-col items-center">
                                    <div className={`w-11 h-11 rounded-full flex items-center justify-center border-2 transition-all duration-300
                    ${isDone ? 'bg-emerald-500 border-emerald-500 text-white'
                                            : isActive ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                                                : 'bg-white border-gray-200 text-gray-400'}`}>
                                        {isDone ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                                    </div>
                                    <span className={`mt-2 text-xs whitespace-nowrap font-medium
                    ${isActive || isDone ? 'text-gray-700' : 'text-gray-400'}`}>
                                        {s.label}
                                    </span>
                                </div>
                                {i < steps.length - 1 && (
                                    <div className={`h-0.5 w-20 mx-1 mb-5 transition-all duration-500
                    ${step > s.id ? 'bg-emerald-500' : 'bg-gray-200'}`} />
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>

                {/* ── PASO 1 ── */}
                {step === 1 && (
                    <div className="max-w-2xl mx-auto space-y-5">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                Plantilla de importación
                            </label>
                            <select className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl bg-white focus:border-blue-500 outline-none transition-all text-sm">
                                <option>PLANT PERS BLOQUEADAS</option>
                                <option>PLANT PERS VIGILADAS</option>
                                <option>LISTA NEGRA INTERNA</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                Seleccione un archivo xlsx con los datos de importación
                            </label>
                            <div className={`relative group border-2 border-dashed rounded-xl p-8 text-center transition-all
                ${fileName ? 'border-emerald-400 bg-emerald-50' : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50/50'}`}>
                                <input type="file" accept=".xlsx,.xls,.csv"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    onChange={handleFile} />
                                <Upload className={`w-9 h-9 mx-auto mb-3 transition-colors
                  ${fileName ? 'text-emerald-500' : 'text-gray-300 group-hover:text-blue-500'}`} />
                                {fileName
                                    ? <p className="text-emerald-700 font-semibold text-sm">{fileName}</p>
                                    : <>
                                        <p className="text-blue-600 font-semibold text-sm">Selecciona 1 archivo</p>
                                        <p className="text-xs text-gray-400 mt-1">O arrastra y suelta aquí — xlsx, xls, csv</p>
                                    </>}
                            </div>
                        </div>

                        <div className="flex justify-end pt-2">
                            <button onClick={() => goStep(2)}
                                className="flex items-center gap-2 px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-100 active:scale-95 text-sm">
                                Siguiente <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}

                {/* ── PASO 2 ── */}
                {step === 2 && (
                    <div className="max-w-3xl mx-auto space-y-5">
                        {/* Resumen */}
                        <div className="grid grid-cols-4 gap-3">
                            {[
                                { val: 247, label: 'Total registros', color: 'text-blue-600' },
                                { val: 231, label: 'Válidos', color: 'text-emerald-600' },
                                { val: 12, label: 'Advertencias', color: 'text-yellow-600' },
                                { val: 4, label: 'Errores', color: 'text-red-500' },
                            ].map(c => (
                                <div key={c.label} className="bg-gray-50 rounded-xl p-4">
                                    <p className={`text-2xl font-semibold ${c.color}`}>{c.val}</p>
                                    <p className="text-xs text-gray-500 mt-1">{c.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Tabla */}
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                Vista previa de registros
                            </p>
                            <div className="border border-gray-100 rounded-xl overflow-hidden">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            {['#', 'Nombre', 'RFC / ID', 'Lista', 'Estado'].map(h => (
                                                <th key={h} className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
                                                    {h}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mockRows.map(r => (
                                            <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50/80">
                                                <td className="px-4 py-2.5 text-gray-400">{r.id}</td>
                                                <td className="px-4 py-2.5 text-gray-700 font-medium">{r.nombre}</td>
                                                <td className="px-4 py-2.5 text-gray-500 font-mono text-xs">{r.rfc}</td>
                                                <td className="px-4 py-2.5 text-gray-500 text-xs">{r.lista}</td>
                                                <td className="px-4 py-2.5">
                                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge[r.status].classes}`}>
                                                        {statusBadge[r.status].label}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-xs text-gray-400 mt-2">
                                Mostrando 5 de 247 registros · Los 4 errores serán omitidos al importar
                            </p>
                        </div>

                        <div className="flex justify-between pt-2">
                            <button onClick={() => goStep(1)}
                                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 text-sm font-medium">
                                <ArrowLeft className="w-4 h-4" /> Atrás
                            </button>
                            <button onClick={() => goStep(3)}
                                className="flex items-center gap-2 px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-100 active:scale-95 text-sm">
                                Confirmar e importar <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}

                {/* ── PASO 3 ── */}
                {step === 3 && (
                    <div className="max-w-2xl mx-auto space-y-5">
                        {!done ? (
                            <>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    Subiendo registros a la base de datos PLD
                                </p>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-500">Procesando...</span>
                                        <span className="font-semibold text-gray-700">{progress}%</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-600 rounded-full transition-all duration-300"
                                            style={{ width: `${progress}%` }} />
                                    </div>
                                </div>
                                <div className="border border-gray-100 rounded-xl p-4 font-mono text-xs text-gray-500 space-y-1 max-h-40 overflow-y-auto bg-gray-50">
                                    {logs.map((l, i) => <p key={i}>{l}</p>)}
                                </div>
                                <div className="flex justify-start">
                                    <button disabled
                                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-gray-300 text-sm cursor-not-allowed">
                                        <ArrowLeft className="w-4 h-4" /> Atrás
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-6 space-y-4">
                                <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
                                <div>
                                    <p className="text-xl font-semibold text-gray-700">¡Importación completada!</p>
                                    <p className="text-sm text-gray-500 mt-2">
                                        243 registros importados correctamente.<br />
                                        4 registros con errores fueron omitidos.
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <p className="text-2xl font-semibold text-emerald-600">243</p>
                                        <p className="text-xs text-gray-500 mt-1">Importados</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <p className="text-2xl font-semibold text-red-500">4</p>
                                        <p className="text-xs text-gray-500 mt-1">Omitidos</p>
                                    </div>
                                </div>
                                <button onClick={reset}
                                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-100 active:scale-95 text-sm">
                                    Nueva importación
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}