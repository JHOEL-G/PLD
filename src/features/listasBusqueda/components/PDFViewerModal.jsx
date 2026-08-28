import { X, Download, Printer, FileText, CheckCircle2, AlertTriangle } from "lucide-react";
import { formatFechaLarga, getResultadoTexto } from "../utils/utils";

export default function PDFViewerModal({ show, record, pdfRef, onClose, onDownload, onPrint, }) {
    if (!show || !record) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden flex flex-col">
                <div className="bg-gradient-to-r from-purple-600 to-purple-800 px-6 py-5 flex items-center justify-between no-print">
                    <div className="flex items-center gap-3">
                        <FileText className="w-6 h-6 text-white" />
                        <div>
                            <h2 className="text-xl font-bold text-white">Constancia de Búsqueda</h2>
                            <p className="text-sm text-purple-100">{record.nombre}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={onDownload}
                            className="text-white hover:bg-white/20 rounded-lg px-4 py-2 transition-colors flex items-center gap-2 font-medium"
                        >
                            <Download size={18} />
                            Descargar PDF
                        </button>
                        <button
                            onClick={onPrint}
                            className="text-white hover:bg-white/20 rounded-lg px-4 py-2 transition-colors flex items-center gap-2 font-medium"
                        >
                            <Printer size={18} />
                            Imprimir
                        </button>
                        <button
                            onClick={onClose}
                            className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto bg-gray-100 p-8">
                    <div
                        ref={pdfRef}
                        className="pdf-content bg-white shadow-lg mx-auto"
                        style={{ width: "210mm", minHeight: "297mm", padding: "20mm" }}
                    >
                        <div className="flex justify-between items-start mb-8">
                            <div className="w-24 h-24 bg-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-2xl">LOGO</span>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-600">Culiacán, Sinaloa</p>
                                <p className="text-sm text-gray-600">a {formatFechaLarga(record.fecha)}</p>
                            </div>
                        </div>

                        <div className="text-center mb-12">
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">CONSTANCIA DE BÚSQUEDA</h1>
                            <h2 className="text-xl font-semibold text-purple-600">EN LISTAS RESTRICTIVAS</h2>
                        </div>

                        <div className="space-y-6 text-gray-800 leading-relaxed">
                            <p className="text-justify">
                                Por medio de la presente, se hace constar que en cumplimiento con las disposiciones
                                aplicables en materia de Prevención de Lavado de Dinero y Financiamiento al
                                Terrorismo, se realizó la búsqueda correspondiente en las siguientes listas:
                            </p>

                            <div className="bg-purple-50 border-l-4 border-purple-600 p-4 my-6">
                                <p className="font-semibold text-purple-900 mb-2">Listas Consultadas:</p>
                                <p className="text-gray-700">{record.listas}</p>
                            </div>

                            <div className="bg-gray-50 border-l-4 border-gray-400 p-4 my-6">
                                <p className="font-semibold text-gray-900 mb-2">Persona/Razón Social Consultada:</p>
                                <p className="text-lg text-gray-800 font-medium">{record.nombre}</p>
                            </div>

                            <p className="text-justify font-medium">
                                Se realizó búsqueda en Listas Negras, PEP y Lista de Personas Bloqueadas de la
                                persona/razón social <span className="font-bold">{record.nombre}</span>,{" "}
                                {getResultadoTexto(record.resultado)}
                            </p>

                            <div className="flex justify-center my-8">
                                {record.resultado === "sin" ? (
                                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-green-100 border-2 border-green-500 rounded-lg">
                                        <CheckCircle2 size={24} className="text-green-600" />
                                        <span className="text-lg font-bold text-green-700">SIN COINCIDENCIAS</span>
                                    </div>
                                ) : (
                                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-red-100 border-2 border-red-500 rounded-lg">
                                        <AlertTriangle size={24} className="text-red-600" />
                                        <span className="text-lg font-bold text-red-700">CON COINCIDENCIAS</span>
                                    </div>
                                )}
                            </div>

                            <div className="border border-gray-300 rounded-lg overflow-hidden my-6">
                                <table className="w-full">
                                    <tbody className="divide-y divide-gray-200">
                                        <tr className="bg-gray-50">
                                            <td className="px-4 py-3 font-semibold text-gray-700 w-1/3">Fecha y Hora:</td>
                                            <td className="px-4 py-3 text-gray-900">{record.fecha}</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 font-semibold text-gray-700">Usuario Consultor:</td>
                                            <td className="px-4 py-3 text-gray-900">{record.usuario}</td>
                                        </tr>
                                        <tr className="bg-gray-50">
                                            <td className="px-4 py-3 font-semibold text-gray-700">Listas Consultadas:</td>
                                            <td className="px-4 py-3 text-gray-900">{record.listas}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="mt-16 pt-8 border-t-2 border-gray-300">
                            <p className="text-center font-semibold text-gray-900 mb-2">Atentamente</p>
                            <p className="text-center font-bold text-lg text-purple-600">
                                Grupo JJJ Capital Continental S. de R.L. de C.V.
                            </p>
                            <div className="mt-12 text-center">
                                <div className="inline-block border-t-2 border-gray-400 pt-2 px-12">
                                    <p className="text-sm font-semibold text-gray-700">Firma Autorizada</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 text-xs text-gray-500 text-center">
                            <p>Documento generado electrónicamente - {new Date().toLocaleDateString("es-MX")}</p>
                            <p className="mt-1">
                                Este documento es válido sin firma autógrafa de conformidad con las disposiciones
                                aplicables
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
