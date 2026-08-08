import { FileText } from "lucide-react";
import { tabs } from "../utils/data";

export default function TabsNav({ activeTab, setActiveTab, onCrearNuevo }) {
    return (
        <>
            <div className="bg-white border-b border-gray-200 px-6">
                <div className="flex space-x-8">
                    {tabs.map(tab => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${activeTab === tab.id
                                    ? 'border-green-600 text-green-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{tab.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="flex justify-end px-3 py-1">
                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                    onClick={onCrearNuevo}
                >
                    <FileText className="w-4 h-4" />
                    <span>Crear Nuevo Registro</span>
                </button>
            </div>
        </>
    )
}
