import Navbar from "@/components/sections/Navbar/Navbar";
import StatusBadge from "@/components/sections/StatusBadge/StatusBadge";
import Timer from "@/components/sections/Timer/Timer";

export function App(): string {
	return `
        ${Navbar()}
        ${Timer()}
        ${StatusBadge()}
    `;
}
