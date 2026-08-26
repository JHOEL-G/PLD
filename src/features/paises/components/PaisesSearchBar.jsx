import React from 'react'

export default function PaisesSearchBar({ title, searchInput, onChangeSearchInput, onSearch }) {
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') onSearch();
    };

    return (
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-light text-slate-500">{title}</h1>
            <div className="flex shadow-sm rounded-full bg-white border border-gray-200 overflow-hidden">
                <input
                    type="text"
                    placeholder="Buscar"
                    value={searchInput}
                    onChange={(e) => onChangeSearchInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="px-4 py-1.5 outline-none text-sm w-64"
                />
                <button
                    onClick={onSearch}
                    className="bg-gray-50 px-4 py-1.5 text-xs text-gray-400 border-l hover:bg-gray-100 transition-colors"
                >
                    Ir
                </button>
            </div>
        </div>
    )
}
