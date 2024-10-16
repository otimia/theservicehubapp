"use server"
import { currentUser } from "@clerk/nextjs/server"
import { clerk } from "@/lib/clerk"


export const getUser = async () => {
    const user = await currentUser();

    // Extract only serializable data fields (no methods or complex objects)
    const userData = {
        id: user?.id || "",
        username: user?.username || "",
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
    };

    // Return only the plain object `userData`
    return { userData };
};



export const updateUser = async ({ id, data }: { id: string, data: { username: string, firstName: string, lastName: string } }) => {

    try {
        const user = await clerk.users.updateUser(id, {
            username: data.username,
            firstName: data.firstName,
            lastName: data.lastName,
        })
        return user
    } catch (error) {
        console.error(error)
    }
}