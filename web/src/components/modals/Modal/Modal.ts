import { render } from "@/utils";
import html from "./Modal.html?raw";

export default function Modal({ content }: { content: string }): string {
    return render(html, { content });
}
