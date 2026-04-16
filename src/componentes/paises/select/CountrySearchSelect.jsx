import { useState } from "react";
import { countries } from "../data/Pises";

const CountrySearchSelect = ({ value, onChange }) => {
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);

    const filtered = countries.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="w-2/3 relative">
            <input
                type="text"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                placeholder="Buscar país..."
                className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm outline-none focus:border-blue-400 bg-[#f9f9f9]"
            />

            {open && (
                <ul className="absolute z-10 bg-white border border-gray-300 w-full max-h-40 overflow-y-auto rounded mt-1 text-sm">
                    {filtered.map((country) => (
                        <li
                            key={country.code}
                            onClick={() => {
                                onChange(country.name);
                                setSearch(country.name);
                                setOpen(false);
                            }}
                            className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                        >
                            {country.name}
                        </li>
                    ))}

                    {filtered.length === 0 && (
                        <li className="px-3 py-2 text-gray-400">
                            No encontrado
                        </li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default CountrySearchSelect;