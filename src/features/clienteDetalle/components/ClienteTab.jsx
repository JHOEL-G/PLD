import {
    Phone,
    User,
    BookOpen,
    MapPin,
    Users,
    Wallet,
    Briefcase,
    ClipboardList,
    ShieldCheck,
    AlertTriangle,
    FileDown,
    Printer,
} from "lucide-react";
import KVTable from "./KVTable";
import SectionCard from "./SectionCard";
import DataTable from "./DataTable";
import { cliente } from "../constants/clienteMock";
import { money } from "../utils/money";

export default function ClienteTab() {
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