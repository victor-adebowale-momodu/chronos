import Navbar from "@/components/blocks/Navbar/Navbar";
import Stats from "@/components/blocks/Stats/Stats";
import StatusBadge from "@/components/blocks/StatusBadge/StatusBadge";
import Timer from "@/components/blocks/Timer/Timer";

export function App(): string {
	return `
        ${Navbar()}
        ${Timer()}
        ${Stats()}
        ${StatusBadge()}
    `;
}
