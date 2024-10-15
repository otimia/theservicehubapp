import { db } from "@/lib/db"
import { auth, currentUser } from "@clerk/nextjs/server"



export const getUser = async () => {
    const clerkAuth = await auth()
    if (!clerkAuth) {
        return ("Not Authenticated")
    }

    const dbUser = await db.profile.findUnique({
        where: {
            clrkId: clerkAuth.userId as string
        }
    })

    if (!dbUser) {
        return ("User not found")
    }

    const clerkUser = await currentUser()

    if (!clerkUser) {
        return ("Clerk User not found")
    }

    return { dbUser, clerkUser }
}

