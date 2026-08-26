import { useState } from "react";
import SettingsSidebar from "../../features/paises/components/SettingsSidebar";
import PaisesPLD from "../../features/paises/components/PaisesPLD";

export default function SettingsPage() {
    const [activeSection, setActiveSection] = useState('paises-pld');

    return (
        <div className="flex h-screen bg-[#f8fafc] text-slate-700 font-sans">
            <SettingsSidebar activeSection={activeSection} onSelectSection={setActiveSection} />

            <div className="flex-1 flex flex-col overflow-hidden">
                {activeSection === 'paises-pld' && <PaisesPLD />}
            </div>
        </div>
    )
}
