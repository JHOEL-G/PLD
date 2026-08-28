import {
    Home,
    Folder,
    Rocket,
    Server,
    Cog,
    User,
    ShieldAlert,
    Activity,
    AlertTriangle,
    ListChecks,
    BriefcaseBusiness,
    UserRound,
    ClipboardCheck,
    Settings,
} from "lucide-react";

const iconMap = {
    home: Home,
    denuncias: ShieldAlert,
    monitoreo: Activity,
    riesgos: AlertTriangle,
    operaciones: BriefcaseBusiness,
    listas: ListChecks,
    alertas: AlertTriangle,
    perfilTransaccional: UserRound,
    perfilCliente: User,
    auditoria: ClipboardCheck,
    config: Settings,

    // Otros que ya tenías
    proyecto: Folder,
    deploy: Rocket,
    docker: Server,
    servidor: Server,
    usuario: User,
};

export function getIcon(iconName) {
    return iconMap[iconName] ?? Folder;
}