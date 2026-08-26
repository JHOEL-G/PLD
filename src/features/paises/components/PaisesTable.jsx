import { Pencil } from "lucide-react";

export default function PaisesTable({ data, onEdit }) {
    return (
        <div className="overflow-x-auto px-4">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-gray-200 text-[12px] text-slate-500 font-semibold uppercase">
                        <th className="py-3 px-2 font-bold w-1/4">Nombre</th>
                        <th className="py-3 px-2 font-bold w-1/4">Descripción</th>
                        <th className="py-3 px-2 font-bold w-1/6 text-center">Paraíso Fiscal</th>
                        <th className="py-3 px-2 font-bold w-1/6 text-center">No Cooperante</th>
                        <th className="py-3 px-2 font-bold w-1/6 text-center">Medida Deficiente</th>
                        <th className="py-3 px-2 font-bold w-1/6 text-right pr-4">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-[12px] text-slate-600">
                    {data.length > 0 ? (
                        data.map((row) => (
                            <tr key={row.idPaises} className="hover:bg-gray-50 transition-colors group">
                                <td className="py-3 px-2 text-slate-500">{row.paisNombre}</td>
                                <td className="py-3 px-2 text-slate-500">{row.descripcion}</td>
                                <td className="py-3 px-2 text-center">
                                    {row.esParaisoFiscal ? (
                                        <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
                                    ) : (
                                        <span className="inline-block w-2 h-2 rounded-full bg-gray-300" />
                                    )}
                                </td>
                                <td className="py-3 px-2 text-center">
                                    {row.esPaisNoCooperante ? (
                                        <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
                                    ) : (
                                        <span className="inline-block w-2 h-2 rounded-full bg-gray-300" />
                                    )}
                                </td>
                                <td className="py-3 px-2 text-center">
                                    {row.esMedidaDeficiente ? (
                                        <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
                                    ) : (
                                        <span className="inline-block w-2 h-2 rounded-full bg-gray-300" />
                                    )}
                                </td>
                                <td className="py-3 px-2 text-right pr-4 text-slate-400 group-hover:text-slate-600">
                                    <button onClick={() => onEdit(row)} className="text-blue-500 hover:text-blue-700">
                                        <Pencil size={14} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="py-8 text-center text-slate-400">
                                No se encontraron resultados.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
