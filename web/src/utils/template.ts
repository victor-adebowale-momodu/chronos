export function render(html: string, data: Record<string, string>): string {
    return html.replace(/\{\{(\w+)\}\}/g, (_, key) => data[key] ?? "");
}
