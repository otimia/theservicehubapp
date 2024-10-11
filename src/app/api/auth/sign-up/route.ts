import { db } from "@/lib/db"
import { auth, currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST() {
    const session = auth()

    if (!session) {
        return NextResponse.redirect('/auth/sign-up')
    }
    const user = await currentUser()
    const profile = await db.profile.create({
        data: {
            clrkId: session.userId,
            role: 'ADMIN',
            admin: {
                create: {
                    userId: session.userId,
                }
            },
            email: user?.primaryEmailAddress,
            image: user?.imageUrl,
            name: user?.firstName + ' ' + user?.lastName,
        }
    })

    return NextResponse.redirect(`/admin/${profile.adminId}/onboarding`)
}