import Navbar from "@/components/sections/Navbar/Navbar";
import Timer from "@/components/sections/Timer/Timer";
import StatusBadge from "@/components/sections/StatusBadge/StatusBadge";

export function App(): string {
    return `
        ${Navbar()}
        ${Timer()}
        ${StatusBadge()}
    `;
}
