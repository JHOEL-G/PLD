import { Search } from 'lucide-react';

export default function EmptyState() {
    return (
        <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center shadow-sm">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Sin resultados a la vista</h3>
            <p className="text-slate-500 max-w-sm mx-auto">Prueba modificando tus filtros de búsqueda o elimina algunos para ampliar los resultados.</p>
        </div>
    );
}