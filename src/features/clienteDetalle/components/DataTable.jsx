export default function DataTable({ columns, rows }) {
    return (
        <div className="overflow-x-auto rounded-md border border-slate-100">
            <table className="w-full text-sm">
                <thead>
                    <tr className="bg-slate-50 text-slate-500 text-left">
                        {columns.map((c) => (
                            <th key={c} className="px-4 py-2.5 font-semibold whitespace-nowrap">
                                {c}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {rows.length === 0 && (
                        <tr>
                            <td colSpan={columns.length} className="px-4 py-4 text-slate-400 text-center">
                                Sin datos registrados
                            </td>
                        </tr>
                    )}
                    {rows.map((row, i) => (
                        <tr key={i} className="text-slate-700">
                            {row.map((cell, j) => (
                                <td key={j} className="px-4 py-2.5 whitespace-nowrap">
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}