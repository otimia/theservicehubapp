
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
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
                        <div>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder='Select a workspace' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='1'>Workspace 1</SelectItem>
                                    <SelectItem value='2'>Workspace 2</SelectItem>
                                    <SelectItem value='3'>Workspace 3</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    )
}
