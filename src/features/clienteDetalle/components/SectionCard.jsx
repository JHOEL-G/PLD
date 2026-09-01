export default function SectionCard({ icon: Icon, title, action, children }) {
    return (
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
            {title && (
                <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100">
                    <div className="flex items-center gap-2 text-slate-500 text-sm font-semibold tracking-wide">
                        {Icon && <Icon size={16} className="text-slate-400" />}
                        <span>{title}</span>
                    </div>
                    {action}
                </div>
            )}
            <div className="p-5">{children}</div>
        </div>
    );
}