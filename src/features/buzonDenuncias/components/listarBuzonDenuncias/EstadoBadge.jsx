import { getStatusConfig } from "../../utils/Denunciaconfig";

export default function EstadoBadge({ estado, size = 'md' }) {
    const status = getStatusConfig(estado);
    const StatusIcon = status.icon;
    const isModal = size === 'md';
    const sizeClasses = isModal ? 'px-4 py-2 text-xs rounded-xl' : 'px-3 py-1.5 text-xs rounded-lg';
    const iconSize = isModal ? 'w-4 h-4' : 'w-3.5 h-3.5';
    const label = isModal ? `ESTADO: ${status.label.toUpperCase()}` : status.label;

    return (
        <span className={`${sizeClasses} font-bold border ${status.color} flex items-center space-x-1.5 w-fit`}>
            <StatusIcon className={iconSize} />
            <span>{label}</span>
        </span>
    );
}