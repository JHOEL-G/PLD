import { useState } from "react";
import PaisesSearchBar from "./PaisesSearchBar";
import PaisesTabs from "./PaisesTabs";
import PaisesToolbar from "./PaisesToolbar";
import PaisesTable from "./PaisesTable";
import PaisesPagination from "./PaisesPagination";
import CountryModal from "./CountryModal";
import { useMemo } from "react";
import { useListarPaises } from "../hooks/useListarPaises";

const PAGE_SIZE = 10;

export default function PaisesPLD() {
    const [activeTab, setActiveTab] = useState('paraiso');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const { data, isLoading, error } = useListarPaises();

    const paisesData = data ?? [];

    const handleAdd = () => {
        setSelectedCountry(null);
        setIsModalOpen(true);
    };

    const handleEdit = (row) => {
        setSelectedCountry({
            paisId: row.paisId,
            nombre: row.paisNombre,
            descripcion: row.descripcion,
            esParaiso: row.esParaisoFiscal,
            noCooperante: row.esPaisNoCooperante,
            medidasDeficientes: row.esMedidaDeficiente,
        });
        setIsModalOpen(true);
    };

    const handleSearch = () => {
        setSearchQuery(searchInput.trim().toLowerCase());
        setCurrentPage(1);
    };

    const filtered = useMemo(() => {
        if (!searchQuery) return paisesData;
        return paisesData.filter(
            (row) =>
                row.paisNombre?.toLowerCase().includes(searchQuery) ||
                row.descripcion?.toLowerCase().includes(searchQuery)
        );
    }, [searchQuery, paisesData]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = Math.min(startIndex + PAGE_SIZE, filtered.length);
    const pageData = filtered.slice(startIndex, endIndex);

    return (
        <div className="min-h-screen bg-[#f4f7f9] p-6 font-sans text-slate-600">
            <PaisesSearchBar
                title="Lista de paises PLD"
                searchInput={searchInput}
                onChangeSearchInput={setSearchInput}
                onSearch={handleSearch}
            />

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <PaisesTabs activeTab={activeTab} onChangeTab={setActiveTab} />
                <PaisesToolbar onAdd={handleAdd} />

                {isLoading ? (
                    <div className="py-10 text-center text-slate-400 text-sm">Cargando países...</div>
                ) : error ? (
                    <div className="py-10 text-center text-red-500 text-sm">
                        Error al cargar los países.
                    </div>
                ) : (
                    <>
                        <PaisesTable data={pageData} onEdit={handleEdit} />
                        <PaisesPagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onChangePage={setCurrentPage}
                            startIndex={startIndex}
                            endIndex={endIndex}
                            totalItems={filtered.length}
                        />
                    </>
                )}
            </div>

            <CountryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                country={selectedCountry}
                onSave={(data) => console.log('Guardando datos:', data)}
            />
        </div>
    )
}
