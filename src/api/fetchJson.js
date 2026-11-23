export async function fetchJson(url, errorLabel) {
	let response;
	try {
		response = await fetch(url);
	} catch {
		throw new Error("Немає з’єднання. Перевірте інтернет і спробуйте ще раз");
	}

	if (!response.ok) {
		throw new Error(
			`Не вдалося завантажити ${errorLabel} (${response.status})`,
		);
	}

	try {
		return await response.json();
	} catch {
		throw new Error(`Дані (${errorLabel}) пошкоджені або не знайдені`);
	}
}
