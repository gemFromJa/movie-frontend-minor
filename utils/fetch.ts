import { getToken } from "./auth";

export type ApiFetchOptions = Omit<RequestInit, "headers"> & {
  headers?: Record<string, string>;
  token?: string;
};

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export async function apiFetch<T>(
  url: string,
  options: ApiFetchOptions = {},
  retry = true
): Promise<T> {
  const { headers = {}, token: optionToken, ...restOptions } = options;
  const token = optionToken || (await getToken());

  const response = await fetch(new URL(url, BASE_API_URL).toString(), {
    ...restOptions,
    headers: {
      ...DEFAULT_HEADERS,
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (response.status === 401 && retry) {
    const tokenResponse = await refreshToken();

    return apiFetch(url, { ...options, token: tokenResponse.token }, false);
  }

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  // Adjust if your API sometimes returns no JSON
  return response.json() as Promise<T>;
}

const PROTOCOL = process.env.NODE_ENV === "development" ? "http" : "https";

const refreshToken = async () => {
  const response = await fetch(
    `${PROTOCOL}://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/refresh`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to refresh token");
  }

  return response.json();
};
