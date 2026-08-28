import { useEffect } from "react";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SidebarHeader from "./components/SidebarHeader";
import SidebarMenu from "./components/SidebarMenu";
import SidebarFooter from "./components/SidebarFooter";
import { menuSlide } from "./constants/menuSlide";
import DashboardHeader from "../../../features/dashboard/components/DashboardHeader";

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
        <div className={`flex w-full h-screen overflow-hidden ${darkMode ? 'bg-[var(--acrecer-black,#09090b)]' : 'bg-slate-50'}`}>
            <div
                className="relative shrink-0 h-full p-2 transition-[width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{ width: expanded ? "250px" : "80px" }}
            >
                <aside className={`h-full flex flex-col relative rounded-2xl shadow-xl transition-colors duration-300 backdrop-blur-md ${darkMode
                    ? 'bg-zinc-900/90 border border-zinc-800/80 text-zinc-100'
                    : 'bg-white/90 border border-slate-200/80 text-slate-800'
                    }`}>
                    <div className="absolute top-0 left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-[var(--acrecer-purple,#8b5cf6)] to-[var(--acrecer-blue,#3b82f6)] opacity-70 rounded-full" />

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
                <DashboardHeader />
                <Outlet />
            </main>
        </div>
    )
}
