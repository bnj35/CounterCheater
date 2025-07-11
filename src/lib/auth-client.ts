import { createAuthClient } from "better-auth/react"
import { steamAuthClient } from "./steam-auth-client"

export const authClient = createAuthClient({
    plugins: [steamAuthClient()],
})