import { FileText, CheckCircle2, Eye } from 'lucide-react';

export default function ExpedienteTab({ documentos, onVerDocumento }) {
    return (
        <div className="animate-fadeIn">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Documentos del Expediente</h3>

                <div className="space-y-4">
                    {documentos.map((doc) => (
                        <div
                            key={doc.id}
                            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <FileText className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">{doc.nombre}</h4>
                                    <p className="text-sm text-gray-500">{doc.archivo}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="text-right">
                                    <p className="text-xs text-gray-500">Fecha: {doc.fecha}</p>
                                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium mt-1">
                                        <CheckCircle2 size={12} />
                                        {doc.estado}
                                    </span>
                                </div>
                                <button
                                    onClick={() => onVerDocumento && onVerDocumento(doc)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <Eye className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
