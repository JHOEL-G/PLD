import { useState } from "react";
import {
    AlertTriangle,
    CheckCircle2,
    ChevronRight,
    ListChecks,
    MinusCircle,
    PlusCircle,
    Printer,
} from "lucide-react";
import SectionCard from "./SectionCard";
import DataTable from "./DataTable";
import RiskBadge from "./RiskBadge";
import ListaBloqueada from "./ListaBloqueada";
import { cliente } from "../constants/clienteMock";

export default function PldTab() {
    const [pldSubTab, setPldSubTab] = useState("uif");
    const subTabs = [
        { id: "uif", label: "Listas UIF", icon: AlertTriangle, warn: true },
        { id: "nac", label: "Nacionalidad", icon: CheckCircle2, warn: false },
        { id: "pais", label: "País de nacimiento", icon: CheckCircle2, warn: false },
    ];

    return (
        <div className="space-y-5">
            <SectionCard>
                <div className="flex items-center gap-2 text-slate-500 font-semibold text-sm mb-4">
                    <AlertTriangle size={16} className="text-amber-500" />
                    INFORMACIÓN PLD
                </div>
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-sm text-slate-500">Riesgo :</span>
                    <RiskBadge level={cliente.pld.riesgo} />
                    <button className="text-xs px-3 py-1 rounded border border-slate-200 text-slate-500 hover:bg-slate-50">
                        Cambiar estatus
                    </button>
                </div>
                <div className="px-4 py-2 rounded-md bg-slate-50 text-sm text-slate-600 border border-slate-100 mb-4">
                    {cliente.pld.metodo}
                </div>
                <div className="text-center py-4 space-y-1">
                    <div className="text-sm text-sky-600 flex items-center justify-center gap-1 cursor-pointer hover:underline">
                        Matriz de riesgo <ChevronRight size={14} />
                    </div>
                    <div className="text-sm text-slate-600">
                        <b>Última operación:</b> {cliente.pld.ultimaOperacion}
                    </div>
                    <div className="text-sm text-slate-600">
                        <b>Operación:</b> {cliente.pld.operacion}
                    </div>
                    <div className="text-sm text-slate-600">
                        <b>Valoración :</b>{cliente.pld.valoracion}
                    </div>
                </div>
            </SectionCard>

            <SectionCard>
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-slate-500 font-semibold text-sm">
                        <ListChecks size={16} className="text-slate-400" />
                        Listado de consultas PLD
                    </div>
                    <div className="flex items-center gap-4 text-xs text-sky-600">
                        <button className="flex items-center gap-1 hover:underline"><Printer size={13} />Imprimir</button>
                        <button className="flex items-center gap-1 hover:underline"><Printer size={13} />Imprimir Resumen</button>
                    </div>
                </div>

                <div className="flex items-center gap-6 border-b border-slate-100 mb-4 text-sm">
                    {subTabs.map((t) => (
                        <button
                            key={t.id}
                            onClick={() => setPldSubTab(t.id)}
                            className={`flex items-center gap-1.5 pb-2.5 -mb-px border-b-2 transition ${pldSubTab === t.id
                                ? "border-sky-500 text-sky-600 font-semibold"
                                : "border-transparent text-slate-500 hover:text-slate-700"
                                }`}
                        >
                            <t.icon size={14} className={t.warn ? "text-amber-500" : "text-emerald-500"} />
                            {t.label}
                        </button>
                    ))}
                </div>

                {pldSubTab === "uif" && (
                    <div className="border border-slate-100 rounded-md overflow-hidden">
                        <div className="flex items-center gap-2 px-4 py-3 bg-red-50/50 border-b border-slate-100">
                            <MinusCircle size={16} className="text-red-500" />
                            <span className="text-sm font-semibold text-slate-600">
                                LISTA UIF - Consulta : {cliente.listasUIF.consulta}
                            </span>
                        </div>
                        <div className="px-4 pt-2 pb-1 text-xs text-slate-400">{cliente.listasUIF.fecha}</div>
                        <div className="divide-y divide-slate-100">
                            {cliente.listasUIF.items.map((it) => (
                                <ListaBloqueada key={it} label={it} />
                            ))}
                        </div>
                    </div>
                )}

                {pldSubTab === "nac" && (
                    <div className="space-y-3">
                        {cliente.criteriosPaises.map((c) => (
                            <div key={c.consulta} className="border border-slate-100 rounded-md overflow-hidden">
                                <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border-b border-slate-100">
                                    {c.alerta ? (
                                        <MinusCircle size={16} className="text-red-500" />
                                    ) : (
                                        <PlusCircle size={16} className="text-sky-500" />
                                    )}
                                    <span className="text-sm font-semibold text-slate-600">
                                        LISTA DE CRITERIOS PLD PARA PAISES - Consulta : {c.consulta}
                                    </span>
                                </div>
                                <div className="px-4 pt-2 pb-1 text-xs text-slate-400">{c.fecha}</div>
                                {c.items.length > 0 && (
                                    <div className="divide-y divide-slate-100">
                                        {c.items.map((it) => (
                                            <ListaBloqueada key={it} label={it} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {pldSubTab === "pais" && (
                    <div className="text-center text-slate-400 py-6 text-sm">Sin alertas registradas</div>
                )}
            </SectionCard>

            <SectionCard title="Alertas PLD">
                <DataTable
                    columns={[
                        "Tipo de alerta",
                        "Nombre",
                        "Apellido paterno",
                        "Apellido materno",
                        "Descripción de la operación",
                        "Descripción del reporte",
                        "Nacionalidad",
                        "Fecha de nacimiento",
                        "Dirección",
                        "Colonia",
                        "Colonia/Localidad",
                        "CURP",
                    ]}
                    rows={cliente.alertasPerfil.map((a) => [
                        a.tipoAlerta,
                        a.nombre,
                        a.apellidoPaterno,
                        a.apellidoMaterno,
                        a.descripcionOperacion,
                        a.descripcionReporte,
                        a.nacionalidad,
                        a.fechaNacimiento,
                        a.direccion,
                        a.colonia,
                        a.coloniaLocalidad,
                        a.curp,
                    ])}
                />
            </SectionCard>

            <SectionCard title="Alertas PLD">
                <DataTable
                    columns={[
                        "Nombre de la empresa",
                        "Localidad",
                        "Código postal",
                        "Casfim",
                        "Tipo de operación",
                        "Descripción de la operación",
                        "Instrumento",
                        "Número de contrato",
                        "Folio",
                        "Monto",
                        "Moneda",
                        "Fecha de operación",
                    ]}
                    rows={cliente.alertasOperacion.map((a) => [
                        a.empresa,
                        a.localidad,
                        a.cp,
                        a.casfim || "—",
                        a.tipoOperacion,
                        a.descripcionOperacion,
                        a.instrumento || "—",
                        a.numeroContrato,
                        a.folio,
                        a.monto,
                        a.moneda,
                        a.fechaOperacion,
                    ])}
                />
            </SectionCard>
        </div>
    );
}