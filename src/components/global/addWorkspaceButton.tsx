import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import CreateWorkspace from '@/components/forms/createWorkspace'

type Props = {
    adminId: string
}

function addWorkspaceButton({ adminId }: Props) {
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild><Button>Create Workspace</Button></DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create Workspace</DialogTitle>
                        <DialogDescription>
                            Create a new workspace
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <CreateWorkspace adminId={adminId} />
                    </div>
                </DialogContent>
            </Dialog >
        </div>
    )
}

export default addWorkspaceButton