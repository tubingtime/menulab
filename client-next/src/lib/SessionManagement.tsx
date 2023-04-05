import { useSession } from "next-auth/react"

export function useToken() {
    const session = useSession();

    const jwtToken = session.data?.user.accessToken;
    if (!jwtToken) {
        console.error("jwtToken is null!");
        return "null";
    }
    return (jwtToken || "null");
}