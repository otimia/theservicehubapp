'use server'

import { db } from "@/lib/db"
import { getUser } from "../auth/actions"
import { redirect } from "next/navigation"

export const createAdmin = async (data: { userId: string }) => {
    const admin = await db.admin.create({
        data: {
            userId: data.userId
        }
    })
    return admin
}


export const getAdmin = async () => {

    const user = await getUser()

    if (!user) {
        return redirect("/auth/sign-in")
    }

    if (typeof user === 'object' && user.dbUser) {
        const admin = user?.dbUser
        const dbAdmin = await db.admin.findUnique({
            where: {
                id: admin.adminId as string
            },
        })
        return { dbAdmin }
    }



    return redirect("/auth/sign-in")

}

export const getAdminWorkspaces = async () => {
    const dbAdmin = await getAdmin()
    const admin = dbAdmin?.dbAdmin
    if (admin === null) {
        return redirect("/auth/sign-in")
    }
    if (typeof admin === 'object' && admin) {
        const workspaces = await db.workspace.findMany({
            where: {
                adminId: admin.id
            },
            include: {
                Subscription: true
            }
        })
        return { workspaces }
    }

    return redirect("/auth/sign-in")
}
