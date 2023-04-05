    import NextAuth, { getServerSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

// Next Auth Options, for documentation see: https://next-auth.js.org/configuration/options
export default NextAuth({
    pages: {
        signIn: "/login"
    },
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: "credentials",
            type: "credentials",
            id: "credentials",
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "email", placeholder: "cool@swag.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                const body = {
                    email: credentials?.email,
                    password: credentials?.password
                }
                const API_PORT = process.env.NEXT_PUBLIC_API_PORT;
                try {
                    const response = await fetch(`http://localhost:${API_PORT}/auth/login`, {
                        method: 'POST',
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(body)
                        
                    });
                    const user = await response.json();
                    // If no error and we have user data, return it
                    if (response.ok && user?.token !== "undefined") {
                        user.accessToken = user.token;
                        return user;
                    }
                } catch (err) {
                    console.error(err);
                }
                // Return null (aka false) if user data could not be retrieved
                return null;
            }
        })
    ],
    callbacks: {
        session({ session, token }) {
            session.user.accessToken = token.accessToken;
            return session;
        },
        async jwt({ token, user}) {
            if (user) {
                token.accessToken = user.accessToken;
            }
            return token;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        // Choose how you want to save the user session.
        // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
        // If you use an `adapter` however, we default it to `"database"` instead.
        // You can still force a JWT session by explicitly defining `"jwt"`.
        // When using `"database"`, the session cookie will only contain a `sessionToken` value,
        // which is used to look up the session in the database.
        strategy: "jwt"
    },
    debug: false,
    theme: {
        colorScheme: "auto", // "auto" | "dark" | "light"
        //brandColor: "", // Hex color code
        //logo: "", // Absolute URL to image
        //buttonText: "" // Hex color code
    }
})