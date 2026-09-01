import SectionCard from "./SectionCard";

export default function PlaceholderTab({ label }) {
    return (
        <SectionCard>
            <div className="text-center text-slate-400 py-10 text-sm">
                No hay información de "{label}" registrada para este cliente.
            </div>
        </SectionCard>
    );
}