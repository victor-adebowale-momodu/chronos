export function render(template: string, data: Record<string, string>): string {
	const parser = new DOMParser();
	const doc = parser.parseFromString(template, "text/html");

	const targets = doc.querySelectorAll("[data-template]");
	targets.forEach((el) => {
		const key = el.getAttribute("data-template");
		if (key && data[key]) {
			el.innerHTML = data[key];
		}
	});

	return doc.body.innerHTML;
}
