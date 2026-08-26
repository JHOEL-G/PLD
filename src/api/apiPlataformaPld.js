import { env } from "../config/env";

export async function apiFetch(endpoint, options = {}) {
    try {
        const isFromData = options.body instanceof FormData
        const token =
            typeof authStorage !== "undefined"
                ? authStorage.getToken()
                : null;

        const response = await fetch(`${env.api.apiUrl}${endpoint}`, {
            ...options,
            headers: {
                ...(isFromData ? {} : { 'Content-Type': 'application/json' }),
                ...(env.api.apiKey ? { [env.api.apiKeyName]: env.api.apiKey } : {}),
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...options.headers
            }
        });

        if (response.status === 401) {
            authStorage.removeToken();
            const publicRoutes = ["/login", "/registro"];
            if (!publicRoutes.includes(window.location.pathname)) {
                window.location.href = "/login";
            }
            return null;
        }

        const contentType = response.headers.get('Content-Type')

        const data = contentType?.includes('application/json') ? await response.json() : null;

        if (!response.ok) {
            throw new Error(data?.mensaje || data?.message || `Error ${response.status}`)
        }

        return data

    } catch (error) {
        console.error("apiFetch error:", error)
        throw error
    }
}

export const apiPlataformaPld = {
    get: (url, config = {}) => {
        const query = config.params
            ? `?${new URLSearchParams(config.params).toString()}`
            : '';
        return apiFetch(`${url}${query}`);
    },
    post: (url, body) => apiFetch(url, {
        method: 'POST',
        body: body instanceof FormData ? body : JSON.stringify(body),
    }),
    put: (url, body) => apiFetch(url, {
        method: "PUT",
        body: body instanceof FormData ? body : JSON.stringify(body),
    }),
    delete: (url) => apiFetch(url, {
        method: "DELETE"
    })
}