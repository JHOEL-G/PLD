import { useEffect } from "react";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SidebarHeader from "./components/SidebarHeader";
import SidebarMenu from "./components/SidebarMenu";
import SidebarFooter from "./components/SidebarFooter";
import { menuSlide } from "./constants/menuSlide";

export default function SidebarLayout() {
    const [expanded, setExpanded] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [search, setSearch] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    const filtered = search.trim()
        ? menuSlide.filter(m =>
            m.moduloNombre.toLowerCase().includes(search.toLowerCase()) ||
            (m.modulos ?? []).some(s => s.moduloNombre?.toLowerCase().includes(search.toLowerCase()))
        )
        : menuSlide;



    return (
        <div className={`flex w-full h-screen ${darkMode ? 'bg-[var(--acrecer-black)]' : 'bg-[var(--acrecer-white)]'}`}>
            <div
                className="relative shrink-0 h-full p-2.5 transition-[width] duration-300 ease-out"
                style={{ width: expanded ? "260px" : "88px" }}
            >
                <aside className={`h-full flex flex-col overflow-hidden rounded-[20px] shadow-[10px_10px_50px_-12px_rgba(0,0,0,0.25)] transition-all duration-300 ease-in-out ${darkMode
                    ? 'bg-gradient-to-b from-[#18181b] via-[#18181b] to-[var(--acrecer-black)] border border-[rgba(63,63,70,0.6)]'
                    : 'bg-[var(--acrecer-white)] border border-[rgba(148,163,184,0.3)]'
                    }`}>
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--acrecer-purple)] to-[var(--acrecer-blue)]" />

                    <SidebarHeader
                        expanded={expanded}
                        darkMode={darkMode}
                        search={search}
                        setSearch={setSearch}
                        onToggle={() => setExpanded(!expanded)}
                    />

                    <SidebarMenu
                        modules={filtered}
                        expanded={expanded}
                        darkMode={darkMode}
                    />

                    <SidebarFooter
                        expanded={expanded}
                        darkMode={darkMode}
                        setDarkMode={setDarkMode}
                        onNavigateProfile={() => navigate('/Usuarios/Index')}
                    />
                </aside>
            </div>

            <main className="flex-1 p-6 overflow-auto relative">
                <Outlet />
            </main>
        </div>
    )
}
