export async function handleResponse(response) {
	if (!response.ok) {
		const errorMessage = await response.text();
		throw new Error(`Error ${response.status}: ${errorMessage}`);
	}
	return response.json();
}

export async function fetchWithTimeout(resource, timeoutMs = 5000) {
	const controller = new AbortController();
	const timeout = setTimeout(() => {
		controller.abort();
	}, timeoutMs);

	try {
		const response = await fetch(resource, { signal: controller.signal });
		clearTimeout(timeout);
		return await handleResponse(response);
	} catch (error) {
		clearTimeout(timeout);
		if (error.name === "AbortError") {
			throw new Error(`Request timed out after ${timeoutMs / 1000} seconds`);
		}
		throw error;
	}
}
