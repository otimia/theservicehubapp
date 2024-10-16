import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog'
import CreateWorkspace from '@/components/forms/createWorkspace'
import { Plus } from 'lucide-react'




export default function AddWorkspaceButton() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="flex items-center gap-2 px-2 py-1 rounded-md cursor-pointer hover:bg-stone-900">
                    <Plus className='w-4 h-4' />
                    <p className='text-sm font-medium'>
                        Create New Organization
                    </p>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Organization</DialogTitle>
                    <DialogDescription>
                        Create a new organization
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <CreateWorkspace />
                </div>
            </DialogContent>
        </Dialog >
    )
}
