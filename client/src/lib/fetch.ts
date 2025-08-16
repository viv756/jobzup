const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

type FetchOptions = RequestInit & {
  auth?: boolean;
};

export async function apiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { auth, headers, ...rest } = options;

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    credentials: auth ? "include" : "same-origin",
    ...rest,
  });

  const data = await res.json();

  if (!res.ok) {
    throw {
      status: res.status,
      message: data.message || "Request failed",
    };
  }

  return data;
}
