import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
    params: {
        adminId: string
    }
}

function page({ params }: Props) {
    redirect(`/admin/${params.adminId}/workspace`)
    return (
        <div>page</div>
    )
}

export default page