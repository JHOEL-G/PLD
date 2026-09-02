import { FileText } from 'lucide-react'
import { Shield } from 'lucide-react'

export default function Header({ onGenerarReporte }) {
    return (
        <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                        <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold text-gray-900">Perfil Transaccional</h1>
                        <p className="text-sm text-gray-500">Operaciones Relevantes, Vulnerables, Inusuales, Países y Listas</p>
                    </div>
                </div>
                <button
                    onClick={onGenerarReporte}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                >
                    <FileText className="w-4 h-4" />
                    <span>Generar Reporte</span>
                </button>
            </div>
        </div>
    )
}
