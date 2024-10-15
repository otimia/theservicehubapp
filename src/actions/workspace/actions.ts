'use server'

import { db } from "@/lib/db";
import { SubscriptionType } from "@prisma/client";
import { redirect } from "next/navigation";

// Workspace Create
export const createWorkspace = async (data: {
    adminId: string,
    name: string,
    subscription?: SubscriptionType,
    description?: string,
    employees?: string,
    role?: string,
    category?: string,
    plan?: string,
    categoryId?: string,

}) => {
    const newWorkspace = await db.workspace.create({
        data: {
            adminId: data.adminId,
            name: data.name,
        }
    })

    const subscription = await db.subscription.create({
        data: {
            workspaceId: newWorkspace.id,
            type: data.subscription as SubscriptionType || data.plan as SubscriptionType,
            active: true,
        }
    })
    return subscription
}

// Workspace Get

export const getWorkspace = async (workspaceId: string) => {
    const workspace = await db.workspace.findUnique({
        where: {
            id: workspaceId
        }
    })

    if (!workspace) {
        return redirect('/admin/')
    }
    return workspace

}

// Workspace check


// Subscription Create

// Subscription Get

export const getSubscription = async (workspaceId: string) => {
    const subscription = await db.subscription.findUnique({
        where: {
            workspaceId: workspaceId
        },
        select: {
            type: true
        }
    })
    return subscription
}

