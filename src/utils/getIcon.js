import { Rocket } from "lucide-react";
import { Server } from "lucide-react";
import { Cog } from "lucide-react";
import { User } from "lucide-react";
import { CurlyBraces } from "lucide-react";
import { Folder } from "lucide-react";
import { Home } from "lucide-react";

const iconMap = {
    home: Home,
    proyecto: Folder,
    deploy: Rocket,
    docker: CurlyBraces,
    servidor: Server,
    usuario: User,
    config: Cog,
};

export function getIcon(iconName) {
    return iconMap[iconName] ?? Folder;
}