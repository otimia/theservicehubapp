import CreateOrganization from '@/components/forms/createWorkspace'
import React from 'react'

function page() {
    return (
        <div className='flex flex-col items-center justify-center h-screen w-full gap-4'>
            <CreateOrganization />
        </div>
    )
}

export default page