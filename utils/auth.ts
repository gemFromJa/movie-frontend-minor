import { cookies } from "next/headers";

export const getToken = async () => {
  return (await cookies()).get("authToken")?.value || null;
};

export const setToken = async (token: string) => {
  return (await cookies()).set("authToken", token);
};

export const clearToken = async () => {
  return (await cookies()).delete("authToken");
};

export const refreshToken = async () => {
  const token = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/token`, {
    method: "GET",
  });

  if (!token.ok) {
    throw new Error("Failed to refresh token");
  }

  const data = await token.json();

  await setToken(data.token);

  return data.token;
};
