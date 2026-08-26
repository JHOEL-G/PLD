import { Activity, DollarSign, Bell, AlertTriangle, RefreshCw } from 'lucide-react';

export default function DashboardTab({ denunciasPendientes, onVerDenuncias, onActualizarUSD, onActualizarUMA }) {
    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Activity className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Operaciones Hoy</p>
                                <p className="text-3xl font-bold text-gray-900 mt-1">156</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <DollarSign className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Monto Total</p>
                                <p className="text-3xl font-bold text-gray-900 mt-1">$12,450,000 <span className="text-base font-medium">MXN</span></p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-orange-100 rounded-lg">
                                <Bell className="w-6 h-6 text-orange-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Alertas Activas</p>
                                <p className="text-3xl font-bold text-gray-900 mt-1">23</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer hover:border-red-300"
                    onClick={onVerDenuncias}
                >
                    <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-red-100 rounded-lg relative">
                                <AlertTriangle className="w-6 h-6 text-red-600" />
                                {denunciasPendientes > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                        {denunciasPendientes}
                                    </span>
                                )}
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Denuncias Pendientes</p>
                                <p className="text-3xl font-bold text-gray-900 mt-1">{denunciasPendientes}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Exchange Rate Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                <DollarSign className="w-5 h-5 text-green-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Tipo de Cambio USD</h3>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700">
                            <RefreshCw className="w-5 h-5" />
                        </button>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Valor Actual (MXN por USD)</p>
                        <p className="text-4xl font-bold text-gray-900 mb-4">17.25</p>
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                            <div>
                                <p>Última Actualización:</p>
                                <p className="font-medium text-gray-700">Fuentes</p>
                            </div>
                            <div className="text-right">
                                <p>24/10/2024 09:00</p>
                                <p className="font-medium text-gray-700">Banco de México</p>
                            </div>
                        </div>
                        <button
                            onClick={onActualizarUSD}
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors"
                        >
                            Actualizar Tipo de Cambio
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Activity className="w-5 h-5 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Valor UMA</h3>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700">
                            <RefreshCw className="w-5 h-5" />
                        </button>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Valor Diario (MXN)</p>
                        <p className="text-4xl font-bold text-gray-900 mb-4">108.57</p>
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                            <div>
                                <p>Última Actualización:</p>
                                <p className="font-medium text-gray-700">Vigencia</p>
                            </div>
                            <div className="text-right">
                                <p>09/01/2024</p>
                                <p className="font-medium text-gray-700">Año 2024</p>
                            </div>
                        </div>
                        <button
                            onClick={onActualizarUMA}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
                        >
                            Actualizar Valor UMA
                        </button>
                    </div>
                </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                        <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-blue-900 mb-1">Información Importante</h4>
                        <p className="text-sm text-blue-800">Los valores actualizados se aplican automáticamente a todas las operaciones y cálculos del sistema. Asegúrese de verificar los valores antes de actualizar.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
