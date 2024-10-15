import React from 'react'
import OnboardingForm from './_components/onboarding'

type Params = {
    adminId: string
}

function page({ params }: { params: Params }) {
    return (
        <div className='flex flex-col min-h-screen w-full items-center justify-center'>
            <div className='flex flex-col items-center justify-center gap-4'>
                <OnboardingForm adminId={params.adminId} />
            </div>
        </div>
    )
}

export default page
