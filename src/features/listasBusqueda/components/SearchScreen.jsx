import { Search, Filter, ChevronDown, AlertTriangle, Home } from "lucide-react";
import StatsCards from "./StatsCards";
import { LIST_STATS } from "../constants/constants";

export default function SearchScreen({ searchName, setSearchName, selectedList, setSelectedList, onSearch, }) {
    return (
        <div className="animate-fadeIn">
            <StatsCards stats={LIST_STATS} />

            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Nueva Búsqueda</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Nombre o Razón Social
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none text-gray-900 placeholder-gray-400"
                            placeholder="Ingrese nombre completo o razón social..."
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Consultar en
                        </label>
                        <div className="relative">
                            <select
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none appearance-none text-gray-900 bg-white cursor-pointer"
                                value={selectedList}
                                onChange={(e) => setSelectedList(e.target.value)}
                            >
                                <option value="todas">Todas las Listas</option>
                                <option value="pep">Lista PEP</option>
                                <option value="negras">Listas Negras</option>
                                <option value="propias">Listas Propias</option>
                            </select>
                            <ChevronDown
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                                size={20}
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
                            onClick={onSearch}
                        >
                            <Search size={18} />
                            Buscar Coincidencias
                        </button>
                        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 text-purple-600 hover:border-purple-600 hover:bg-gray-50 font-semibold rounded-lg transition-all">
                            <Filter size={18} />
                            Avanzada
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-orange-500 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                            P
                        </div>
                        <div className="flex-1">
                            <div className="font-semibold text-gray-900 text-base mb-1">Lista PEP</div>
                            <div className="text-sm text-gray-600">Personas Políticamente Expuestas</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-red-500 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                            <AlertTriangle size={20} />
                        </div>
                        <div className="flex-1">
                            <div className="font-semibold text-gray-900 text-base mb-1">Listas Negras</div>
                            <div className="text-sm text-gray-600">OFAC, ONU, UE, Interpol</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-purple-600 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                            <Home size={20} />
                        </div>
                        <div className="flex-1">
                            <div className="font-semibold text-gray-900 text-base mb-1">Listas Propias</div>
                            <div className="text-sm text-gray-600">Registro interno de la entidad</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
