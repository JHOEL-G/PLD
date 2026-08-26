const TABS = [
    { key: 'paraiso', label: 'Listado Paraiso Fiscal' },
    { key: 'no-coperantes', label: 'Paises no coperantes' },
    { key: 'deficientes', label: 'Medidas deficientes' },
];

export default function PaisesTabs({ activeTab, onChangeTab }) {
    return (
        <div className="flex border-b border-gray-200 bg-white px-4 pt-4 gap-1">
            {TABS.map((tab) => (
                <button
                    key={tab.key}
                    onClick={() => onChangeTab(tab.key)}
                    className={`px-4 py-2 text-[11px] font-bold uppercase transition-all ${activeTab === tab.key
                        ? 'bg-white border-t border-x border-gray-200 rounded-t -mb-[1px] text-slate-700'
                        : 'bg-transparent border-transparent text-slate-400 hover:text-slate-600'
                        }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    )
}
