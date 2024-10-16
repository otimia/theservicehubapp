import CreateOrganization from '@/components/forms/createWorkspace'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import React from 'react'

function page() {
    return (
        <div className='flex flex-col items-center justify-center h-screen w-full gap-4'>
            <Card>
                <CardHeader>
                    <CardTitle>Create Workspace</CardTitle>
                    <CardDescription>Create a workspace to get started</CardDescription>
                </CardHeader>
                <CardContent className='flex flex-col items-center justify-center'>
                    <CreateOrganization />
                </CardContent>
            </Card>
        </div>
    )
}

export default page