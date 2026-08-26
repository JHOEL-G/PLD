import { AlertTriangle } from "lucide-react";
import { FileText } from "lucide-react";
import { Bell } from "lucide-react";
import { DollarSign } from "lucide-react";

export default function NavTabs({ activeTab, setActiveTab, denunciasPendientes }) {
    const tabClass = (tab) =>
        `py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab
            ? 'border-orange-500 text-orange-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        }`;

    return (
        <nav className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex space-x-8">
                    <button onClick={() => setActiveTab('dashboard')} className={tabClass('dashboard')}>
                        <span className="flex items-center space-x-2">
                            <DollarSign className="w-4 h-4" />
                            <span>Dólar y UMA</span>
                        </span>
                    </button>

                    <button onClick={() => setActiveTab('alerts')} className={tabClass('alerts')}>
                        <span className="flex items-center space-x-2">
                            <Bell className="w-4 h-4" />
                            <span>Alertas</span>
                        </span>
                    </button>

                    <button onClick={() => setActiveTab('denuncias')} className={`${tabClass('denuncias')} relative`}>
                        <span className="flex items-center space-x-2">
                            <AlertTriangle className="w-4 h-4" />
                            <span>Denuncias</span>
                            {denunciasPendientes > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {denunciasPendientes}
                                </span>
                            )}
                        </span>
                    </button>

                    <button onClick={() => setActiveTab('expedientes')} className={tabClass('expedientes')}>
                        <span className="flex items-center space-x-2">
                            <FileText className="w-4 h-4" />
                            <span>Expedientes</span>
                        </span>
                    </button>
                </div>
            </div>
        </nav>
    )
}
