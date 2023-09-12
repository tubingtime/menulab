// This middleware protects every page inside of this directory
// More Details: https://next-auth.js.org/configuration/nextjs#middleware
export { default } from "next-auth/middleware"


export const config = { matcher: ["/dashboard/:path*"] }