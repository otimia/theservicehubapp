import React from 'react'
import OnboardingForm from './_components/onboarding'

function page() {
    return (
        <div className='flex flex-col min-h-screen w-full items-center justify-center'>
            <div className='flex flex-col items-center justify-center gap-4'>
                <OnboardingForm />
            </div>
        </div>
    )
}

export default page