
import { OrganizationPicker } from '@/components/global/workspacePicker'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'


export default async function Workspace() {
    const user = await currentUser()

    return (

        <div className='flex w-full min-h-screen grow items-center px-4 justify-center'>
            <div className='w-full max-w-3xl'>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Selecteer jouw workspace {user?.fullName}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <OrganizationPicker />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
