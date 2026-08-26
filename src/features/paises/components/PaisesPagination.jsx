export default function PaisesPagination({ currentPage, totalPages, onChangePage, startIndex, endIndex, totalItems }) {
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
        <div className="flex justify-between items-center p-4 border-t border-gray-100 bg-white">
            <span className="text-[12px] text-slate-400">
                {totalItems === 0
                    ? 'Sin resultados'
                    : `Mostrando ${startIndex + 1} – ${endIndex} de ${totalItems} registros`}
            </span>
            <div className="flex items-center border border-gray-300 rounded overflow-hidden text-[12px]">
                <button
                    onClick={() => onChangePage(1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border-r hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    «
                </button>
                <button
                    onClick={() => onChangePage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border-r hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    ‹
                </button>
                {getPageNumbers().map((page) => (
                    <button
                        key={page}
                        onClick={() => onChangePage(page)}
                        className={`px-3 py-1 border-r transition-colors ${currentPage === page ? 'bg-[#337ab7] text-white' : 'hover:bg-gray-100'
                            }`}
                    >
                        {page}
                    </button>
                ))}
                <button
                    onClick={() => onChangePage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border-r hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    ›
                </button>
                <button
                    onClick={() => onChangePage(totalPages)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    »
                </button>
            </div>
        </div>
    )
}
