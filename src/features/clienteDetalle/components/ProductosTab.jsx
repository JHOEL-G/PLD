import { Wallet, Printer, ExternalLink, Share2, FileDown } from "lucide-react";
import SectionCard from "./SectionCard";
import KVTable from "./KVTable";
import DataTable from "./DataTable";
import { money } from "../utils/money";
import { cliente } from "../constants/clienteMock";

export default function ProductosTab() {
    const p = cliente.producto;
    return (
        <div className="space-y-5">
            <SectionCard>
                <div className="flex items-center justify-between mb-4">
                    <div className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                        <Wallet size={16} className="text-slate-400" />
                        Agrupamiento de productos
                        <button className="ml-2 flex items-center gap-1 text-xs text-sky-600 hover:underline">
                            <Printer size={13} /> Imprimir
                        </button>
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-slate-50 rounded-md text-sm font-semibold text-slate-600 mb-4">
                    <span>
                        Cliente : {cliente.nombre} &nbsp; Ciclo : {p.ciclo} &nbsp; Crédito : {p.creditoId}
                    </span>
                    <div className="flex items-center gap-3 text-slate-400">
                        <ExternalLink size={15} />
                        <Printer size={15} />
                        <FileDown size={15} />
                        <Share2 size={15} />
                    </div>
                </div>

                <div className="text-sm font-semibold text-slate-600 mb-2">Datos del Producto</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                    <KVTable
                        rows={[
                            ["Cliente", cliente.nombre],
                            ["Crédito", <>{p.creditoId} <span className="text-xs text-slate-400 ml-1">CRÉDITOS INDIVIDUALES</span></>],
                            ["Asesor de Crédito", p.asesor],
                            ["Ciclo", <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-teal-500 text-white text-xs">{p.ciclo}</span>],
                            ["Fecha Desembolso", p.fechaDesembolso],
                            ["Fecha Primer Pago", p.fechaPrimerPago],
                            ["Fecha de Último Pago", p.fechaUltimoPago],
                            ["Estado", <span className="px-2 py-0.5 rounded bg-emerald-500 text-white text-xs font-semibold">{p.estado}</span>],
                            ["Actividad económica", p.actividadEconomica],
                            ["Actividad Económica Personalizada", p.actividadPersonalizada],
                            ["Destino del crédito", p.destinoCredito],
                            ["Destino de Crédito Personalizado", p.destinoPersonalizado],
                            ["Origen de los recursos", p.origenRecursos],
                        ]}
                    />
                    <KVTable
                        rows={[
                            ["Categoría producto", p.categoria],
                            ["Productos Financieros", p.productoFinanciero],
                            ["Cálculo de Interés", p.calculoInteres],
                            ["Frecuencia", p.frecuenciaPagos],
                            ["Número de Pagos", p.numeroPagos],
                            ["Frecuencia ", p.frecuencia],
                            ["Tasa Anual", p.tasaAnual],
                            ["Impuesto", p.impuesto],
                            ["Monto Solicitado", money(p.montoSolicitado)],
                            ["Monto Autorizado", <>{money(p.montoAutorizado)} <span className="text-xs text-slate-400 ml-1">Individual</span></>],
                            ["Interés", money(p.interes)],
                        ]}
                    />
                </div>

                <div className="text-xs text-slate-400 mb-5">Dirección : {p.direccion}</div>

                <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 mb-2">
                    Coacreditados:
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500 text-white text-xs">
                        {p.coacreditados.length}
                    </span>
                </div>
                <DataTable
                    columns={["Nombre", "IFE", "CURP", "RFC", "Dirección", "Parentesco", "Tipo de relación"]}
                    rows={p.coacreditados.map((c) => [
                        c.nombre,
                        c.ife,
                        c.curp,
                        c.rfc || "NA",
                        c.direccion,
                        c.parentesco,
                        c.tipoRelacion,
                    ])}
                />

                <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 mt-5 mb-2">
                    Garantías:
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-white text-xs">
                        {p.garantias}
                    </span>
                </div>

                <div className="flex flex-wrap items-center gap-6 mt-5 px-4 py-3 bg-slate-50 rounded-md text-sm">
                    <span className="font-semibold text-slate-600">Totales</span>
                    <span className="text-slate-500">Montos autorizados: <b className="text-slate-700">{money(p.montosAutorizados)}</b></span>
                    <span className="text-slate-500">Pagos: <b className="text-slate-700">{money(p.pagos)}</b></span>
                    <span className="text-slate-500 flex items-center gap-1">
                        Créditos totales:
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500 text-white text-xs">
                            {p.creditosTotales}
                        </span>
                    </span>
                </div>
            </SectionCard>
        </div>
    );
}