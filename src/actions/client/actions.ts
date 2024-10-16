"use server"
import { db } from "@/lib/db"


export const getOrgClients = async (orgId: string) => {
    const clients = await db.client.findMany({
        where: {
            orgId: orgId,
        },
    })
    return clients
}