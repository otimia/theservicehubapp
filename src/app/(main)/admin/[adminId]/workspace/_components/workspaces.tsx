import { getAdmin, getAdminWorkspaces } from '@/actions/admin/actions'
import { Subscription } from '@prisma/client'
import React from 'react'
import { WorkspaceCard } from './workspaceCard'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription, DialogHeader } from '@/components/ui/dialog'
import CreateWorkspace from '@/components/forms/createWorkspace'



async function Workspaces() {
    const admin = await getAdmin()
    const adminWorkspaces = await getAdminWorkspaces()
    if (adminWorkspaces.workspaces.length === 0) {
        return (
            <Dialog>
                <div className='flex flex-row justify-center items-center h-full'>
                    <Card className='flex flex-col justify-center items-center w-[500px] h-[300px]'>
                        <CardHeader className='flex flex-col justify-center items-center'>
                            <Image src='/folder_13543330.png' alt='logo' width={100} height={100} />
                            <CardTitle>Workspace</CardTitle>
                            <CardDescription>Choose your workspace</CardDescription>
                            <CardContent className='pt-4'>
                                <DialogTrigger asChild><Button>Create Workspace</Button></DialogTrigger>
                            </CardContent>
                        </CardHeader>
                    </Card>
                </div>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create Workspace</DialogTitle>
                        <DialogDescription>
                            Create a new workspace
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <CreateWorkspace adminId={admin?.dbAdmin?.id as string} />
                    </div>
                </DialogContent>
            </Dialog >
        )
    }

    if (typeof adminWorkspaces === 'object' && adminWorkspaces) {
        return (
            <div className='flex flex-row gap-4'>
                {adminWorkspaces.workspaces.map((workspace) => (
                    <WorkspaceCard key={workspace.id} workspace={workspace} subscription={workspace.Subscription as Subscription} />
                ))}
            </div>
        )
    }

    return <div>No workspaces found</div>
}

export default Workspaces