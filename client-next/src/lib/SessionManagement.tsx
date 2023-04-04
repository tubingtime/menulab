import { getSession } from "next-auth/react"

export async function getUserToken() {
    const session = await getSession();
    const jwtToken = session?.user.accessToken || "";
    if (!jwtToken) {
        console.error("Session token is null!");
    }
    return jwtToken;
}