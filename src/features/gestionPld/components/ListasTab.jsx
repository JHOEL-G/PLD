import { LISTAS_CONFIG } from '../constants/constants'
import RenderToggle from './RenderToggle'

export default function ListasTab({ listasData, onToggleChange }) {
    return (
        <div>
            <h3 className="text-xl font-semibold text-blue-700 mb-8 border-b border-blue-50 pb-2">
                Listas PLD
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                {LISTAS_CONFIG.map((lista) => (
                    <RenderToggle
                        key={lista.id}
                        id={lista.id}
                        label={lista.label}
                        checked={listasData[lista.id]}
                        onToggle={onToggleChange}
                    />
                ))}
            </div>
        </div>
    )
}
