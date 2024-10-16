import { NextRequest, NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';

export async function PATCH(req: NextRequest) {
    const clerk = clerkClient()
    try {
        // Parse the request body
        const { id, username, firstName, lastName } = await req.json();

        // Update the user using Clerk's API
        const updatedUser = await clerk.users.updateUser(id, {
            username,
            firstName,
            lastName,
        });

        // Return the updated user as JSON
        return NextResponse.json({ success: true, user: updatedUser });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: 'Failed to update user' }, { status: 500 });
    }
}
