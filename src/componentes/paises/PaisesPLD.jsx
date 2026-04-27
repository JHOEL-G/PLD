import React, { useState, useMemo } from 'react';
import { Search, Plus, Copy, Pencil } from 'lucide-react';
import CountryModal from './modal/CountryModal';

const PaisesPLD = () => {
    const [activeTab, setActiveTab] = useState('paraiso');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const PAGE_SIZE = 10;

    const handleAdd = () => {
        setSelectedCountry(null);
        setIsModalOpen(true);
    };

    const handleEdit = (country) => {
        setSelectedCountry(country);
        setIsModalOpen(true);
    };

    const handleSearch = () => {
        setSearchQuery(searchInput.trim().toLowerCase());
        setCurrentPage(1);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSearch();
    };

    const data = [
        { nombre: 'ANDORRA', descripcion: 'ANDORRA', codigo: 'AD', largo: '', cnbv: '50' },
        { nombre: 'ANGUILA', descripcion: 'ANGUILA', codigo: 'AI', largo: '', cnbv: '50' },
        { nombre: 'ARUBA', descripcion: 'ARUBA', codigo: 'AW', largo: '', cnbv: '50' },
        { nombre: 'BAHAMAS', descripcion: 'BAHAMAS', codigo: 'BS', largo: '', cnbv: '50' },
        { nombre: 'BAHREIN', descripcion: 'BAHREIN', codigo: 'BH', largo: '', cnbv: '50' },
        { nombre: 'BARBADOS', descripcion: 'BARBADOS', codigo: 'BB', largo: '', cnbv: '50' },
        { nombre: 'BELICE', descripcion: 'BELICE', codigo: 'BZ', largo: '', cnbv: '50' },
        { nombre: 'BERMUDAS', descripcion: 'BERMUDAS', codigo: 'BM', largo: '', cnbv: '50' },
        { nombre: 'CURAZAO', descripcion: 'CURAZAO', codigo: 'CW', largo: '', cnbv: '50' },
        { nombre: 'DOMINICA', descripcion: 'DOMINICA', codigo: 'DM', largo: '', cnbv: '50' },
        { nombre: 'EMIRATOS ARABES', descripcion: 'EMIRATOS ARABES', codigo: 'AE', largo: '', cnbv: '50' },
        { nombre: 'GIBRALTAR', descripcion: 'GIBRALTAR', codigo: 'GI', largo: '', cnbv: '50' },
        { nombre: 'GUERNSEY', descripcion: 'GUERNSEY', codigo: 'GG', largo: '', cnbv: '50' },
        { nombre: 'HONG KONG', descripcion: 'HONG KONG', codigo: 'HK', largo: '', cnbv: '50' },
        { nombre: 'ISLA DE MAN', descripcion: 'ISLA DE MAN', codigo: 'IM', largo: '', cnbv: '50' },
        { nombre: 'ISLAS CAIMAN', descripcion: 'ISLAS CAIMAN', codigo: 'KY', largo: '', cnbv: '50' },
        { nombre: 'JERSEY', descripcion: 'JERSEY', codigo: 'JE', largo: '', cnbv: '50' },
        { nombre: 'LIECHTENSTEIN', descripcion: 'LIECHTENSTEIN', codigo: 'LI', largo: '', cnbv: '50' },
        { nombre: 'LUXEMBURGO', descripcion: 'LUXEMBURGO', codigo: 'LU', largo: '', cnbv: '50' },
        { nombre: 'MACAO', descripcion: 'MACAO', codigo: 'MO', largo: '', cnbv: '50' },
    ];

    const filtered = useMemo(() => {
        if (!searchQuery) return data;
        return data.filter(row =>
            row.nombre.toLowerCase().includes(searchQuery) ||
            row.descripcion.toLowerCase().includes(searchQuery) ||
            row.codigo.toLowerCase().includes(searchQuery) ||
            row.largo.toLowerCase().includes(searchQuery) ||
            row.cnbv.toLowerCase().includes(searchQuery)
        );
    }, [searchQuery]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = Math.min(startIndex + PAGE_SIZE, filtered.length);
    const pageData = filtered.slice(startIndex, endIndex);

    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;
        let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let end = Math.min(totalPages, start + maxVisible - 1);
        if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1);
        for (let i = start; i <= end; i++) pages.push(i);
        return pages;
    };

    return (
        <div className="min-h-screen bg-[#f4f7f9] p-6 font-sans text-slate-600">
            {/* Header con Buscador */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-light text-slate-500">Lista de paises PLD</h1>
                <div className="flex shadow-sm rounded-full bg-white border border-gray-200 overflow-hidden">
                    <input
                        type="text"
                        placeholder="Buscar"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="px-4 py-1.5 outline-none text-sm w-64"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-gray-50 px-4 py-1.5 text-xs text-gray-400 border-l hover:bg-gray-100 transition-colors"
                    >
                        Ir
                    </button>
                </div>
            </div>

            {/* Contenedor Principal Blanco */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">

                {/* Tabs de Navegación */}
                <div className="flex border-b border-gray-200 bg-white px-4 pt-4 gap-1">
                    <button
                        onClick={() => setActiveTab('paraiso')}
                        className={`px-4 py-2 text-[11px] font-bold uppercase border-t border-x rounded-t transition-all ${activeTab === 'paraiso' ? 'bg-white border-gray-200 -mb-[1px] text-slate-700' : 'bg-transparent border-transparent text-slate-400'}`}
                    >
                        Listado Paraiso Fiscal
                    </button>
                    <button
                        onClick={() => setActiveTab('no-coperantes')}
                        className={`px-4 py-2 text-[11px] font-bold uppercase transition-all ${activeTab === 'no-coperantes' ? 'text-slate-700' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        Paises no coperantes
                    </button>
                    <button
                        onClick={() => setActiveTab('deficientes')}
                        className={`px-4 py-2 text-[11px] font-bold uppercase transition-all ${activeTab === 'deficientes' ? 'text-slate-700' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        Medidas deficientes
                    </button>
                </div>

                {/* Toolbar de Botones */}
                <div className="flex flex-wrap justify-between items-center p-4 gap-4">
                    <div className="flex border border-gray-300 rounded divide-x divide-gray-300 overflow-hidden">
                        {['Copy', 'CSV', 'EXCEL', 'PDF', 'Imprimir'].map((btn) => (
                            <button key={btn} className="px-3 py-1.5 text-[11px] bg-white hover:bg-gray-50 text-gray-600">
                                {btn}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleAdd}
                            className="bg-[#337ab7] hover:bg-[#286090] text-white px-3 py-1.5 rounded text-[11px] flex items-center gap-1 transition-colors"
                        >
                            <Plus size={14} strokeWidth={3} /> Agregar
                        </button>
                        <button className="bg-[#337ab7] hover:bg-[#286090] text-white px-3 py-1.5 rounded text-[11px] flex items-center gap-1 transition-colors">
                            <Copy size={12} /> Todas las listas
                        </button>
                        <button className="border border-gray-300 hover:bg-gray-50 text-gray-600 px-3 py-1.5 rounded text-[11px] flex items-center gap-1 transition-colors">
                            <Search size={12} /> Consultar clientes en esta lista
                        </button>
                    </div>
                </div>

                {/* Tabla de Datos */}
                <div className="overflow-x-auto px-4">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200 text-[12px] text-slate-500 font-semibold uppercase">
                                <th className="py-3 px-2 font-bold w-1/4">Nombre</th>
                                <th className="py-3 px-2 font-bold w-1/4">Descripcion</th>
                                <th className="py-3 px-2 font-bold w-1/6">Codigo</th>
                                <th className="py-3 px-2 font-bold w-1/6">Codigo largo</th>
                                <th className="py-3 px-2 font-bold w-1/6 text-right pr-4">Valor CNBV</th>
                                <th className="py-3 px-2 font-bold w-1/6 text-right pr-4">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-[12px] text-slate-600">
                            {pageData.length > 0 ? (
                                pageData.map((row, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors group">
                                        <td className="py-3 px-2 text-slate-500">{row.nombre}</td>
                                        <td className="py-3 px-2 text-slate-500">{row.descripcion}</td>
                                        <td className="py-3 px-2 text-slate-500">{row.codigo}</td>
                                        <td className="py-3 px-2 text-slate-500">{row.largo}</td>
                                        <td className="py-3 px-2 text-right pr-4 text-slate-400 group-hover:text-slate-600">{row.cnbv}</td>
                                        <td className="py-3 px-2 text-right pr-4 text-slate-400 group-hover:text-slate-600">
                                            <button onClick={() => handleEdit(row)} className="text-blue-500 hover:text-blue-700">
                                                <Pencil size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="py-8 text-center text-slate-400">
                                        No se encontraron resultados.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer con info + Paginación */}
                <div className="flex justify-between items-center p-4 border-t border-gray-100 bg-white">
                    <span className="text-[12px] text-slate-400">
                        {filtered.length === 0
                            ? 'Sin resultados'
                            : `Mostrando ${startIndex + 1} – ${endIndex} de ${filtered.length} registros`
                        }
                    </span>
                    <div className="flex items-center border border-gray-300 rounded overflow-hidden text-[12px]">
                        <button
                            onClick={() => setCurrentPage(1)}
                            disabled={currentPage === 1}
                            className="px-3 py-1 border-r hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            «
                        </button>
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 border-r hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            ‹
                        </button>
                        {getPageNumbers().map(page => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`px-3 py-1 border-r transition-colors ${currentPage === page ? 'bg-[#337ab7] text-white' : 'hover:bg-gray-100'}`}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 border-r hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            ›
                        </button>
                        <button
                            onClick={() => setCurrentPage(totalPages)}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            »
                        </button>
                    </div>
                </div>

            </div>

            <CountryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                country={selectedCountry}
                onSave={(data) => console.log("Guardando datos:", data)}
            />
        </div>
    );
};

export default PaisesPLD;