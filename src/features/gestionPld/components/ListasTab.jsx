import { LISTAS_CONFIG } from '../constants/constants'
import RenderToggle from './RenderToggle'

export default function ListasTab({ listas, listasData, onToggleChange, isLoading, isError }) {
    return (
        <div>
            <h3 className="text-xl font-semibold text-blue-700 mb-8 border-b border-blue-50 pb-2">
                Listas PLD
            </h3>

            {isLoading && (
                <p className="text-sm text-gray-500 py-6 text-center">Cargando listas...</p>
            )}

            {isError && (
                <p className="text-sm text-red-600 py-6 text-center">
                    Ocurrió un error al cargar las listas PLD.
                </p>
            )}

            {!isLoading && !isError && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                    {listas.length === 0 && (
                        <p className="text-sm text-gray-500">No hay listas PLD disponibles.</p>
                    )}
                    {listas.map((lista) => (
                        <RenderToggle
                            key={lista.idListasPld}
                            id={lista.codigo}
                            label={lista.nombreListas}
                            checked={listasData[lista.codigo] ?? lista.activo}
                            onToggle={onToggleChange}
                        />
                    ))}
                </div>
            )}
        </div>

    )
}
