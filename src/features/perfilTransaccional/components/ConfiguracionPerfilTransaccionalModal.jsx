import { useState } from "react";
import { X, Info } from "lucide-react";

// ---------------------------------------------------------------------------
// Datos de configuración por defecto — sustituir por los que vengan del API
// ---------------------------------------------------------------------------
const PARAMETROS_INICIALES = [
    {
        id: "evaluarApartirDe",
        label: "Evaluar a partir de",
        tooltip: "Monto a partir del cual se evalúa este parámetro.",
        valor: 77900,
        altoRiesgo: false,
        reporte: false,
        soloValor: true, // este parámetro no tiene toggles en la captura
    },
    {
        id: "montoMaximoPorMes",
        label: "Monto máximo por Mes",
        tooltip: "Monto máximo permitido de operación mensual.",
        valor: 120000,
        altoRiesgo: true,
        reporte: true,
    },
    {
        id: "vecesPagosPorMes",
        label: "Veces pagos por Mes",
        tooltip: "Número máximo de pagos esperados al mes.",
        valor: 4,
        altoRiesgo: false,
        reporte: false,
    },
    {
        id: "finiquitoCredito",
        label: "Finiquito de crédito (Porcentaje en tiempo)",
        tooltip: "Porcentaje del plazo en el que se considera finiquito anticipado.",
        valor: 80,
        altoRiesgo: false,
        reporte: true,
    },
    {
        id: "excedenteSiguienteCiclo",
        label: "Excedente siguiente ciclo",
        tooltip: "Monto excedente que se traslada al siguiente ciclo.",
        valor: 0,
        altoRiesgo: false,
        reporte: false,
    },
    {
        id: "umbralContratoMaximo",
        label: "Umbral Contrato máximo",
        tooltip: "Monto máximo permitido por contrato.",
        valor: 450000,
        altoRiesgo: false,
        reporte: true,
    },
];

const TIPOS_PRODUCTO = ["LINEA DE CREDITO", "CREDITO SIMPLE", "ARRENDAMIENTO"];
const TIPOS_CLIENTE = ["CRÉDITOS INDIVIDUALES", "CRÉDITOS GRUPALES", "PERSONA MORAL"];
const ENCUESTAS = ["PERFIL TRANSACCIONAL", "CONOCE A TU CLIENTE"];

// ---------------------------------------------------------------------------
// UI helpers
// ---------------------------------------------------------------------------
function Toggle({ checked, onChange, color = "emerald" }) {
    const on =
        color === "red"
            ? "bg-red-400"
            : "bg-emerald-500";
    return (
        <button
            type="button"
            onClick={() => onChange(!checked)}
            className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${checked ? on : "bg-slate-200"
                }`}
            aria-pressed={checked}
        >
            <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-5" : "translate-x-0"
                    }`}
            />
        </button>
    );
}

function Select({ label, value, onChange, options }) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-600">{label}</label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 appearance-none"
            >
                {options.map((o) => (
                    <option key={o} value={o}>
                        {o}
                    </option>
                ))}
            </select>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Modal
// ---------------------------------------------------------------------------
export default function ConfiguracionPerfilTransaccionalModal({
    onClose,
    onSave,
    initialConfig,
}) {
    const [tipoProducto, setTipoProducto] = useState(
        initialConfig?.tipoProducto ?? TIPOS_PRODUCTO[0]
    );
    const [tipoCliente, setTipoCliente] = useState(
        initialConfig?.tipoCliente ?? TIPOS_CLIENTE[0]
    );
    const [encuesta, setEncuesta] = useState(initialConfig?.encuesta ?? ENCUESTAS[0]);
    const [parametros, setParametros] = useState(
        initialConfig?.parametros ?? PARAMETROS_INICIALES
    );

    const updateParametro = (id, patch) => {
        setParametros((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
    };

    const handleSave = () => {
        onSave?.({ tipoProducto, tipoCliente, encuesta, parametros });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* backdrop */}
            <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[1px]" onClick={onClose} />

            {/* modal */}
            <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-xl overflow-hidden max-h-[90vh] flex flex-col">
                {/* header */}
                <div className="flex items-center justify-between px-6 py-4 bg-slate-700">
                    <h2 className="text-white text-lg font-semibold">Configuración perfil transaccional</h2>
                    <button
                        onClick={onClose}
                        className="text-white/80 hover:text-white transition"
                        aria-label="Cerrar"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* body */}
                <div className="px-6 py-5 overflow-y-auto space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                        <Select
                            label="Tipo de producto"
                            value={tipoProducto}
                            onChange={setTipoProducto}
                            options={TIPOS_PRODUCTO}
                        />
                        <Select
                            label="Tipo de cliente"
                            value={tipoCliente}
                            onChange={setTipoCliente}
                            options={TIPOS_CLIENTE}
                        />
                        <Select label="Encuesta" value={encuesta} onChange={setEncuesta} options={ENCUESTAS} />
                    </div>

                    <div>
                        <div className="grid grid-cols-[1fr_140px_90px_90px] gap-4 px-1 pb-2 text-sm font-semibold text-slate-500">
                            <span></span>
                            <span>Valor</span>
                            <span>Alto riesgo</span>
                            <span>Reporte</span>
                        </div>

                        <div className="divide-y divide-slate-100 border-t border-slate-100">
                            {parametros.map((p) => (
                                <div
                                    key={p.id}
                                    className="grid grid-cols-[1fr_140px_90px_90px] gap-4 items-center py-3.5 px-1"
                                >
                                    <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-600">
                                        <span>{p.label}</span>
                                        <span title={p.tooltip}>
                                            <Info size={13} className="text-slate-300 shrink-0" />
                                        </span>
                                    </div>

                                    <input
                                        type="number"
                                        value={p.valor}
                                        onChange={(e) =>
                                            updateParametro(p.id, { valor: e.target.value === "" ? "" : Number(e.target.value) })
                                        }
                                        className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400"
                                    />

                                    {p.soloValor ? (
                                        <span />
                                    ) : (
                                        <Toggle
                                            checked={p.altoRiesgo}
                                            onChange={(v) => updateParametro(p.id, { altoRiesgo: v })}
                                            color="red"
                                        />
                                    )}

                                    {p.soloValor ? (
                                        <span />
                                    ) : (
                                        <Toggle
                                            checked={p.reporte}
                                            onChange={(v) => updateParametro(p.id, { reporte: v })}
                                            color="emerald"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* footer */}
                <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 rounded-md border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition"
                    >
                        Cerrar
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-5 py-2 rounded-md bg-sky-600 text-white text-sm font-medium hover:bg-sky-700 transition"
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
}