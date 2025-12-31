import { refreshToken } from "@/utils/auth";

export async function POST() {
  try {
    const token = await refreshToken();

    return new Response(JSON.stringify({ message: "Success!", token: token }), {
      status: 200,
    });
  } catch {
    return new Response(
      JSON.stringify({ message: "Unable to refresh token" }),
      { status: 500 }
    );
  }
}
