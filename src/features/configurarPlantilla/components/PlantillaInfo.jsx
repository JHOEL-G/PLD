export default function PlantillaInfo() {
    return (
        <>
            <div className="flex-1 min-w-[200px] space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Plantilla</label>
                <input
                    type="text"
                    defaultValue="PLANT PERS BLOQUEADA"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                />
            </div>

            <div className="w-40 space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Código</label>
                <input
                    type="text"
                    defaultValue="PLANTPB"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                />
            </div>
        </>
    )
}
