import { useState } from "react";
import {
    Phone,
    ArrowLeft,
    Printer,
    User,
    BookOpen,
    MapPin,
    Users,
    Wallet,
    Briefcase,
    ClipboardList,
    ShieldCheck,
    ListChecks,
    AlertTriangle,
    CheckCircle2,
    MinusCircle,
    PlusCircle,
    ExternalLink,
    Share2,
    FileDown,
    ChevronRight,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Datos de ejemplo (mismos que las capturas) — sustituir por datos reales del API
// ---------------------------------------------------------------------------
const cliente = {
    nombre: "DAVID PAULINO VAZQUEZ PADILLA",
    clienteId: "CLC25179",
    telefono: "6677514375",
    genero: "HOMBRE",
    estadoCivil: "SOLTERO (A)",
    escolaridad: "LICENCIATURA",
    ocupacion: "",
    ine: "VZPDDV78011525H700",
    curp: "VAPD780115HSLZDV02",
    rfc: "VAPD780115427",
    pasaporte: "NA",
    credencialImss: "NA",
    fiel: "NA",
    nacionalidad: "MEXICO",
    fechaNacimiento: "1978-01-15",
    paisNacimiento: "MEXICO",
    lugarNacimiento: "CULIACAN",
    entidadNacimiento: "SINALOA",
    domicilio: {
        pais: "MEXICO",
        estado: "SINALOA",
        localidad: "FRACCIONAMIENTO VILLA BONITA",
        asentamiento: "FRACCIONAMIENTO VILLA BONITA",
        tipoVialidad: "CALLE",
        vialidad: "MANUE CLOUTHIER",
        referencia: "NA",
        manzana: "NA",
        lote: "NA",
        numExt: "5991",
        numInt: "NA",
    },
    relaciones: [
        { nombre: "ROSA MARIA ZAVALA UNZUETA", rol: "AVAL", parentesco: "AMIGO(A)" },
    ],
    economicos: {
        ingresos: [
            {
                motivo: "VENTAS DE NEGOCIO",
                descripcion: "VENTAS DIARIAS",
                actividad: "FABRICACION DE HELADOS NIEVES Y PALETAS",
                monto: 189000,
            },
        ],
        egresos: [
            { motivo: "SERVICIOS GENERALES", descripcion: "PAGO PROVEEDORES", monto: 126500 },
        ],
        bancarios: [
            {
                moneda: "PESOS MEXICANOS",
                banco: "BANORTE/IXE",
                cuenta: "1112488070",
                clabe: "072730011124880707",
                tarjeta: "",
            },
        ],
    },
    pld: {
        riesgo: "BAJO RIESGO",
        metodo: "EVALUACION POR PARAMETROS MATRIZ DE RIESGO",
        ultimaOperacion: "2026-01-13 15:19:07.0",
        operacion: "REGISTRO DE CREDITOS",
        valoracion: 0.81,
    },
    producto: {
        creditoId: "26CLC9940",
        ciclo: 1,
        asesor: "MARIA DE LA LUZ SUAREZ FLORES",
        fechaDesembolso: "20-01-2026",
        fechaPrimerPago: "20-02-2026",
        fechaUltimoPago: "05-02-2027",
        estado: "ACTIVO",
        actividadEconomica: "FABRICACION DE HELADOS NIEVES Y PALETAS",
        actividadPersonalizada: "ANTOJOS",
        destinoCredito: "ADQUIRIR O COMPRAR MERCANCIA",
        destinoPersonalizado: "CAPITAL DE TRABAJO",
        origenRecursos: "VENTA DE PRODUCTOS Y SERVICIOS",
        montoSolicitado: 25000,
        montoAutorizado: 25000,
        interes: 2500,
        impuesto: 0,
        categoria: "CREDITO INDIVIDUAL SIN IVA",
        productoFinanciero: "MICROCREDITO 5-25",
        calculoInteres: "SALDOS GLOBALES",
        frecuenciaPagos: "24 QUINCENAL",
        numeroPagos: 24,
        frecuencia: "QUINCENAL",
        tasaAnual: 10.0,
        direccion:
            "MANUE CLOUTHIER, FRACCIONAMIENTO VILLA BONITA, FRACCIONAMIENTO VILLA BONITA, CULIACÁN, SINALOA, CP: 80199",
        coacreditados: [
            {
                nombre: "ROSA MARIA ZAVALA UNZUETA",
                ife: "ZVUNRS53020625M700",
                curp: "ZAUR530206MSLVNS15",
                rfc: "",
                direccion:
                    "ABRAHAM LINCON, COLONIA CHAPULTEPEC, COLONIA CHAPULTEPEC, CULIACÁN, SINALOA, CP: 80040",
                parentesco: "AMIGO(A)",
                tipoRelacion: "AVAL",
            },
        ],
        garantias: 0,
        montosAutorizados: 25000,
        pagos: 0,
        creditosTotales: 1,
    },
    encuestas: [
        {
            titulo: "PERFIL TRANSACCIONAL",
            fecha: "13/01/2026 14:37",
            preguntas: [
                { p: "¿Espera realizar pagos anticipados?", r: "No" },
                { p: "¿Con que frecuencia espera realizar pagos anticipados?", r: "NO" },
                { p: "¿Espera liquidar su crédito dentro de los 3 primeros meses a su otorgamiento?", r: "No" },
                { p: "¿Instrumento monetario con el que desea realizar los pagos anticipados o liquidación de crédito?", r: "Efectivo" },
                { p: "¿Montos esperados de los pagos anticipados?", r: "1000 a 3000" },
            ],
        },
    ],
    listasUIF: {
        consulta: "ILWOVMIWPX",
        fecha: "2026-02-25 15:53:10",
        alerta: true,
        items: [
            "PERSONAS POLITICAMENTE EXPUESTAS",
            "LPB NACIONAL",
            "LPB INTERNACIONAL PERSONAS",
            "LPB INTERNACIONAL ENTIDADES",
            "LISTA OFAC",
            "LISTA PGR",
            "LISTA 69 BIS",
            "PEPS EXTRANJEROS",
            "PEPS Y EMPRESAS OTRO RIESGO",
            "PEPS NAC",
        ],
    },
    criteriosPaises: [
        {
            consulta: "KSGLCHQKLV",
            fecha: "2026-02-25 15:53:10",
            alerta: true,
            items: ["LISTADO PARAISO FISCAL", "PAISES NO COPERANTES", "MEDIDAS DEFICIENTES"],
        },
        {
            consulta: "TERMYWZOQC",
            fecha: "2026-01-13 14:19:07",
            alerta: false,
            items: [],
        },
    ],
    alertasPerfil: [
        {
            tipoAlerta: "PERFIL TRANSACCIONAL",
            nombre: "DAVID PAULINO",
            apellidoPaterno: "VAZQUEZ",
            apellidoMaterno: "PADILLA",
            descripcionOperacion: "PERFIL TRANSACCIONAL",
            descripcionReporte: "EVALUACION POR PARAMETROS MATRIZ DE RIESGO",
            nacionalidad: "MEXICO",
            fechaNacimiento: "14-01-1978",
            direccion: "MEXICO,SINALOA,CULIACÁN,MANUE CLOUTHIER,5991",
            colonia: "MEXICO",
            coloniaLocalidad: "FRACCIONAMIENTO VILLA BONITA",
            curp: "VAPD...",
        },
    ],
    alertasOperacion: [
        {
            empresa: "FATIMA HERNANDEZ ZAVALA",
            localidad: "FRACCIONAMIENTO VILLA BONITA",
            cp: "80199",
            casfim: "",
            tipoOperacion: "OTORGAMIENTO DE CREDITO",
            descripcionOperacion: "PERFIL TRANSACCIONAL",
            instrumento: "",
            numeroContrato: "26CLC9940",
            folio: "CLC10615",
            monto: 25000,
            moneda: "PESOS MEXICANOS",
            fechaOperacion: "2026-01-14 13:01:51",
        },
    ],
};

const money = (n) =>
    n === undefined || n === null || n === ""
        ? "NA"
        : `$${Number(n).toLocaleString("es-MX", { minimumFractionDigits: 2 })}`;

// ---------------------------------------------------------------------------
// UI helpers
// ---------------------------------------------------------------------------
function SectionCard({ icon: Icon, title, action, children }) {
    return (
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
            {title && (
                <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100">
                    <div className="flex items-center gap-2 text-slate-500 text-sm font-semibold tracking-wide">
                        {Icon && <Icon size={16} className="text-slate-400" />}
                        <span>{title}</span>
                    </div>
                    {action}
                </div>
            )}
            <div className="p-5">{children}</div>
        </div>
    );
}

function KVTable({ rows }) {
    return (
        <div className="divide-y divide-slate-100 rounded-md overflow-hidden border border-slate-100">
            {rows.map(([label, value], i) => (
                <div
                    key={i}
                    className={`flex items-center px-4 py-2.5 text-sm ${i % 2 === 0 ? "bg-slate-50/60" : "bg-white"
                        }`}
                >
                    <span className="w-2 h-2 rounded-full bg-slate-300 mr-3 shrink-0" />
                    <span className="w-48 shrink-0 text-slate-500">{label}</span>
                    <span className="text-slate-700 font-medium">{value || "NA"}</span>
                </div>
            ))}
        </div>
    );
}

function DataTable({ columns, rows }) {
    return (
        <div className="overflow-x-auto rounded-md border border-slate-100">
            <table className="w-full text-sm">
                <thead>
                    <tr className="bg-slate-50 text-slate-500 text-left">
                        {columns.map((c) => (
                            <th key={c} className="px-4 py-2.5 font-semibold whitespace-nowrap">
                                {c}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {rows.length === 0 && (
                        <tr>
                            <td colSpan={columns.length} className="px-4 py-4 text-slate-400 text-center">
                                Sin datos registrados
                            </td>
                        </tr>
                    )}
                    {rows.map((row, i) => (
                        <tr key={i} className="text-slate-700">
                            {row.map((cell, j) => (
                                <td key={j} className="px-4 py-2.5 whitespace-nowrap">
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function RiskBadge({ level }) {
    const styles =
        level === "BAJO RIESGO"
            ? "bg-emerald-50 text-emerald-600 border-emerald-200"
            : level === "MEDIO RIESGO"
                ? "bg-amber-50 text-amber-600 border-amber-200"
                : "bg-red-50 text-red-600 border-red-200";
    return (
        <span className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${styles}`}>
            {level}
        </span>
    );
}

// ---------------------------------------------------------------------------
// Tab contents
// ---------------------------------------------------------------------------
function ClienteTab() {
    return (
        <div className="space-y-5">
            <SectionCard icon={BookOpen} title="Datos Generales">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-2 text-slate-600">
                            <Phone size={14} className="text-slate-400" />
                            <span className="text-slate-500">Teléfono 1 :</span>
                            <span className="font-medium">{cliente.telefono}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                            <User size={14} className="text-slate-400" />
                            <span className="text-slate-500">Género :</span>
                            <span className="font-medium">{cliente.genero}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                            <span className="text-slate-500">Estado Civil :</span>
                            <span className="font-medium">{cliente.estadoCivil}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                            <span className="text-slate-500">Escolaridad :</span>
                            <span className="font-medium">{cliente.escolaridad}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                            <span className="text-slate-500">Ocupación :</span>
                            <span className="font-medium">{cliente.ocupacion || "—"}</span>
                        </div>
                    </div>
                    <div className="space-y-2 text-sm md:text-right">
                        <div><span className="text-slate-500">INE: </span><span className="font-semibold text-slate-700">{cliente.ine}</span></div>
                        <div><span className="text-slate-500">CURP: </span><span className="font-semibold text-slate-700">{cliente.curp}</span></div>
                        <div><span className="text-slate-500">RFC: </span><span className="font-semibold text-slate-700">{cliente.rfc}</span></div>
                        <div><span className="text-slate-500">PASAPORTE: </span><span className="font-semibold text-slate-700">{cliente.pasaporte}</span></div>
                        <div><span className="text-slate-500">CREDENCIAL IMSS: </span><span className="font-semibold text-slate-700">{cliente.credencialImss}</span></div>
                        <div><span className="text-slate-500">FIEL: </span><span className="font-semibold text-slate-700">{cliente.fiel}</span></div>
                    </div>
                </div>
            </SectionCard>

            <SectionCard icon={ShieldCheck} title="Nacionalidad">
                <KVTable
                    rows={[
                        ["Nacionalidad", cliente.nacionalidad],
                        ["Fecha de Nacimiento", cliente.fechaNacimiento],
                        ["País Nacimiento", cliente.paisNacimiento],
                        ["Lugar de Nacimiento", cliente.lugarNacimiento],
                        ["Entidad de Nacimiento", cliente.entidadNacimiento],
                    ]}
                />
            </SectionCard>

            <SectionCard icon={MapPin} title="Domicilio">
                <div className="space-y-3">
                    <KVTable
                        rows={[
                            ["País", cliente.domicilio.pais],
                            ["Estado", cliente.domicilio.estado],
                            ["Localidad", cliente.domicilio.localidad],
                            ["Asentamiento", cliente.domicilio.asentamiento],
                        ]}
                    />
                    <KVTable
                        rows={[
                            ["Tipo Vialidad", cliente.domicilio.tipoVialidad],
                            ["Vialidad", cliente.domicilio.vialidad],
                            ["Referencia", cliente.domicilio.referencia],
                            ["Manzana", cliente.domicilio.manzana],
                            ["Lote", cliente.domicilio.lote],
                            ["N° E.", cliente.domicilio.numExt],
                            ["N° I.", cliente.domicilio.numInt],
                        ]}
                    />
                </div>
            </SectionCard>

            <SectionCard icon={Users} title="Relaciones">
                <div className="flex flex-wrap gap-4">
                    {cliente.relaciones.map((r, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg border border-slate-100 bg-slate-50/60 min-w-[280px]"
                        >
                            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                                <User size={18} />
                            </div>
                            <div className="flex-1">
                                <div className="font-semibold text-slate-700 text-sm">{r.nombre}</div>
                                <div className="text-xs text-slate-500">
                                    {r.rol} <span className="italic">{r.parentesco}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-slate-400">
                                <FileDown size={15} />
                                <AlertTriangle size={15} />
                            </div>
                        </div>
                    ))}
                </div>
            </SectionCard>

            <SectionCard icon={Wallet} title="Datos económicos">
                <div className="space-y-5">
                    <div>
                        <div className="text-sm font-semibold text-slate-600 mb-2">Ingresos</div>
                        <DataTable
                            columns={["Motivo", "Descripción del Motivo", "Actividad económica", "Monto Ingreso"]}
                            rows={cliente.economicos.ingresos.map((r) => [
                                r.motivo,
                                r.descripcion,
                                r.actividad,
                                money(r.monto),
                            ])}
                        />
                    </div>
                    <div>
                        <div className="text-sm font-semibold text-slate-600 mb-2">Egresos</div>
                        <DataTable
                            columns={["Motivo", "Descripción del Motivo", "Monto Egreso"]}
                            rows={cliente.economicos.egresos.map((r) => [r.motivo, r.descripcion, money(r.monto)])}
                        />
                    </div>
                    <div>
                        <div className="text-sm font-semibold text-slate-600 mb-2">Datos bancarios</div>
                        <DataTable
                            columns={["Tipo Moneda", "Banco", "Número de Cuenta", "Clabe interbancaria (18 dígitos)", "Número de tarjeta (15-16 dígitos)"]}
                            rows={cliente.economicos.bancarios.map((r) => [
                                r.moneda,
                                r.banco,
                                r.cuenta,
                                r.clabe,
                                r.tarjeta || "NA",
                            ])}
                        />
                    </div>
                    <div>
                        <div className="text-sm font-semibold text-slate-600 mb-2">Información Financiera</div>
                        <div className="text-sm text-slate-400 italic px-1">No especificado</div>
                    </div>
                </div>
            </SectionCard>

            <SectionCard icon={Briefcase} title="Empleo">
                <div className="text-center text-slate-400 py-4">No especificado</div>
            </SectionCard>

            <SectionCard icon={ClipboardList} title="Encuestas">
                <div className="space-y-3">
                    {cliente.encuestas.map((e, i) => (
                        <div key={i} className="border border-slate-100 rounded-md overflow-hidden">
                            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 text-sm font-semibold text-slate-600">
                                <span>{e.titulo} - {e.fecha}</span>
                                <Printer size={15} className="text-slate-400" />
                            </div>
                            <div className="divide-y divide-slate-100">
                                {e.preguntas.map((q, j) => (
                                    <div key={j} className="flex items-center justify-between px-4 py-2.5 text-sm">
                                        <span className="text-slate-500 max-w-[65%]">{q.p}</span>
                                        <span className="px-3 py-1 rounded bg-slate-100 text-slate-600 font-medium text-xs">
                                            {q.r}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </SectionCard>

            <SectionCard icon={ShieldCheck} title="Riesgo de Crédito">
                <div className="text-center text-slate-400 py-4">SIN DATOS REGISTRADOS</div>
            </SectionCard>
        </div>
    );
}

function ProductosTab() {
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

function ListaBloqueada({ label }) {
    return (
        <div className="flex items-center justify-between px-4 py-2.5 text-sm text-slate-600">
            <div className="flex items-center gap-2">
                <MinusCircle size={15} className="text-emerald-500" />
                <span>{label}</span>
            </div>
            <Printer size={14} className="text-slate-400" />
        </div>
    );
}

function PldTab() {
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

function PlaceholderTab({ label }) {
    return (
        <SectionCard>
            <div className="text-center text-slate-400 py-10 text-sm">
                No hay información de "{label}" registrada para este cliente.
            </div>
        </SectionCard>
    );
}

// ---------------------------------------------------------------------------
// Página principal
// ---------------------------------------------------------------------------
export default function ClienteDetallePage() {
    const [tab, setTab] = useState("pld");

    const tabs = [
        { id: "cliente", label: "Cliente" },
        { id: "seguimientos", label: "Seguimientos" },
        { id: "productos", label: "Productos" },
        { id: "archivos", label: "Archivos" },
        { id: "pld", label: "PLD" },
        { id: "circulo", label: "Círculo de Crédito" },
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Top bar */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                        <Phone size={14} />
                        <span className="font-medium text-slate-600">{cliente.telefono}</span>
                        <span className="ml-4 text-slate-400">Genero:</span>
                        <span className="font-medium text-slate-600">{cliente.genero}</span>
                    </div>
                    <div className="flex items-center gap-5">
                        <button className="flex items-center gap-1.5 text-sky-600 hover:underline">
                            <ArrowLeft size={14} /> Regresar
                        </button>
                        <button className="flex items-center gap-1.5 text-sky-600 hover:underline">
                            <Printer size={14} /> Imprimir
                        </button>
                    </div>
                </div>
            </div>

            {/* Header cliente */}
            <div className="bg-slate-50 border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 mb-3">
                        <User size={34} />
                    </div>
                    <div className="text-xl font-semibold text-slate-700 tracking-wide">{cliente.nombre}</div>
                    <div className="text-sm text-slate-400 mt-1">CLIENTE: {cliente.clienteId}</div>
                </div>
            </div>

            {/* Tabs nav */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-6 flex items-center gap-8 text-sm overflow-x-auto">
                    {tabs.map((t) => (
                        <button
                            key={t.id}
                            onClick={() => setTab(t.id)}
                            className={`py-4 whitespace-nowrap border-b-2 font-semibold tracking-wide transition ${tab === t.id
                                    ? "border-teal-500 text-slate-700"
                                    : "border-transparent text-slate-400 hover:text-slate-600"
                                }`}
                        >
                            {t.label.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-6 py-6">
                {tab === "cliente" && <ClienteTab />}
                {tab === "seguimientos" && <PlaceholderTab label="Seguimientos" />}
                {tab === "productos" && <ProductosTab />}
                {tab === "archivos" && <PlaceholderTab label="Archivos" />}
                {tab === "pld" && <PldTab />}
                {tab === "circulo" && <PlaceholderTab label="Círculo de Crédito" />}
            </div>
        </div>
    );
}