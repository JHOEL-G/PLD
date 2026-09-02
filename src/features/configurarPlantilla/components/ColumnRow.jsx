import { X } from 'lucide-react';
import { PROP_OPTIONS } from '../constants/constants';

export default function ColumnRow({ column, index, onUpdate, onRemove }) {
    return (
        <tr className="hover:bg-blue-50/40 transition-colors group">
            <td className="px-4 py-2.5">
                <div className="flex items-center gap-2">
                    <span className="text-gray-300 font-mono text-xs w-4">{index + 1}</span>
                    <input
                        type="number"
                        value={column.num}
                        min={1}
                        onChange={e => onUpdate(column.id, 'num', parseInt(e.target.value))}
                        className="w-14 px-2 py-1 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>
            </td>
            <td className="px-4 py-2.5">
                <select
                    value={column.prop}
                    onChange={e => onUpdate(column.id, 'prop', e.target.value)}
                    className="w-full px-2 py-1 border border-gray-200 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                >
                    {PROP_OPTIONS.map(opt => (
                        <option key={opt.label} value={opt.label}>{opt.label}</option>
                    ))}
                </select>
            </td>
            <td className="px-4 py-2.5">
                <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded">
                    {column.type}
                </span>
            </td>
            <td className="px-4 py-2.5 text-center">
                <button
                    onClick={() => onRemove(column.id)}
                    className="p-1.5 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors opacity-60 group-hover:opacity-100"
                >
                    <X className="w-4 h-4" />
                </button>
            </td>
        </tr>
    )
}
