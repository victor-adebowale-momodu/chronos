import { Navbar } from "./components/Navbar/Navbar";

export function App(): string {
    return `
        ${Navbar()}
        <!-- next components get added here as you port them -->
    `;
}
