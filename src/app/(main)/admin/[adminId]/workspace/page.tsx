
import Typography from '@/components/typography'
import React from 'react'
import Workspaces from './_components/workspaces'
import AddWorkspaceButton from '@/components/global/addWorkspaceButton'

type Params = {
    adminId: string
}

export default function Page({ params }: { params: Params }) {

    console.log(params)
    return <div className='flex flex-col h-full w-full '>
        <div className='flex flex-row justify-between pt-2 pl-2 h-1/8 mb-5'>
            <div className='flex flex-col'>
                <Typography variant='h3' className='mb-[-10px]'>  Workspace</Typography>
                <Typography variant='p' className='text-muted-foreground'>Choose your workspace</Typography>
            </div>
            <AddWorkspaceButton adminId={params.adminId} />
        </div>
        <Workspaces />
    </div>
}
